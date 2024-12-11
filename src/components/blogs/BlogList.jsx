import React, { useState, useEffect } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import BlogNotFound from "./BlogNotFound";
import { setSelectedBloglId } from "../../redux/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import { setBlogPagination } from "../../redux/schoolFilterSlice";
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const BlogList = ({ data }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const { blogPagination } = useSelector((state) => state?.schoolFilters);
  const dispatch = useDispatch();
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0);
  // Reset currentPage to 0 when data changes
  useEffect(() => {
    if (blogPagination) setCurrentPage(blogPagination);
    else setCurrentPage(0);
  }, [data, blogPagination]);

  // Sort the data by date in descending order
  const sortedData = data
    ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Calculate the index range for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    dispatch(setBlogPagination(selected));
    window.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setSelectedBloglId(id));
    scrollToTop();
  };

  return (
    <div className="md:mt-8">
      {sortedData.length === 0 ? (
        <div className="flex items-center justify-center mt-10">
          <BlogNotFound />
        </div>
      ) : (
        currentData.map((blog) => (
          <div
            className="shadow-md border flex flex-col md:flex-row gap-4 mt-5 md:mt-4"
            key={blog._id}
          >
            <div className="w-full md:w-2/5">
              <Link
                to={`/blogs/${blog?.slug}`}
                onClick={(e) => handleScroll(blog?._id)}
              >
                <img
                  src={`${baseUrl}${blog?.coverImage}`}
                  alt={blog?.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <div className="w-full md:w-3/5 pb-2 md:py-4 px-2">
              <div>
                <Link
                  to={`/blogs/${blog?.slug}`}
                  onClick={(e) => handleScroll(blog?._id)}
                >
                  <h3 className="font-medium text-base lg:text-lg tracking-wide font-roboto my-2 hover:text-brand_text transition-all cursor-pointer capitalize">
                    {blog?.title}
                  </h3>
                </Link>
              </div>
              <div className="flex justify-start gap-x-5 md:my-2">
                <p className="text-sm font-roboto tracking-wide text-gray-500 flex justify-start items-center">
                  <span className="text-black text-sm pr-1.5">
                    <BsCalendar2Date />
                  </span>
                  {formatDate(blog.createdAt)}
                </p>
                <p className="text-sm font-roboto tracking-wide text-gray-500 flex justify-start items-center">
                  <span className="text-black text-sm pr-1.5">
                    <FaRegEye />
                  </span>
                  {blog.totalView ? blog.totalView : 0} Views
                </p>
              </div>
              <div>
                <p className="multiline-ellipsis text-sm font-roboto tracking-wide text-gray-500   w-full">
                  {blog.description}
                </p>
              </div>
              <Link
                to={`/blogs/${blog?.slug}`}
                onClick={(e) => handleScroll(blog?._id)}
              >
                <button className="border py-1.5 mt-4 px-4 primary-btn hover:bg-brand_text transition-all hover:text-white rounded-md font-medium tracking-wide text-brand_text text-sm">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
      <div className="mt-10 flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination font-roboto flex justify-center gap-x-4 bg-normal_bg w-full py-3 px-4 rounded-sm"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default BlogList;
