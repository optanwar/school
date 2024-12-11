/* import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";

import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCompare, setUserCord } from "../../redux/schoolSlice";

import SchoolNotFound from "./SchoolNotFound";
import { styled } from "@mui/system";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { fetchAllSchool } from "../../redux/schoolSlice";
import { useGeolocated } from "react-geolocated";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "../../redux/axios/axios.js";

import SchoolList from "./SchoolList.jsx";
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#FF7A59",
  height: 4,
  width: "100%",
  marginTop: 20,
  marginLeft: "auto",
  marginRight: "auto",
  "& .MuiSlider-track": {
    borderRadius: 2,
  },
  "& .MuiSlider-rail": {
    color: "#ccc11",
    borderRadius: 5,
  },
  "& .MuiSlider-thumb": {
    width: 10,
    height: 10,
    backgroundColor: "#FF7A59",
  },
  "& .MuiSlider-markLabel": {
    // Add styles here if needed
  },
}));

const School = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [list, setList] = useState("list");
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [selectedMediums, setSelectedMediums] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [distanceRange, setDistanceRange] = useState([0, 40]);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSelector((state) => state?.data?.schoolsData);

  const [recommendedSc, setRecommendedSc] = useState(data);

  const [mediumData, setMediumData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(mediumData, 111155555);
  console.log(data, 432344);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  });
  useEffect(() => {
    if (coords) {
      dispatch(setUserCord(coords));
      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
          distance: 500,
        })
      );
    } else {
      dispatch(fetchAllSchool());
    }
  }, [coords]);
  useEffect(() => {
    setRecommendedSc(data);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    // Reset search term when filters change
    setSearchTerm("");
  }, [selectedBoards, selectedMediums, selectedGenders, distanceRange]);

  const handleBoardChange = (board) => {
    setSelectedBoards((prev) =>
      prev.includes(board)
        ? prev?.filter((item) => item !== board)
        : [...prev, board]
    );
  };

  const handleMediumChange = (medium) => {
    setSelectedMediums((prev) =>
      prev.includes(medium)
        ? prev?.filter((item) => item !== medium)
        : [...prev, medium]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev?.filter((item) => item !== gender)
        : [...prev, gender]
    );
  };

  const filteredSchools = data?.filter((school) => {
    if (
      selectedBoards?.length > 0 &&
      !selectedBoards?.includes(school?.board?._id)
    )
      return false;
    if (
      selectedMediums?.length > 0 &&
      !selectedMediums?.some((medium) =>
        school?.medium?.some((schoolMedium) => schoolMedium?._id === medium)
      )
    )
      return false;
    if (
      selectedGenders?.length > 0 &&
      !selectedGenders?.includes(school?.category?._id)
    )
      return false;
    const distance = school?.distance;
    if (distance < distanceRange[0] || distance >= distanceRange[1])
      return false;
    if (
      searchTerm &&
      !school?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
      return false;
    return true;
  });

  const handleDistanceChange = (event, newValue) => {
    setDistanceRange(newValue);
  };

  const distanceMarks = [
    { value: 0, label: "0 km" },
    { value: 10, label: "10 km" },
    { value: 20, label: "20 km" },
    { value: 30, label: "30 km" },
    { value: 40, label: "40 km" },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleList = (e) => {
    setList(e.target.value);
  };
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const compareList = useSelector((state) => state?.data?.compareList);

  useEffect(() => {
    axios
      .get("/fetchAllMedium")
      .then((response) => {
        setMediumData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/fetchAllBoard")
      .then((response) => {
        setBoardData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/fetchAllCategory")
      .then((response) => {
        setGenderData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CirclesWithBar
          height="60"
          width="60"
          color="#4fa94d"
          outerCircleColor="#FF7A59"
          innerCircleColor="#FF7A59"
          barColor="#FF7A59"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    // return <div>Error: {error}</div>;
    return (
      <div>
        <div className="flex justify-center  items-center  font-roboto tracking-wide py-10">
          <div>
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!{" "}
            </h1>
            <h2 className="my-5">404 - Something want wrong</h2>
          </div>
        </div>{" "}
      </div>
    );
  }

  console.log("boardData", boardData);

  return (
    <>
      <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11">
        <div className="container">
          <div className="mb-3 flex items-center justify-start">
            <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
              <Link to="/">
                <p className="flex items-center gap-x-1 ">
                  <span>
                    <HiHome />
                  </span>
                  <span>Home</span>
                </p>
              </Link>
            </Breadcrumb>
            <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
              {location.pathname.replace(/-/g, " ").substring(1)}
            </Breadcrumb.Item>
          </div>
          <div className="bg-normal_bg py-7 px-3 rounded-lg">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-roboto text-brand_text text-center">
              Schools
            </h1>
          </div>
          <div className="flex justify-between items-center my-5">
            <div className="relative shadow-sm md:w-1/4 z-[-10] xl:z-10">
              <input
                type="text"
                placeholder="Schools Search Here! "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-6 pl-8 rounded-md outline-none font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
              />
              <IoSearchSharp className="absolute left-2 top-2.5 text-xl text-gray-500" />
            </div>
            <div className="hidden lg:block">
              <select
                className="rounded-md outline-none px-3 py-2 font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                onChange={handleList}
              >
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 justify-between">
            <div className="md:w-1/4 order-2 md:order-1">
              <div className="mb-5 shadow-sm pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Distance
                </h4>

                <div className="px-5">
                  <CustomSlider
                    value={distanceRange}
                    onChange={handleDistanceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={40}
                    step={2}
                    marks={distanceMarks}
                  />
                </div>
              </div>
              <div className="shadow-sm pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Board
                </h4>
                <ul className="my-4 overflow-y-auto single-school-scroll h-44 md:h-52">
                  {boardData?.data?.map((board) => (
                    <div
                      key={board._id}
                      className="flex justify-between items-center px-2"
                    >
                      <li
                        className={`my-1.5 capitalize cursor-pointer  ${
                          selectedBoards.includes(board._id)
                            ? "text-brand_text"
                            : ""
                        }`}
                        onClick={() => handleBoardChange(board._id)}
                      >
                        {board.name}
                      </li>
                      <p>{board.numberOfSchools}</p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="my-5 shadow-sm pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Gender
                </h4>
                <ul className="my-4">
                  {genderData?.data?.map((gender) => (
                    <div
                      key={gender._id}
                      className="flex justify-between items-center px-2"
                    >
                      <li
                        className={`my-1 capitalize cursor-pointer  ${
                          selectedGenders.includes(gender._id)
                            ? "text-brand_text"
                            : ""
                        }`}
                        onClick={() => handleGenderChange(gender._id)}
                      >
                        {gender?.name}
                      </li>
                      <p>{gender.numberOfSchools}</p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="my-5 shadow-sm pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Medium
                </h4>
                <ul className="my-4">
                  {mediumData?.data?.map((medium) => (
                    <div
                      key={medium._id}
                      className="flex justify-between items-center px-2"
                    >
                      <li
                        className={`my-1 capitalize cursor-pointer  ${
                          selectedMediums.includes(medium._id)
                            ? "text-brand_text"
                            : ""
                        }`}
                        onClick={() => handleMediumChange(medium._id)}
                      >
                        {medium.name}
                      </li>
                      <p>{medium.numberOfSchools}</p>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`order-1 md:order-2 md:w-3/4 `}>
              <SchoolList data={filteredSchools} list={list} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default School;

 */
//! do not delete above comment code
/* import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCompare,
  setUserCord,
  fetchAllSchool,
} from "../../redux/schoolSlice";
import {
  setSelectedBoards,
  setSelectedMediums,
  setSelectedGenders,
  setDistanceRange,
  setSearchTerm,
  clearBlogFilter,
  setPaginationStep,
  resetPaginationStep,
  resetBlogPagination,
} from "../../redux/schoolFilterSlice.js";

import SchoolNotFound from "./SchoolNotFound";
import { styled } from "@mui/system";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useGeolocated } from "react-geolocated";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "../../redux/axios/axios.js";
import SchoolList from "./SchoolList.jsx";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#FF7A59",
  height: 4,
  width: "100%",
  marginTop: 20,
  marginLeft: "auto",
  marginRight: "auto",
  "& .MuiSlider-track": {
    borderRadius: 2,
  },
  "& .MuiSlider-rail": {
    color: "#ccc11",
    borderRadius: 5,
  },
  "& .MuiSlider-thumb": {
    width: 10,
    height: 10,
    backgroundColor: "#FF7A59",
  },
  "& .MuiSlider-markLabel": {
    // Add styles here if needed
  },
}));

const School = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [list, setList] = useState("list");

  //  const {
  //   // selectedBoards,
  //   selectedMediums,
  //   selectedGenders,
  //   distanceRange,
  //   searchTerm,
  // } = useSelector((state) => state?.data?.schoolFilter);
 
  const selectedBoards = useSelector(
    (state) => state?.schoolFilters?.selectedBoards
  );
  const selectedMediums = useSelector(
    (state) => state?.schoolFilters?.selectedMediums
  );
  const selectedGenders = useSelector(
    (state) => state?.schoolFilters?.selectedGenders
  );
  const distanceRange = useSelector(
    (state) => state?.schoolFilters?.distanceRange
  );
  const searchTerm = useSelector((state) => state?.schoolFilters?.searchTerm);
  const { data } = useSelector((state) => state.data.schoolsData);
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const compareList = useSelector((state) => state.data.compareList);

  const [recommendedSc, setRecommendedSc] = useState(data);
  const [mediumData, setMediumData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [distanceR, setDistanceR] = useState([0, 40]);
  const [distanceR, setDistanceR] = useState([0, 100]);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  });
  useEffect(() => {
    if (coords) {
      // dispatch(setUserCord(coords));
      dispatch(
        setUserCord({
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        })
      );

      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
          // distance: 500,
        })
      );
    } else {
      dispatch(setUserCord({}));
      dispatch(fetchAllSchool());
    }
  }, [coords]);

  useEffect(() => {
    setRecommendedSc(data);
    setLoading(false);
  }, [data]);

  // useEffect(() => {
  // dispatch(setSearchTerm(""));
  // }, [selectedBoards, selectedMediums, selectedGenders, distanceRange]);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllMedium")
        .then((response) => {
          setMediumData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllBoard")
        .then((response) => {
          setBoardData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    if (distanceRange?.length) {
      setDistanceR(distanceRange);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllCategory")
        .then((response) => {
          setGenderData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
  }, []);

  const handleBoardChange = (board) => {
    dispatch(
      setSelectedBoards(
        selectedBoards?.includes(board)
          ? selectedBoards?.filter((item) => item !== board)
          : [...selectedBoards, board]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleMediumChange = (medium) => {
    dispatch(
      setSelectedMediums(
        selectedMediums?.includes(medium)
          ? selectedMediums?.filter((item) => item !== medium)
          : [...selectedMediums, medium]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleGenderChange = (gender) => {
    dispatch(
      setSelectedGenders(
        selectedGenders.includes(gender)
          ? selectedGenders.filter((item) => item !== gender)
          : [...selectedGenders, gender]
      )
    );
  };

  const handleSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(resetPaginationStep());
  };

  const rangeHandler = (e) => {
    const { value } = e.target;
    setDistanceR(value);
    dispatch(setDistanceRange(value));
    dispatch(resetPaginationStep());
  };
  const filteredSchools = data?.filter((school) => {
    if (
      selectedBoards?.length > 0 &&
      !selectedBoards?.includes(school?.board?._id)
    )
      return false;
    if (
      selectedMediums?.length > 0 &&
      !selectedMediums?.some((medium) =>
        school?.medium?.some((schoolMedium) => schoolMedium?._id === medium)
      )
    )
      return false;
    if (
      selectedGenders?.length > 0 &&
      !selectedGenders?.includes(school?.category?._id)
    )
      return false;
    if (distanceRange?.length) {
      const distance = school?.distance;
      if (distance < distanceRange[0] || distance >= distanceRange[1])
        return false;
    }

    if (
      searchTerm &&
      !school?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
      return false;
    return true;
  });

  const distanceMarks = [
    { value: 0, label: "0 km" },
    { value: 25, label: "25 km" },
    { value: 50, label: "50 km" },
    { value: 75, label: "75 km" },
    { value: 100, label: "100 km" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CirclesWithBar
          height="60"
          width="60"
          color="#4fa94d"
          outerCircleColor="#FF7A59"
          innerCircleColor="#FF7A59"
          barColor="#FF7A59"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-center items-center font-roboto tracking-wide py-10">
          <div>
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <h2 className="my-5">404 - Something went wrong</h2>
          </div>
        </div>
      </div>
    );
  }
  const listChangeHandler = (e) => {
    setList(e.target.value);
    dispatch(resetPaginationStep());
  };
  return (
    <>
      <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-2 md:pb-5 lg:pb-7 xl:pb-10">
        <div className="container">
          <div className="mb-3 flex items-center justify-start">
            <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
              <Link to="/">
                <p className="flex items-center gap-x-1">
                  <span>
                    <HiHome />
                  </span>
                  <span>Home</span>
                </p>
              </Link>
            </Breadcrumb>
            <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
              {location?.pathname?.replace(/-/g, " ").substring(1)}
            </Breadcrumb.Item>
          </div>
          <div className="bg-normal_bg py-7 px-3 rounded-lg">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-roboto text-brand_text text-center">
              Schools
            </h1>
          </div>
          <div className="flex justify-between items-center my-5">
            <div className="relative shadow-sm md:w-1/4  xl:z-10">
              <input
                type="text"
                placeholder="Schools Search Here! "
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="pointer-events-auto  relative py-2 px-6 pl-8 rounded-md outline-none font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
              />
              <IoSearchSharp className="absolute left-2 top-2.5 text-xl text-gray-500" />
            </div>
            <div className="hidden lg:block">
              <select
                className="rounded-md outline-none px-3 py-2 font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                // onChange={(e) => setList(e.target.value)}
                onChange={(e) => listChangeHandler(e)}
              >
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 justify-between">
            <div className="md:w-1/4 order-2 md:order-1">
              <div className="mb-5  pb-2 shadow-md bg-normal_bg ">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Distance
                </h4>
                <div className="px-6 ">
                  <CustomSlider
                    // value={distanceRange}
                    value={distanceR}
                    // onChange={handleDistanceChange}
                    onChange={rangeHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    // max={40}
                    max={100}
                    step={2}
                    marks={distanceMarks}
                  />
                </div>
              </div>
              <div className="shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Board
                </h4>
                <ul className="my-4 overflow-y-auto single-school-scroll min-h-auto max-h-52">
                  {boardData?.data &&
                    boardData?.data?.map((board) => (
                      <div
                        key={board._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1.5 capitalize cursor-pointer ${
                            selectedBoards.includes(board._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleBoardChange(board._id)}
                        >
                          {board.name}
                        </li>
                        <p>{board.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="my-5 shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Gender
                </h4>
                <ul className="my-4">
                  {genderData?.data &&
                    genderData?.data?.map((gender) => (
                      <div
                        key={gender._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1 capitalize cursor-pointer ${
                            selectedGenders.includes(gender._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleGenderChange(gender._id)}
                        >
                          {gender?.name}
                        </li>
                        <p>{gender.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="my-5 shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Medium
                </h4>
                <ul className="my-4">
                  {mediumData?.data &&
                    mediumData?.data?.map((medium) => (
                      <div
                        key={medium._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1 capitalize cursor-pointer ${
                            selectedMediums.includes(medium._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleMediumChange(medium._id)}
                        >
                          {medium.name}
                        </li>
                        <p>{medium.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
            <div className={`order-1 md:order-2 md:w-3/4`}>
              <SchoolList data={filteredSchools} list={list} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default School;
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCompare,
  setUserCord,
  fetchAllSchool,
} from "../../redux/schoolSlice";
import {
  setSelectedBoards,
  setSelectedMediums,
  setSelectedGenders,
  setDistanceRange,
  setSearchTerm,
  clearBlogFilter,
  setPaginationStep,
  resetPaginationStep,
  resetBlogPagination,
} from "../../redux/schoolFilterSlice.js";

import SchoolNotFound from "./SchoolNotFound";
import { styled } from "@mui/system";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useGeolocated } from "react-geolocated";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "../../redux/axios/axios.js";
import SchoolList from "./SchoolList.jsx";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#FF7A59",
  height: 4,
  width: "100%",
  marginTop: 20,
  marginLeft: "auto",
  marginRight: "auto",
  "& .MuiSlider-track": {
    borderRadius: 2,
  },
  "& .MuiSlider-rail": {
    color: "#ccc11",
    borderRadius: 5,
  },
  "& .MuiSlider-thumb": {
    width: 10,
    height: 10,
    backgroundColor: "#FF7A59",
  },
  "& .MuiSlider-markLabel": {
    // Add styles here if needed
  },
}));

const School = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [list, setList] = useState("list");

  //  const {
  //   // selectedBoards,
  //   selectedMediums,
  //   selectedGenders,
  //   distanceRange,
  //   searchTerm,
  // } = useSelector((state) => state?.data?.schoolFilter);

  const selectedBoards = useSelector(
    (state) => state?.schoolFilters?.selectedBoards
  );
  const selectedMediums = useSelector(
    (state) => state?.schoolFilters?.selectedMediums
  );
  const selectedGenders = useSelector(
    (state) => state?.schoolFilters?.selectedGenders
  );
  const distanceRange = useSelector(
    (state) => state?.schoolFilters?.distanceRange
  );
  const searchTerm = useSelector((state) => state?.schoolFilters?.searchTerm);
  const { data } = useSelector((state) => state.data.schoolsData);
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const compareList = useSelector((state) => state.data.compareList);

  const [recommendedSc, setRecommendedSc] = useState(data);
  const [mediumData, setMediumData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [distanceR, setDistanceR] = useState([0, 40]);
  const [distanceR, setDistanceR] = useState([0, 100]);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  });
  useEffect(() => {
    if (coords) {
      // dispatch(setUserCord(coords));
      dispatch(
        setUserCord({
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        })
      );

      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
          // distance: 500,
        })
      );
    } else {
      dispatch(setUserCord({}));
      dispatch(fetchAllSchool());
    }
  }, [coords]);

  useEffect(() => {
    setRecommendedSc(data);
    setLoading(false);
  }, [data]);

  // useEffect(() => {
  // dispatch(setSearchTerm(""));
  // }, [selectedBoards, selectedMediums, selectedGenders, distanceRange]);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllMedium")
        .then((response) => {
          setMediumData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllBoard")
        .then((response) => {
          setBoardData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    if (distanceRange?.length) {
      setDistanceR(distanceRange);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllCategory")
        .then((response) => {
          setGenderData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
  }, []);

  const handleBoardChange = (board) => {
    dispatch(
      setSelectedBoards(
        selectedBoards?.includes(board)
          ? selectedBoards?.filter((item) => item !== board)
          : [...selectedBoards, board]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleMediumChange = (medium) => {
    dispatch(
      setSelectedMediums(
        selectedMediums?.includes(medium)
          ? selectedMediums?.filter((item) => item !== medium)
          : [...selectedMediums, medium]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleGenderChange = (gender) => {
    dispatch(
      setSelectedGenders(
        selectedGenders.includes(gender)
          ? selectedGenders.filter((item) => item !== gender)
          : [...selectedGenders, gender]
      )
    );
  };

  const handleSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(resetPaginationStep());
  };

  const rangeHandler = (e) => {
    const { value } = e.target;
    setDistanceR(value);
    dispatch(setDistanceRange(value));
    dispatch(resetPaginationStep());
  };
  const filteredSchools = data?.filter((school) => {
    if (
      selectedBoards?.length > 0 &&
      !selectedBoards?.includes(school?.board?._id)
    )
      return false;
    if (
      selectedMediums?.length > 0 &&
      !selectedMediums?.some((medium) =>
        school?.medium?.some((schoolMedium) => schoolMedium?._id === medium)
      )
    )
      return false;
    if (
      selectedGenders?.length > 0 &&
      !selectedGenders?.includes(school?.category?._id)
    )
      return false;
    if (distanceRange?.length) {
      const distance = school?.distance;
      if (distance < distanceRange[0] || distance >= distanceRange[1])
        return false;
    }

    if (
      searchTerm &&
      !school?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
      return false;
    return true;
  });

  const distanceMarks = [
    { value: 0, label: "0 km" },
    { value: 25, label: "25 km" },
    { value: 50, label: "50 km" },
    { value: 75, label: "75 km" },
    { value: 100, label: "100 km" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CirclesWithBar
          height="60"
          width="60"
          color="#4fa94d"
          outerCircleColor="#FF7A59"
          innerCircleColor="#FF7A59"
          barColor="#FF7A59"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-center items-center font-roboto tracking-wide py-10">
          <div>
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <h2 className="my-5">404 - Something went wrong</h2>
          </div>
        </div>
      </div>
    );
  }
  const listChangeHandler = (e) => {
    setList(e.target.value);
    dispatch(resetPaginationStep());
  };
  return (
    <>
      <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-2 md:pb-5 lg:pb-7 xl:pb-10">
        <div className="container">
          <div className="mb-3 flex items-center justify-start">
            <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
              <Link to="/">
                <p className="flex items-center gap-x-1">
                  <span>
                    <HiHome />
                  </span>
                  <span>Home</span>
                </p>
              </Link>
            </Breadcrumb>
            <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
              {location?.pathname?.replace(/-/g, " ").substring(1)}
            </Breadcrumb.Item>
          </div>
          <div className="bg-normal_bg py-7 px-3 rounded-lg">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-roboto text-brand_text text-center">
              Schools
            </h1>
          </div>
          <div className="flex justify-between items-center my-5">
            <div className="relative shadow-sm md:w-1/4  xl:z-10">
              <input
                type="text"
                placeholder="Schools Search Here! "
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="pointer-events-auto  relative py-2 px-6 pl-8 rounded-md outline-none font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
              />
              <IoSearchSharp className="absolute left-2 top-2.5 text-xl text-gray-500" />
            </div>

            <div className="hidden lg:block z-10">
              <select
                className="rounded-md outline-none px-3 py-2 font-roboto w-full focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                // onChange={(e) => setList(e.target.value)}
                onChange={(e) => listChangeHandler(e)}
              >
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 justify-between">
            <div className="md:w-1/4 order-2 md:order-1">
              <div className="mb-5  pb-2 shadow-md bg-normal_bg ">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Distance
                </h4>
                <div className="px-6 ">
                  <CustomSlider
                    // value={distanceRange}
                    value={distanceR}
                    // onChange={handleDistanceChange}
                    onChange={rangeHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    // max={40}
                    max={100}
                    step={2}
                    marks={distanceMarks}
                  />
                </div>
              </div>
              <div className="shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Board
                </h4>
                <ul className="my-4 overflow-y-auto single-school-scroll min-h-auto max-h-52">
                  {boardData?.data &&
                    boardData?.data?.map((board) => (
                      <div
                        key={board._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1.5 capitalize cursor-pointer ${
                            selectedBoards.includes(board._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleBoardChange(board._id)}
                        >
                          {board.name}
                        </li>
                        <p>{board.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="my-5 shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Gender
                </h4>
                <ul className="my-4">
                  {genderData?.data &&
                    genderData?.data?.map((gender) => (
                      <div
                        key={gender._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1 capitalize cursor-pointer ${
                            selectedGenders.includes(gender._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleGenderChange(gender._id)}
                        >
                          {gender?.name}
                        </li>
                        <p>{gender.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="my-5 shadow-md bg-normal_bg  pb-2">
                <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                  Find by Medium
                </h4>
                <ul className="my-4">
                  {mediumData?.data &&
                    mediumData?.data?.map((medium) => (
                      <div
                        key={medium._id}
                        className="flex justify-between items-center px-2"
                      >
                        <li
                          className={`my-1 capitalize cursor-pointer ${
                            selectedMediums.includes(medium._id)
                              ? "text-brand_text"
                              : ""
                          }`}
                          onClick={() => handleMediumChange(medium._id)}
                        >
                          {medium.name}
                        </li>
                        <p>{medium.numberOfSchools}</p>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
            <div className={`order-1 md:order-2 md:w-3/4`}>
              <SchoolList data={filteredSchools} list={list} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default School;

/* import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCompare,
  setUserCord,
  fetchAllSchool,
} from "../../redux/schoolSlice";
import {
  setSelectedBoards,
  setSelectedMediums,
  setSelectedGenders,
  setDistanceRange,
  setSearchTerm,
  clearBlogFilter,
  setPaginationStep,
  resetPaginationStep,
  resetBlogPagination,
} from "../../redux/schoolFilterSlice.js";

import SchoolNotFound from "./SchoolNotFound";
import { styled } from "@mui/system";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useGeolocated } from "react-geolocated";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "../../redux/axios/axios.js";
import SchoolList from "./SchoolList.jsx";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#FF7A59",
  height: 4,
  width: "100%",
  marginTop: 20,
  marginLeft: "auto",
  marginRight: "auto",
  "& .MuiSlider-track": {
    borderRadius: 2,
  },
  "& .MuiSlider-rail": {
    color: "#ccc11",
    borderRadius: 5,
  },
  "& .MuiSlider-thumb": {
    width: 10,
    height: 10,
    backgroundColor: "#FF7A59",
  },
  "& .MuiSlider-markLabel": {
    // Add styles here if needed
  },
}));

const School = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [list, setList] = useState("list");

  const selectedBoards = useSelector(
    (state) => state?.schoolFilters?.selectedBoards
  );
  const selectedMediums = useSelector(
    (state) => state?.schoolFilters?.selectedMediums
  );
  const selectedGenders = useSelector(
    (state) => state?.schoolFilters?.selectedGenders
  );
  const distanceRange = useSelector(
    (state) => state?.schoolFilters?.distanceRange
  );
  const searchTerm = useSelector((state) => state?.schoolFilters?.searchTerm);
  const { data } = useSelector((state) => state.data.schoolsData);
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const compareList = useSelector((state) => state.data.compareList);

  const [recommendedSc, setRecommendedSc] = useState(data);
  const [mediumData, setMediumData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distanceR, setDistanceR] = useState([0, 100]);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  });

  useEffect(() => {
    if (coords) {
      dispatch(
        setUserCord({
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        })
      );

      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
        })
      );
    } else {
      dispatch(setUserCord({}));
      dispatch(fetchAllSchool());
    }
  }, [coords]);

  useEffect(() => {
    setRecommendedSc(data);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllMedium")
        .then((response) => {
          setMediumData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllBoard")
        .then((response) => {
          setBoardData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    if (distanceRange?.length) {
      setDistanceR(distanceRange);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllCategory")
        .then((response) => {
          setGenderData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }

    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
  }, []);

  const handleBoardChange = (board) => {
    dispatch(
      setSelectedBoards(
        selectedBoards?.includes(board)
          ? selectedBoards?.filter((item) => item !== board)
          : [...selectedBoards, board]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleMediumChange = (medium) => {
    dispatch(
      setSelectedMediums(
        selectedMediums?.includes(medium)
          ? selectedMediums?.filter((item) => item !== medium)
          : [...selectedMediums, medium]
      )
    );
    dispatch(resetPaginationStep());
  };

  const handleGenderChange = (gender) => {
    dispatch(
      setSelectedGenders(
        selectedGenders.includes(gender)
          ? selectedGenders.filter((item) => item !== gender)
          : [...selectedGenders, gender]
      )
    );
  };

  const handleSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(resetPaginationStep());
  };

  const rangeHandler = (e) => {
    const { value } = e.target;
    setDistanceR(value);
    dispatch(setDistanceRange(value));
    dispatch(resetPaginationStep());
  };

  const getCategoryCounts = (schools) => {
    const counts = {
      boards: {},
      mediums: {},
      genders: {},
    };

    schools.forEach((school) => {
      // Count boards
      if (school.board && school.board._id) {
        counts.boards[school.board._id] =
          (counts.boards[school.board._id] || 0) + 1;
      }

      // Count mediums
      if (school.medium && school.medium.length) {
        school.medium.forEach((medium) => {
          if (medium._id) {
            counts.mediums[medium._id] = (counts.mediums[medium._id] || 0) + 1;
          }
        });
      }

      // Count genders
      if (school.category && school.category._id) {
        counts.genders[school.category._id] =
          (counts.genders[school.category._id] || 0) + 1;
      }
    });

    return counts;
  };

  const filteredSchools = data?.filter((school) => {
    if (
      selectedBoards?.length > 0 &&
      !selectedBoards?.includes(school?.board?._id)
    )
      return false;
    if (
      selectedMediums?.length > 0 &&
      !selectedMediums?.some((medium) =>
        school?.medium?.some((schoolMedium) => schoolMedium?._id === medium)
      )
    )
      return false;
    if (
      selectedGenders?.length > 0 &&
      !selectedGenders?.includes(school?.category?._id)
    )
      return false;
    if (distanceRange?.length) {
      const distance = school?.distance;
      if (distance < distanceRange[0] || distance >= distanceRange[1])
        return false;
    }

    if (
      searchTerm &&
      !school?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
      return false;
    return true;
  });

  const [categoryCounts, setCategoryCounts] = useState({
    boards: {},
    mediums: {},
    genders: {},
  });

  useEffect(() => {
    const counts = getCategoryCounts(filteredSchools);
    setCategoryCounts(counts);
  }, [filteredSchools]);

  const distanceMarks = [
    { value: 0, label: "0 km" },
    { value: 25, label: "25 km" },
    { value: 50, label: "50 km" },
    { value: 75, label: "75 km" },
    { value: 100, label: "100 km" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CirclesWithBar
          height="60"
          width="60"
          color="#4fa94d"
          outerCircleColor="#FF7A59"
          innerCircleColor="#FF7A59"
          barColor="#FF7A59"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex md:pt-5 sm:pt-0 px-0 sm:px-0 md:px-5 lg:px-0 sm:pb-3 lg:pb-5 md:pb-5">
      <div className="hidden lg:block lg:w-3/12 border rounded-md p-4 mr-4 h-fit">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <IoSearchSharp className="text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search school"
              className="outline-none focus:outline-none focus:ring-0 bg-transparent border-b border-gray-300 w-full"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>

        <h4 className="text-lg font-semibold mt-6">By Boards</h4>
        <ul className="my-4 overflow-y-auto single-school-scroll min-h-auto max-h-52">
          {boardData?.data &&
            boardData?.data?.map((board) => (
              <div
                key={board._id}
                className="flex justify-between items-center px-2"
              >
                <li
                  className={`my-1.5 capitalize cursor-pointer ${
                    selectedBoards.includes(board._id) ? "text-brand_text" : ""
                  }`}
                  onClick={() => handleBoardChange(board._id)}
                >
                  {board.name}
                </li>
                <p>{categoryCounts.boards[board._id] || 0}</p>
              </div>
            ))}
        </ul>

        <h4 className="text-lg font-semibold">By Gender</h4>
        <ul className="my-4">
          {genderData?.data &&
            genderData?.data?.map((gender) => (
              <div
                key={gender._id}
                className="flex justify-between items-center px-2"
              >
                <li
                  className={`my-1 capitalize cursor-pointer ${
                    selectedGenders.includes(gender._id)
                      ? "text-brand_text"
                      : ""
                  }`}
                  onClick={() => handleGenderChange(gender._id)}
                >
                  {gender?.name}
                </li>
                <p>{categoryCounts.genders[gender._id] || 0}</p>
              </div>
            ))}
        </ul>

        <h4 className="text-lg font-semibold">By Medium</h4>
        <ul className="my-4">
          {mediumData?.data &&
            mediumData?.data?.map((medium) => (
              <div
                key={medium._id}
                className="flex justify-between items-center px-2"
              >
                <li
                  className={`my-1 capitalize cursor-pointer ${
                    selectedMediums.includes(medium._id)
                      ? "text-brand_text"
                      : ""
                  }`}
                  onClick={() => handleMediumChange(medium._id)}
                >
                  {medium.name}
                </li>
                <p>{categoryCounts.mediums[medium._id] || 0}</p>
              </div>
            ))}
        </ul>

        <h4 className="text-lg font-semibold mt-4">By Distance</h4>
        <div className="w-full mx-auto">
          <CustomSlider
            value={distanceR}
            onChange={(e, value) => setDistanceR(value)}
            onChangeCommitted={rangeHandler}
            step={5}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            marks={distanceMarks}
            getAriaValueText={(value) => `${value} km`}
          />
        </div>
      </div>
      <div className="w-full lg:w-9/12">
        <Breadcrumb className="p-4 bg-gray-100">
          <Breadcrumb.Item icon={HiHome}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Schools</Breadcrumb.Item>
        </Breadcrumb>
        <SchoolList schools={filteredSchools} />
      </div>
    </div>
  );
};

export default School;
 */
