import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

import { setSelectedBloglId } from "../../redux/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const LatestBlog = ({ data }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const dispatch = useDispatch();
  // Create a shallow copy of the data array and sort it by creation date in descending order
  const sortedData = [...data]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setSelectedBloglId(id));
    scrollToTop();
  };
  return (
    <div className="overflow-y-auto px-2 single-school-scroll  min-h-auto max-h-96 lg:max-h-[30rem]  ">
      {sortedData?.map((blog) => (
        <div
          className="flex flex-col my-3 border shadow-md md:flex-row gap-x-2 bg-white"
          key={blog._id}
        >
          <div className="w-full md:w-2/5">
            <Link
              to={`/blogs/${blog?.slug}`}
              onClick={(e) => handleScroll(blog?._id)}
            >
              <img
                src={`${baseUrl}${blog?.coverImage}`}
                alt={blog.title}
                className="object-cover w-full h-20  min-h-20 "
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center px-1 w-full md:w-3/5">
            <Link
              to={`/blogs/${blog?.slug}`}
              onClick={(e) => handleScroll(blog?._id)}
            >
              <h5 className="text-sm font-medium tracking-wide text-gray-700 transition-all cursor-pointer font-roboto hover:text-brand_text capitalize multiline-ellipsis">
                {blog.title}
              </h5>
            </Link>
            <p className="font-roboto tracking-wide text-gray-500 mt-2 text-[13px] flex justify-start items-center">
              <span className="text-black text-sm pr-1.5">
                <MdOutlineDateRange />
              </span>{" "}
              {formatDate(blog.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestBlog;
