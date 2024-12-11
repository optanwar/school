/* import React, { useEffect, useState } from "react";
import SchoolNotFound from "./SchoolNotFound";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addToCompare } from "../../redux/schoolSlice";
const SchoolList = ({ data, list }) => {
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const [currentPage, setCurrentPage] = useState(0);
  const compareList = useSelector((state) => state.data.compareList);
  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  const itemsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // window.scrollTo(0, 0);
  };

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
  return (
    <div>
      <div
        className={` grid ${
          list === "list" || data?.length === 0
            ? "grid-cols-1"
            : "lg:grid-cols-2"
        } h-fit gap-3`}
      >
        {data?.length === 0 ? (
          <div className="">
            <SchoolNotFound />
          </div>
        ) : (
          currentData?.map((info) => (
            <div
              className="border shadow-sm rounded-sm py-5 px-2 h-fit"
              key={info._id}
            >
              <div className="flex gap-x-2 items-center">
                <Link to={`/schools/${info.slug}/${info._id}`}>
                  <img
                    src={`${baseUrl}${info.schoolLogoPath}`}
                    alt={info.name}
                    className="h-20 md:h-24 shadow-sm"
                  />
                </Link>

                <div className="w-full">
                  <div className="flex justify-between gap-x-2 items-center">
                    <Link to={`/schools/${info.slug}/${info._id}`}>
                      <h3 className="font-semibold text-base md:text-lg lg:text-lg  transition-all cursor-pointer capitalize hover:text-brand_text">
                        {info.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="my-0.5 md:my-1 flex justify-between gap-x-2 items-center">
                    <p className="text-sm md:text-base text-gray-500 font-roboto tracking-wide">
                      {info?.address}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p>
                      <Rating
                        name="simple-controlled"
                        value={info?.averageRating}
                        size="small"
                        precision={0.1}
                        readOnly
                        className="z[-10]"
                      />
                    </p>
                    <p className="text-[12px] md:text-base font-roboto">
                      {info?.distance
                        ? `${info?.distance.toFixed(2)} km`
                        : null}{" "}
                    </p>
                  </div>
                  <div className="mt-2 flex md:flex-row gap-y-1 gap-x-4">
                    <Link
                      to="/claim-your-school"
                      state={{
                        from: "Claim",
                        name: `${info.name}`,
                        address: `${info.address}`,
                      }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <button className="primary-btn px-1 md:px-2 py-0.5 md:py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit">
                        Claim to School
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCompare(info._id)}
                      className="primary-btn px-1 md:px-2 py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit"
                    >
                      Add to compare
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination font-roboto flex justify-center gap-x-4 bg-normal_bg w-full py-3 px-4 rounded-sm"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default SchoolList; */

import React, { useEffect, useState } from "react";
import SchoolNotFound from "./SchoolNotFound";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addToCompare, setSelectedSchoolId } from "../../redux/schoolSlice";
import { setPaginationStep } from "../../redux/schoolFilterSlice";

const SchoolList = ({ data, list }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const [currentPage, setCurrentPage] = useState(0);
  const compareList = useSelector((state) => state?.data?.compareList);
  const { paginationStep } = useSelector((state) => state?.schoolFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!paginationStep) {
      setCurrentPage(0);
    } else setCurrentPage(paginationStep);
  }, [data, paginationStep]);

  const itemsPerPage = list === "list" ? 5 : 10;

  // Calculate the index range for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);
  const pageCount = Math?.ceil(data?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    dispatch(setPaginationStep(selected));
    window.scrollTo(0, 0); // Scroll to top on page change
  };

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
  const handleScroll = (id) => {
    dispatch(setSelectedSchoolId(id));
    scrollToTop();
  };
  return (
    <div>
      <div className="md:-mt-12 mb-6">
        <p className="font-roboto tracking-wide">
          We found {data.length} schools for you in your search location .
        </p>
      </div>
      <div
        className={`grid ${
          list === "list" || data?.length === 0
            ? "grid-cols-1"
            : "lg:grid-cols-2"
        } h-fit gap-3`}
      >
        {data?.length === 0 ? (
          <div>
            <SchoolNotFound />
          </div>
        ) : (
          currentData?.map((info) => (
            <div
              className="border shadow-md rounded-sm py-5 px-2 min-h-44 h-auto"
              key={info._id}
            >
              <div className="flex gap-x-2 items-center">
                <div className="lg:flex justify-center items-center lg:w-1/4 ">
                  <Link
                    to={`/schools/${info.slug}`}
                    onClick={(e) => handleScroll(info._id)}
                  >
                    <img
                      src={`${baseUrl}${info.schoolLogoPath}`}
                      alt={info.name}
                      className={`h-20 ${
                        list === "list" ? "lg:h-32" : "lg:h-24"
                      } max-w-96 shadow-sm hover:scale-105 transition-all duration-300`}
                    />
                  </Link>
                </div>

                <div className="w-full lg:w-3/4">
                  <div className="flex justify-between gap-x-2 items-center">
                    <Link
                      to={`/schools/${info.slug}`}
                      onClick={(e) => handleScroll(info._id)}
                    >
                      <h3
                        className={`font-semibold  transition-all cursor-pointer capitalize hover:text-brand_text ${
                          list === "list"
                            ? "text-base md:text-lg lg:text-lg"
                            : "text-sm md:text-base"
                        } `}
                      >
                        {info.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="my-0.5 md:my-1 flex justify-between gap-x-2 items-center">
                    <p
                      className={` text-gray-500 font-roboto tracking-wide ${
                        list === "list"
                          ? "text-sm md:text-base"
                          : "text-sm md:text-sm"
                      }`}
                    >
                      {info?.address}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p>
                      <Rating
                        name="simple-controlled"
                        value={info?.averageRating}
                        size="small"
                        precision={0.1}
                        readOnly
                        className="z[-10]"
                      />
                    </p>
                    <p
                      className={`${
                        list === "list" ? "test-base" : "text-sm"
                      } font-roboto`}
                    >
                      {info?.distance
                        ? `${info?.distance.toFixed(2)} km`
                        : null}
                    </p>
                  </div>
                  <div className="hidden mt-2 md:flex md:flex-row gap-y-1 gap-x-4">
                    <Link
                      to="/claim-your-school"
                      state={{
                        from: "Claim",
                        name: `${info.name}`,
                        address: `${info.address}`,
                        schoolId: info._id,
                      }}
                      onClick={(e) => handleScroll(info._id)}
                    >
                      <button className="primary-btn px-1 md:px-2 py-0.5 md:py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit">
                        Claim to School
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCompare(info._id)}
                      className="primary-btn px-1 md:px-2 py-0.5 md:py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit"
                    >
                      Add to compare
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:hidden mt-2 flex justify-center md:flex-row gap-y-1 gap-x-4">
                <Link
                  to="/claim-your-school"
                  state={{
                    from: "Claim",
                    name: `${info.name}`,
                    address: `${info.address}`,
                  }}
                  onClick={(e) => handleScroll(info._id)}
                >
                  <button className="primary-btn px-1 md:px-2 py-0.5 md:py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit">
                    Claim to School
                  </button>
                </Link>
                <button
                  onClick={() => handleAddToCompare(info._id)}
                  className="primary-btn px-1 md:px-2 py-0.5 md:py-1 text-brand_text hover:bg-brand_text hover:text-white transition-all duration-200 shadow-md font-medium font-roboto rounded-md text-sm w-fit"
                >
                  Add to compare
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination font-roboto flex justify-center gap-x-4 bg-normal_bg w-full py-3 px-4 rounded-sm"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default SchoolList;
