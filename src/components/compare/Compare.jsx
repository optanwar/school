import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { updateData, removeFromCompare } from "../../redux/schoolSlice";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TiTick } from "react-icons/ti";
import { HiOutlinePlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../redux/axios/axios.js";
import { CirclesWithBar } from "react-loader-spinner";

function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const Compare = () => {
  const [expanded, setExpanded] = useState(false);
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state?.data?.schoolsData?.data);
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const compareList = useSelector((state) => state?.data?.compareList);

  useEffect(() => {
    if (compareList?.length === 0) {
      navigate("/");
    }
  }, [compareList, navigate]);

  useEffect(() => {
    try {
      axios
        .get("/fetchAllFaciltyType")
        .then((response) => {
          setFacilityTypes(response?.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error?.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRemoveFromCompare = (schoolId) => {
    dispatch(removeFromCompare(schoolId));
  };

  const comparedSchools = data?.filter((school) =>
    compareList?.includes(school._id)
  );

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
      <div className="flex justify-center  items-center  font-roboto tracking-wide py-10">
        <div>
          <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
            Oops!{" "}
          </h1>
          <h2 className="my-5">404 - Something want wrong</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 md:pt-11 lg:pt-14 xl:pt-16 pb-10 md:pb-11 lg:pb-14 xl:pb-16">
      <div className="container">
        <div className="px-3 rounded-lg bg-normal_bg py-7">
          <h1 className="text-2xl text-center md:text-4xl lg:text-5xl xl:text-6xl font-roboto text-brand_text">
            Compare School
          </h1>
        </div>
        <div className="flex  mt-10 gap-x-3 overflow-x-auto compare-scroll">
          {comparedSchools?.length > 0 ? (
            comparedSchools.map((school) => (
              <div
                key={school._id}
                className="min-w-[390px] lg:min-w-[470px] xl:min-w-[570px] w-full compare-card"
              >
                <div className="flex justify-between px-4 py-5 bg-normal_bg rounded-t-md ">
                  <div className="card-header flex items-center gap-x-3 ">
                    <div className="p-2 shadow-sm ">
                      <img
                        src={`${baseUrl}${school.schoolLogoPath}`}
                        alt={school.name}
                        className="h-28 w-32 lg:h-24 lg:w-24"
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-medium text-base  ${
                          comparedSchools?.length > 1
                            ? "md:text-base"
                            : "md:text-xl"
                        } md:text-lg font-roboto mb-1.5 tracking-wide capitalize`}
                      >
                        {capitalizeFirstLetter(school.name)}
                      </h3>
                      <div className="flex items-center justify-between gap-x-10">
                        <div>
                          <p
                            className={`flex items-baseline mb-1 ${
                              comparedSchools?.length > 1
                                ? "text-sm"
                                : "text-base"
                            } tracking-wide text-gray-500 gap-x-1  font-roboto`}
                          >
                            <SlLocationPin />
                            {school.address}
                          </p>
                          <p className="flex items-center mb-1 tracking-wide text-gray-500 gap-x-1 font-roboto">
                            <Rating
                              name="simple-controlled"
                              value={school?.averageRating}
                              precision={0.1}
                              size="small"
                              readOnly
                            />{" "}
                            {school?.rating.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveFromCompare(school._id)}
                      className="p-1 text-xl font-bold transition-all duration-300 shadow-sm hover:text-red-600"
                    >
                      <RiCloseLine />
                    </button>
                    <Link to="/admission-enquiry">
                      <button className="px-1 py-1.5 font-roboto text-sm  leading-none md:leading-normal md:px-3 md:py-1 text-white transition-all duration-300 bg-green-400 rounded-md shadow-md hover:bg-brand_text">
                        Admission Enquiry
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="px-4 pb-5  bg-normal_bg rounded-b-md">
                  {facilityTypes?.data?.map((facilityType) => (
                    <Accordion
                      expanded={expanded === facilityType?.typeName}
                      onChange={handleChange(facilityType?.typeName)}
                      key={facilityType?.typeName}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${facilityType?.typeName}-content`}
                        id={`${facilityType?.typeName}-header`}
                      >
                        <Typography sx={{ width: "100%", flexShrink: 0 }}>
                          <p className="text-brand_text text-base md:text-lg capitalize">
                            {facilityType?.typeName}
                          </p>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-col gap-y-3">
                          {facilityType?.facilities?.map((facility) => (
                            <div
                              className="flex justify-between items-center"
                              key={facility._id}
                            >
                              <p className="font-roboto text-gray-500 capitalize">
                                {facility?.name}
                              </p>
                              {school?.facility?.some(
                                (f) => f._id === facility._id
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
            ))
          ) : (
            <p>No schools in the compare list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
