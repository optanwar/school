import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { fetchAllSchool } from "../../redux/schoolSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGeolocated } from "react-geolocated";
import { getAschool } from "../../redux/schoolSlice.js";
import { setSelectedSchoolId } from "../../redux/schoolSlice";
const Recommended_Sc = () => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const { data } = useSelector((state) => state?.data?.schoolsData);
  const [recommendedSc, setRecommendedSc] = useState(data);
  const dispatch = useDispatch();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setSelectedSchoolId(id));
    scrollToTop();
  };
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 0,
  });

  /* const useIp = useSelector((state) => state?.data?.userIP?.ip);
  const userids = useSelector(
    (state) => state?.auth?.loginUser?.data?.user._id
  ); */
  /* const newSingleSchool = useSelector(
    (state) => state?.data?.singleSchoolsData?.data
  ); */
  /* useEffect(() => {
    dispatch(
      getAschool({
        schoolId: "6687873923d1f35f89ae837b",
        browserIp: useIp,
        userId: userids,
      })
    );
  }, []);
  console.log(data, 444); */

  useEffect(() => {
    if (coords) {
      dispatch(
        fetchAllSchool({
          userLat: `${coords?.latitude}`,
          userLong: `${coords?.longitude}`,
          // distance: 50,
        })
      );
    } else {
      dispatch(fetchAllSchool());
    }
  }, [coords]);
  useEffect(() => {
    setRecommendedSc(data);
  }, [data]);

  // useEffect(() => {
  //   AOS.init({
  //     disable: "mobile",
  //     offset: 100,
  //     duration: 300,
  //     easing: "ease-in-out",
  //     delay: 100,
  //   });
  // }, []);
  useEffect(() => {
    const initAOS = () => {
      if (window.innerWidth > 520) {
        AOS.init({
          offset: 100,
          duration: 300,
          easing: "ease-in-out",
          delay: 100,
        });
      }
    };
    initAOS();

    window.addEventListener("resize", initAOS);
    return () => {
      window.removeEventListener("resize", initAOS);
    };
  }, []);

  return (
    <div className="py-4 md:py-6 lg:py-7 xl:py-14">
      <div className="container">
        <div className="flex justify-center md:justify-between items-center gap-x-11 flex-wrap gap-y-3 md:gap-y-0 ">
          <h3 className="font-roboto text-xl md:text-3xl lg:text-4xl tracking-normal">
            Recommended Schools
          </h3>
          <Link to="/schools-near-me" onClick={scrollToTop}>
            {" "}
            <button className="flex items-center gap-x-2 font-roboto border px-6 py-2 border-brand_text hover:bg-brand_text hover:text-white  primary-btn transition-all font-normal tracking-wide rounded-sm text-brand_text">
              View All <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
        {/* {showPopup && <LocationPopup onClose={() => setShowPopup(false)} />} */}
        <div className="py-2 md:py-10 md:my-0 md:grid md:grid-cols-2 md:gap-y-6 md:gap-x-8 lg:grid-cols-3 lg:gap-5 place-content-center place-items-center h-full overflow-hidden">
          {data?.slice(0, 6)?.map((school) => (
            <div key={school._id} className="h-full w-full">
              <div className="school-card border px-2 py-2 md:py-5 shadow-lg rounded-sm  my-6 md:px-3   md:my-3 lg:my-0.5 h-full w-full">
                <div className=" transition-all duration-700 flex justify-center items-center mx-auto w-32 h-32 md:w-40 md:h-40 border rounded-full overflow-hidden">
                  <Link
                    to={`/schools/${school.slug}`}
                    onClick={(e) => handleScroll(school._id)}
                  >
                    {" "}
                    <img
                      src={`${baseUrl}${school?.schoolLogoPath}`}
                      alt="school"
                      className="school-img transition-all duration-700 w-32 h-32 md:w-40 md:h-40 rounded-full"
                    />{" "}
                  </Link>
                </div>
                <div className="flex gap-2 justify-center items-center mt-6">
                  <p className="font-roboto bg-brand_text py-0.5 px-2 rounded text-white text-sm">
                    {school?.board?.name}
                  </p>
                  <p className="font-roboto bg-brand_text py-0.5 px-2 rounded text-white text-sm">
                    {school?.category.name}
                  </p>
                </div>
                <Link
                  to={`/schools/${school.slug}`}
                  onClick={(e) => handleScroll(school._id)}
                >
                  {" "}
                  <h3 className="font-roboto font-semibold text-center text-xl mt-4 hover:text-brand_text transition-all duration-200">
                    {school?.name}
                  </h3>
                </Link>
                {/* <p className=" font-roboto text-gray-500 mt-3  flex justify-start items-baseline gap-x-1 "> */}
                <p className="flex font-roboto gap-x-1 item-center justify-start mt-3 text-gray-500">
                  <span className="flex items-center ">
                    {" "}
                    <FaLocationDot />
                  </span>{" "}
                  <span className="multiline-ellipsis-school">
                    {school?.address}
                  </span>
                </p>
                <div className="flex items-center justify-between mt-2 gap-x-1 ">
                  <div className="flex items-center gap-x-1.5 justify-start">
                    <Rating
                      name="simple-controlled"
                      value={school?.averageRating}
                      precision={0.1}
                      className=""
                      size="small"
                      readOnly
                    />
                    <span className="text-base font-medium mt-0.5">
                      {" "}
                      {school?.rating?.length}
                    </span>
                  </div>
                  <p className="font-roboto flex items-center gap-x-2 text-sm font-medium">
                    <span className="text-green-400">
                      {" "}
                      <FaEye />
                    </span>
                    {school?.totalView ? school?.totalView : 0} Views
                  </p>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended_Sc;
