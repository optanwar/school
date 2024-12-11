import React, { useEffect, useState, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaSchool } from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import axios from "../../redux/axios/axios.js";
import Swal from "sweetalert2";
import { CirclesWithBar } from "react-loader-spinner";
import WriteRevies from "./schoolTabs/WriteReview.jsx";
import SchoolFAQ from "./schoolTabs/SchoolFAQ.jsx";
import FeesEnquary from "./schoolTabs/FeesEnquary";
import SchoolGallery from "../Schools/schoolTabs/SchoolGallery.jsx";
const CustomSlider = styled(Slider)({
  color: "#FF7A59", // Color for the slider track and thumb
  "& .MuiSlider-thumb": {
    borderColor: "yellow",
    height: "8px",
    width: "8px", // Color for the thumb border
  },
  "& .MuiSlider-rail": {
    backgroundColor: "gray", // Color for the rail (background track)
  },
});

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const SchoolTabs = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [facilityType, setFacilityType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const schoolId = data[0]?._id;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    try {
      axios
        .get("/fetchAllFaciltyType")
        .then((response) => {
          setFacilityType(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Something went wrong");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CirclesWithBar
          height="100"
          width="100"
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
    return <div className="text-center blink"> {error}</div>;
  }

  const totalRating = Number(data[0]?.rating?.length);

  const oneStarCount = Number(
    data[0]?.rating?.filter((item) => item?.rating === 1).length
  );
  const twoStarCount = Number(
    data[0]?.rating?.filter((item) => item?.rating === 2).length
  );
  const threeStarCount = Number(
    data[0]?.rating?.filter((item) => item?.rating === 3).length
  );
  const fourStarCount = Number(
    data[0]?.rating?.filter((item) => item?.rating === 4).length
  );
  const fiveStarCount = Number(
    data[0]?.rating?.filter((item) => item?.rating === 5).length
  );

  const calculatePercentage = (count, total) => {
    count = count ?? 0;
    total = total ?? 0;

    // Ensure both count and total are numbers
    if (isNaN(count) || isNaN(total)) {
      return "0.00";
    }

    // Check if total is zero to avoid division by zero
    if (total === 0) {
      return "0.00";
    }
    return ((count / total) * 100).toFixed(2);
  };

  // const totalStars = Number(
  //   data[0]?.rating?.reduce((sum, item) => sum + item.rating, 0)
  // );

  // const avgRating = (totalStars / totalRating).toFixed(2);

  const oneStarPercentage = calculatePercentage(oneStarCount, totalRating);
  const twoStarPercentage = calculatePercentage(twoStarCount, totalRating);
  const threeStarPercentage = calculatePercentage(threeStarCount, totalRating);
  const fourStarPercentage = calculatePercentage(fourStarCount, totalRating);
  const fiveStarPercentage = calculatePercentage(fiveStarCount, totalRating);
  // rating:

  console.log(data, 5555);
  return (
    <div>
      {data?.map((info) => (
        <div key={info._id}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <div className="custom-scrollbar">
                <Tab>Overview</Tab>
                <Tab>Facilities</Tab>
                <Tab>Fees</Tab>
                <Tab>Gallery</Tab>
                <Tab>Reviews</Tab>
                <Tab>FAQ</Tab>
              </div>
            </TabList>
            <div>
              <div>
                <TabPanel>
                  <div className="pt-3">
                    <div className="mb-4 bg-normal_bg py-8  px-4 rounded-sm shadow-md md:flex items-center justify-start md:gap-x-10">
                      <div className="flex flex-col gap-y-1">
                        <p className="flex font-roboto items-center gap-x-1 tracking-wide text-base font-medium text-gray-500">
                          <span className="text-base text-brand_text mr-1">
                            <FaSchool />{" "}
                          </span>
                          Ownership:{" "}
                          <span className="text-gray-800">
                            {info.ownership}
                          </span>
                        </p>
                        <p className="flex font-roboto items-center gap-x-1 tracking-wide text-base font-medium text-gray-500">
                          <span className="text-base text-brand_text mr-1">
                            <LuGoal />{" "}
                          </span>
                          Board:{" "}
                          <span className="text-gray-800">
                            {info?.board?.name}
                          </span>
                        </p>
                      </div>
                      <div className="mt-1 flex flex-col gap-y-1">
                        <p className="flex font-roboto items-center gap-x-1 tracking-wide text-base font-medium text-gray-500">
                          <span className="text-base text-brand_text mr-1">
                            <MdCategory />{" "}
                          </span>
                          Category:{" "}
                          <span className="text-gray-800">
                            {info.category?.name}
                          </span>
                        </p>
                        <p className="flex font-roboto items-center gap-x-1 tracking-wide text-base font-medium text-gray-500">
                          <span className="text-base text-brand_text mr-1">
                            <FaLanguage />{" "}
                          </span>
                          Medium:{" "}
                          <span className="text-gray-800">
                            {/* {info?.medium?.name} */}
                            {info?.medium?.map((ele, index) => (
                              <span key={ele?._id} className="capitalize">
                                {ele?.name}
                                {info?.medium?.length - 1 > index
                                  ? ","
                                  : null}{" "}
                              </span>
                            ))}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="  mt-4  bg-normal_bg  py-8  px-4  rounded-sm shadow-md">
                      <p className="text-lg md:text-xl font-roboto tracking-wide font-medium">
                        Admission Criteria & Eligibility{" "}
                      </p>

                      <div className="px-3 mt-5">
                        {data?.length > 0 &&
                          data[0]?.studentClass?.map((item) => (
                            <p
                              key={item?.name}
                              className="flex items-center gap-x-3 my-2 text-gray-500 font-roboto"
                            >
                              <span className="text-brand_text">
                                <FaLongArrowAltRight />
                              </span>{" "}
                              <span className="md:min-w-24 font-medium text-sm md:text-base">
                                {item?.name} :
                              </span>
                              <span className="text-sm md:text-base">
                                {item?.minimumAge} years & above
                              </span>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
              <div>
                <TabPanel>
                  <div className="bg-normal_bg rounded-sm shadow-md py-8 px-4 mt-5 ">
                    <div className="flex flex-col md:flex-row  justify-center md:justify-between items-center">
                      <p className="font-medium text-lg md:text-xl font-roboto tracking-wide">
                        Facilities
                      </p>
                      <div className="flex gap-x-1 md:gap-x-4">
                        <p className="flex gap-x-1  items-center justify-center font-roboto tracking-wide text-sm">
                          <span className="rounded-full   text-white  font-bold bg-green-500">
                            <TiTick />
                          </span>
                          Available
                        </p>
                        <p className="flex gap-x-1  items-center justify-center font-roboto tracking-wide text-sm">
                          <span className="rounded-full   text-white  font-bold bg-red-600">
                            <GrFormClose />
                          </span>
                          Not Available
                        </p>
                        {/*  <p className='flex gap-x-1  items-center justify-center font-roboto tracking-wide text-sm'><span className='rounded-full   text-white  font-bold bg-yellow-500'><BsQuestion /></span>Unknown</p> */}
                      </div>
                    </div>
                    <div className="mt-5">
                      {facilityType?.data?.map((facilityType) => (
                        <Accordion
                          key={facilityType?.typeName}
                          expanded={expanded === `${facilityType?.typeName}`}
                          onChange={handleChange(`${facilityType?.typeName}`)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "100%", flexShrink: 0 }}>
                              <p className="text-brand_text text-base md:text-lg capitalize">
                                {facilityType.typeName}
                              </p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails className="">
                            <div className="flex flex-col gap-y-3">
                              {facilityType?.facilities?.map((item) => (
                                <div
                                  className="flex justify-between items-center"
                                  key={item?._id}
                                >
                                  <p className="font-roboto text-gray-500 capitalize">
                                    {item.name}
                                  </p>

                                  {info?.facility?.some(
                                    (fac) => fac?._id === item?._id
                                  ) ? (
                                    <span className="rounded-full text-white font-bold bg-green-500">
                                      <TiTick />
                                    </span>
                                  ) : (
                                    <span className="rounded-full text-white font-bold bg-red-600">
                                      <GrFormClose />
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              </div>
              <div>
                <TabPanel>
                  <div className=" pt-5 mt-5">
                    <div className="bg-normal_bg shadow-md rounded-sm  py-8  px-4">
                      <h4 className="font-roboto font-medium text-xl md:text-2xl">
                        School Fees
                      </h4>
                      <div className="py-2 text-gray-500">
                        <p>
                          We appreciate your interest in{" "}
                          <span className="font-roboto font-semibold tracking-wide">
                            {info?.name}.{" "}
                          </span>
                          We understand that choosing the right school for your
                          child is an important decision, and we are delighted
                          that you are considering us.
                        </p>

                        <p className="mt-2 md:mt-4">
                          To know the fee details or the admission process in
                          general, please do not hesitate to get in touch with
                          our admission team. We are here to assist you.
                        </p>
                      </div>
                    </div>
                    <div>
                      {/* fees From */}
                      <FeesEnquary data={data} schoolId={schoolId} />
                    </div>
                  </div>
                </TabPanel>
              </div>
              <div>
                <TabPanel>
                  <div className="bg-normal_bg mt-10 pt-8 pb-2  px-4 rounded-sm shadow-md">
                    <div>
                      {" "}
                      <SchoolGallery data={info?.galleryImages}/>
                    </div>
                   
                  </div>
                </TabPanel>
              </div>
              <div>
                <TabPanel>
                  <div>
                    <div className="bg-normal_bg py-8  px-4 rounded-sm shadow-md mt-6 ">
                      <h4 className="text-center font-roboto font-medium text-xl md:text-2xl lg:text-3xl">
                        Rating
                      </h4>

                      <div className="md:flex justify-between items-center gap-x-4  my-4 ">
                        <div className="md:w-1/4 lg:w-2/6 bg-white py-4 px-8 rounded-md shadow-lg w-fit ">
                          <p className="text-center text-brand_text font-semibold mb-3 text-3xl md:text-4xl lg:text-5xl font-roboto tracking-wide">
                            {info
                              ? info.averageRating.toFixed(2)
                              : info.averageRating}
                          </p>
                          <p className="text-center font-roboto tracking-wide">
                            <Rating
                              name="simple-controlled"
                              value={info?.averageRating}
                              // value={0.9}
                              precision={0.1}
                              size=""
                              readOnly
                            />
                          </p>
                          <p className="text-center font-roboto tracking-wide">
                            {totalRating ? totalRating : 0} Ratings
                          </p>
                        </div>
                        <div className="md:w-3/4 lg:w-2/3">
                          <div className="flex justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 items-center">
                            <Rating
                              name="simple-controlled"
                              readOnly
                              value={5}
                              size="small"
                            />{" "}
                            <CustomSlider
                              value={fiveStarPercentage}
                              aria-label="Fixed Value"
                              valueLabelDisplay="auto"
                              className="w-40"
                              size="small"
                            />
                            <span className="text-sm tracking-wide font-semibold">
                              {`${fiveStarPercentage}%`}
                            </span>
                          </div>
                          <div className="flex justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 items-center">
                            <Rating
                              name="simple-controlled"
                              readOnly
                              value={4}
                              size="small"
                            />{" "}
                            <CustomSlider
                              size="small"
                              value={fourStarPercentage}
                              aria-label=" disabled Fixed Value"
                              valueLabelDisplay="auto"
                              className="w-40"
                            />
                            <span className="text-sm tracking-wide font-semibold">{`${fourStarPercentage}%`}</span>
                          </div>
                          <div className="flex justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 items-center">
                            <Rating
                              name="simple-controlled"
                              readOnly
                              value={3}
                              size="small"
                            />{" "}
                            <CustomSlider
                              size="small"
                              value={threeStarPercentage}
                              aria-label="Fixed Value"
                              valueLabelDisplay="auto"
                              className="w-40"
                            />
                            <span className="text-sm tracking-wide font-semibold">{`${threeStarPercentage}%`}</span>
                          </div>
                          <div className="flex justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 items-center">
                            <Rating
                              name="simple-controlled"
                              readOnly
                              value={2}
                              size="small"
                            />{" "}
                            <CustomSlider
                              size="small"
                              value={twoStarPercentage}
                              aria-label="Fixed Value"
                              valueLabelDisplay="auto"
                              className="w-40"
                            />
                            <span className="text-sm tracking-wide font-semibold">{`${twoStarPercentage}%`}</span>
                          </div>
                          <div className="flex justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 items-center">
                            <Rating
                              name="simple-controlled"
                              readOnly
                              value={1}
                              size="small"
                            />{" "}
                            <CustomSlider
                              size="small"
                              value={oneStarPercentage}
                              aria-label="Fixed Value"
                              valueLabelDisplay="auto"
                              className="w-40"
                            />
                            <span className="text-sm tracking-wide font-semibold">{`${oneStarPercentage}%`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-normal_bg py-8  px-4 rounded-sm shadow-md mt-6">
                      <h4 className="text-center font-roboto font-medium text-xl md:text-2xl lg:text-3xl">
                        Total Review: {info?.rating?.length}
                      </h4>
                      <div className=" pt-8 pb-0">
                        {info?.rating && info?.rating?.length === 0 ? (
                          <p className="text-center mt-4 font-roboto tracking-wide text-gray-500">
                            No review found !
                          </p>
                        ) : (
                          <div className="flex flex-col gap-3 overflow-y-auto single-school-scroll max-h-96">
                            {info?.rating &&
                              info?.rating
                                ?.slice()
                                .reverse()
                                .map((item, index) => (
                                  <div
                                    key={item._id}
                                    className="shadow-sm rounded-md border py-6 px-5 bg-white"
                                  >
                                    <h3 className="font-semibold font-roboto capitalize tracking-wide">
                                      {item.name}
                                    </h3>
                                    <p className="my-2 font-roboto text-sm">
                                      Posted Date :{" "}
                                      {formatDate(item?.createdAt)}
                                    </p>
                                    <div className="mt-2">
                                      <Rating
                                        name="rating"
                                        size="small"
                                        value={item.rating}
                                        readOnly
                                      />
                                    </div>
                                    <p className="font-roboto text-gray-500 font-normal text-justify tracking-wide">
                                      {item.review}
                                    </p>
                                  </div>
                                ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* userReview Write */}
                    <WriteRevies schoolId={schoolId} />
                  </div>
                </TabPanel>
              </div>
              <div>
                <TabPanel>
                  <div>
                    <div className="bg-normal_bg py-8  px-4 rounded-sm shadow-md mt-6">
                      <h4 className="text-center font-roboto font-medium text-xl md:text-2xl lg:text-3xl">
                        Frequently Asked Questions
                      </h4>
                    </div>
                    <div className="bg-normal_bg pb-8 px-4">
                      {/* School FAQ  */}
                      <SchoolFAQ faq={info?.faq} />
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      ))}
    </div>
  );
};

export default SchoolTabs;
