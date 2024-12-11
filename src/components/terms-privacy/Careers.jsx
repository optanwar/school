import {
  resetPaginationStep,
  resetBlogPagination,
  clearBlogFilter,
  clearFilters,
} from "../../redux/schoolFilterSlice";

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJobs } from "../../redux/careersSlice";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { setJobId } from "../../redux/schoolSlice";
const CareerPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
    dispatch(clearBlogFilter());
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, []);

  const jobData = useSelector((state) => state?.careersJob?.openJob?.data);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setJobId(id));
    scrollToTop();
  };

  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
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
          <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
            {location.pathname.replace(/-/g, " ").substring(1)}
          </Breadcrumb.Item>
        </div>

        <div className="px-3 py-10 bg-normal_bg">
          <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-roboto text-brand_text">
            Join Our Team
          </h1>
        </div>

        <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-6">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-3">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              We are a passionate team dedicated to building innovative products
              and delivering exceptional service. Join us to work on exciting
              projects, grow your skills, and make an impact.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Open Positions
            </h2>
            <div className="flex justify-center mx-auto">
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 justify-center">
                {jobData &&
                  jobData?.length &&
                  jobData?.map((job, index) => (
                    <div
                      key={job._id}
                      className="bg-normal_bg p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-2 text-base flex justify-start items-center gap-x-1.5">
                        <span className="text-gray-500 ">
                          <FaLocationDot />
                        </span>{" "}
                        {job.location}
                      </p>
                      <p className="text-gray-600 mb-2 text-base flex justify-start items-center gap-x-1.5">
                        <span className="text-gray-500 ">
                          <MdOutlineWork />
                        </span>
                        {job.type == 1 ? "Full Time" : "Part Time"}
                      </p>
                      <p className="text-gray-700 mb-4 text-base  truncated-text line-clamp-2">
                        {job.description}
                      </p>
                      <Link
                        to={`/Jobs/${job.slug}`}
                        onClick={(e) => handleScroll(job._id)}
                      >
                        <button className=" bg-brand_text text-white px-4 py-2 rounded hover:bg-orange-600 transition-all duration-300 text-sm">
                          View More
                        </button>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            
            {jobData && jobData?.length === 0 && (
              <div>
                <h1 className="text-4xl text-center text-brand_text font-extrabold">
                  No openings available right now.
                </h1>
                <h1 className="text-2xl text-center mt-3">
                  Stay connected for upcoming job opportunities.
                </h1>
              </div>
            )}
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold text-center mb-3">
              Can't find a suitable position?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We are always looking for talented individuals. Feel free to send
              us your resume at{" "}
              <a
                href="mailto:careers@example.com"
                className="text-brand_text underline"
              >
                careers@example.com
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CareerPage;
