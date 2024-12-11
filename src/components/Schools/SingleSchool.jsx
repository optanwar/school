import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { CiLocationOn } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import SchoolTabs from "./SchoolTabs";
import SideBar from "./SingleScholSideBar";
import { addToCompare } from "../../redux/schoolSlice"; // Import the action
import Swal from "sweetalert2";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { fetchAllSchool } from "../../redux/schoolSlice";
import { getAschool } from "../../redux/schoolSlice";
import { Helmet } from "react-helmet";
import axios from "../../redux/axios/axios.js";
import {
  clearBlogFilter,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice.js";
const SingleSchool = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const selectedSchoolId = useSelector(
    (state) => state?.data?.selectedSchoolId
  );

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const lastSegment2 = pathSegments[pathSegments.length - 2];
  const coords = useSelector((state) => state?.data?.userCord);
  const { data } = useSelector((state) => state?.data?.schoolsData);
  const compareList = useSelector((state) => state?.data?.compareList);
  const singleSchool = data?.filter((item) => item?._id === selectedSchoolId);
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const newSingleSchool = useSelector(
    (state) => state?.data?.singleSchoolsData?.data
  );
  const useIp = useSelector((state) => state?.data?.userIP?.ip);
  const userids = useSelector(
    (state) => state?.auth?.loginUser?.data?.user._id
  );

  useEffect(() => {
    dispatch(resetBlogPagination());
    dispatch(clearBlogFilter());
    dispatch(
      getAschool({
        schoolId: selectedSchoolId,
        browserIp: useIp,
        userId: userids,
      })
    );
  }, [selectedSchoolId]);
  // useEffect(() => {
  //   //  need payload for distance
  //   if (newSingleSchool) {
  //     dispatch(fetchAllSchool());
  //   } else {
  //     dispatch(fetchAllSchool());
  //   }
  // }, [newSingleSchool]);

  useEffect(() => {
    if (coords?.latitude)
      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
          // distance: 500,
        })
      );
    else dispatch(fetchAllSchool());
  }, [coords, newSingleSchool]);

  const handleAddToCompare = (schoolId) => {
    const schoolName = data?.find((school) => school?._id === schoolId).name;

    if (compareList?.length < 3) {
      if (!compareList?.includes(schoolId)) {
        dispatch(addToCompare(schoolId));
        Swal.fire({
          text: `${schoolName} has been added for comparison. Go ahead and click the comparison button.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      } else {
        Swal.fire({
          text: `"${schoolName}" is already selected for comparison.`,
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      }
    } else {
      Swal.fire({
        text: `You can only compare up to 3 schools at a time.`,
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF7A59",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-2 md:pb-10 lg:pb-16 xl:pb-20">
      <div className="container">
        <div className="mb-3 flex items-center justify-start">
          <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/">
              {" "}
              <p className="flex items-center gap-x-1 ">
                <span>
                  <HiHome />{" "}
                </span>{" "}
                <span>Home </span>
              </p>{" "}
            </Link>
          </Breadcrumb>
          <Breadcrumb.Item className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/schools-near-me">
              {" "}
              <p className="flex items-center gap-x-1 ">
                <span className="hover:text-brand_text">Schools </span>
              </p>{" "}
            </Link>
          </Breadcrumb.Item>
        </div>
        <div className="py-3 ">
          {singleSchool?.map((school) => (
            <div key={school._id} className="">
              {/* <Helmet>
                <title>{school.name}</title>
                <link type="icon" href="" />
              </Helmet> */}
              <div className="py-5 rounded-md md:bg-normal_bg md:py-7 lg:py-9 md:px-2 lg:flex lg:justify-between lg:items-center">
                <div className="justify-between md:flex gap-x-3 lg:gap-x-6 md:mb-6 lg:mb-0">
                  <div className="mb-4 shadow-inner rounded-2xl w-fit md:mb-0 ">
                    <img
                      src={`${baseUrl}${school.schoolLogoPath}`}
                      alt=" "
                      className="w-40 h-40 px-2 py-2"
                    />
                  </div>
                  <div>
                    <h3 className="my-2 text-xl font-bold tracking-wide md:text-2xl lg:text-3xl font-roboto">
                      {school.name}
                    </h3>
                    <p className="flex items-start text-base font-normal text-gray-500 md:items-center gap-x-1">
                      <span className="mt-1 font-semibold tracking-wide md:mt-0 font-roboto">
                        <CiLocationOn />
                      </span>
                      {school.address}
                    </p>
                    <div className="items-center justify-start my-2 md:flex gap-x-12">
                      <p className=" text-sm my-1 flex items-center gap-1.5">
                        <Rating
                          name="simple-controlled"
                          value={school?.averageRating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <span className="mt-0.5">
                          {" "}
                          ({school?.rating?.length})
                        </span>
                      </p>
                      <div className="flex gap-x-5 justify-between">
                        <p className="text-sm my-1 flex items-center gap-x-1.5 text-gray-500 font-roboto tracking-wide">
                          <span>
                            <FaRegEye />
                          </span>
                          <span className="mt-0.5">
                            {" "}
                            ({school?.totalView}) View
                          </span>
                        </p>
                        <p className=" my-1 flex items-center gap-x-1.5 text-gray-500 font-roboto tracking-wide text-sm">
                          <span>
                            <GiRoad />
                          </span>
                          {school.distance} KM
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-2 md:flex-row">
                      <Link
                        to="/claim-your-school"
                        state={{
                          from: "Claim",
                          name: `${school.name}`,
                          address: `${school.address}`,
                          schoolId: school._id,
                        }}
                      >
                        <button className="flex items-center justify-start px-2 py-1 font-medium transition-all rounded-md shadow-md primary-btn hover:bg-brand_text text-brand_text hover:text-white font-roboto gap-x-1">
                          {" "}
                          <span>
                            <FaRegHeart />
                          </span>
                          Claim this School
                        </button>
                      </Link>

                      <Link to="">
                        {" "}
                        <button
                          onClick={() => handleAddToCompare(school._id)}
                          className="shadow-md primary-btn py-1 px-2.5 hover:bg-brand_text text-brand_text rounded-md hover:text-white font-roboto transition-all font-medium flex justify-start items-center gap-x-1"
                        >
                          {" "}
                          <span>
                            <IoMdGitCompare />
                          </span>
                          Add to Compare
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="my-2 mt-5 md:mt-0 lg:pr-5">
                  <Link
                    to="/admission-enquiry"
                    state={{ from: "admission", id: `${school._id}` }}
                  >
                    <button className="px-5 py-2 text-white transition-all duration-300 bg-green-400 rounded-md shadow-xl hover:bg-brand_text">
                      Admission Enquiry
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-12 gap-y-6 lg:flex-row gap-x-6">
          <div className="w-full lg:w-2/3">
            <SchoolTabs data={singleSchool} />
          </div>
          <div className="w-full lg:w-2/6 md:overflow-y-scroll single-school-scroll">
            <SideBar data={data} singleData={singleSchool} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSchool;
