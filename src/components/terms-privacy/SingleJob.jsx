/* import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
import JobForm from "./ApplyForm";
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
const JobDescription = () => {
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const jopID = useSelector((state) => state?.data?.selectJobId);
  const jobData = useSelector((state) => state?.careersJob?.openJob?.data);

  const handleApplyClick = () => {
    setShowForm(!showForm);
  };

  const singleJob = jobData?.filter((job) => job._id === jopID);
  console.log(singleJob);
  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
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
          <Breadcrumb.Item className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/careers">
              <p className="flex items-center gap-x-1">
                <span className="hover:text-brand_text">Jobs</span>
              </p>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-base font-roboto tracking-wide capitalize ">
            {location.pathname.replace(/%/g, " ").substring(1)}
          </Breadcrumb.Item>
        </div>

        {singleJob.map((jobs) => (
          <div key={jobs._id}>
            <div className="px-3 py-10 bg-normal_bg">
              <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-roboto text-brand_text">
                {jobs.title}
              </h1>
            </div>
            <div className="mt-5 md:mt-8 lg:mt-12">
              <div className="pb-3 flex flex-col md:flex-row justify-start md:justify-between md:items-center">
                <ul>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Job title:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.title}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Location:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.location}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Full Time:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.type == 1 ? "Full Time" : "Part Time"}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Post Date:{" "}
                    <span className="text-gray-500 font-norma text-sm md:text-basel">
                      {formatDate(jobs.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Description:
              </h1>
              <p className="font-roboto">{jobs.description}</p>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Responsibilities:
              </h1>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: jobs.responsibilities }}
                  className="prose  font-roboto  w-full max-w-full  "
                />
              </div>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Requirements:
              </h1>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: jobs.requirements }}
                  className="prose  font-roboto  w-full max-w-full  "
                />
              </div>
            </div>
          </div>
        ))}

        <div className="my-3">
          <button
            onClick={handleApplyClick}
            className="flex items-center gap-x-2 font-roboto border px-6 py-2 border-brand_text bg-brand_text hover:bg-orange-600 text-white primary-btn transition-all font-normal tracking-wide rounded-sm  h-fit w-fit mt-3 md:mt-0"
          >
            Apply Now
          </button>
        </div>
        {showForm && (
          <div id="">
            <JobForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription; */

import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { useSelector } from "react-redux";
import JobForm from "./ApplyForm";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const JobDescription = () => {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [hasFormBeenOpened, setHasFormBeenOpened] = useState(false); // Track if form has been opened
  const jopID = useSelector((state) => state?.data?.selectJobId);
  const jobData = useSelector((state) => state?.careersJob?.openJob?.data);

  // Ref for scrolling to the form
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (!showForm) {
      setShowForm(true);
      setHasFormBeenOpened(true);
    } else {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const singleJob = jobData?.filter((job) => job._id === jopID);
  console.log(singleJob);

  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
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
          <Breadcrumb.Item className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/careers">
              <p className="flex items-center gap-x-1">
                <span className="hover:text-brand_text">Jobs</span>
              </p>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-base font-roboto tracking-wide capitalize">
            {/* {location.pathname.replace(/%/g, " ").substring(1)} */}
            {singleJob[0]?.title}
          </Breadcrumb.Item>
        </div>

        {singleJob.map((jobs) => (
          <div key={jobs._id}>
            <div className="px-3 py-10 bg-normal_bg">
              <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-roboto text-brand_text">
                {jobs.title}
              </h1>
            </div>
            <div className="mt-5 md:mt-8 lg:mt-12">
              <div className="pb-3 flex flex-col md:flex-row justify-start md:justify-between md:items-center">
                <ul>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Job title:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.title}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Location:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.location}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Job Type:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {jobs.type === 1 ? "Full Time" : "Part Time"}
                    </span>
                  </li>
                  <li className="font-roboto font-semibold text-base md:text-lg">
                    Post Date:{" "}
                    <span className="text-gray-500 font-normal text-sm md:text-base">
                      {formatDate(jobs.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Description:
              </h1>
              <p className="font-roboto">{jobs.description}</p>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Responsibilities:
              </h1>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: jobs.responsibilities }}
                  className="prose font-roboto w-full max-w-full"
                />
              </div>
            </div>
            <div className="my-3 pb-3">
              <h1 className="font-roboto font-semibold text-base md:text-lg">
                Requirements:
              </h1>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: jobs.requirements }}
                  className="prose font-roboto w-full max-w-full"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="my-3">
          <button
            onClick={handleApplyClick}
            className="flex items-center gap-x-2 font-roboto border px-6 py-2 border-brand_text bg-brand_text hover:bg-orange-600 text-white primary-btn transition-all font-normal tracking-wide rounded-sm h-fit w-fit mt-3 md:mt-0"
          >
            Apply Now
          </button>
        </div>
        {showForm && (
          <div ref={formRef} id="">
            <JobForm jobId={jopID} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
