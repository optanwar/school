/* import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const RelatedBlogs = ({ data, singleBlog }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);

  const singleBlogTags = singleBlog[0]?.articleTags || [];
  const singleBlogId = singleBlog[0]?._id;

  const relatedBlog = data.filter((blog) =>
    blog.articleTags.some((tag) => singleBlogTags.includes(tag))
  );
  //   const relatedBlog = data.filter(
  //   (blog) =>
  //     blog._id !== singleBlogId &&
  //     blog.articleTags.some((tag) => singleBlogTags.includes(tag))
  // );

  // Create a shallow copy of the data array and sort it by creation date in descending order
  const sortedData = [...relatedBlog]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="overflow-y-auto single-school-scroll h-96">
      {sortedData?.map((blog) => (
        <div
          className="flex flex-col my-3 border shadow-md md:grid md:grid-cols-2 gap-x-2"
          key={blog._id}
        >
          <div className="">
            <Link to={`/blogs/${blog.slug}/${blog._id}`}>
              <img
                src={`${baseUrl}${blog?.coverImage}`}
                alt={blog.title}
                className="object-cover w-full h-20  min-h-20 "
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center px-1">
            <Link to={`/blogs/${blog.slug}/${blog._id}`}>
              <h5 className="text-sm font-medium tracking-wide text-gray-700 transition-all cursor-pointer font-roboto hover:text-brand_text capitalize">
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

export default RelatedBlogs;
 */

/* import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const RelatedBlogs = ({ data, singleBlog }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);


  const singleBlogTags = singleBlog[0]?.articleTags || [];
  const singleBlogId = singleBlog[0]?._id;

  // const relatedBlog = data.filter((blog) =>
  //   blog.articleTags.some((tag) => singleBlogTags.includes(tag))
  // );
  const relatedBlog = data.filter(
    (blog) =>
      blog._id !== singleBlogId &&
      blog.articleTags.some((tag) => singleBlogTags.includes(tag))
  );

  // Create a shallow copy of the data array and sort it by creation date in descending order
  const sortedData = [...relatedBlog]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="overflow-y-auto single-school-scroll h-96">
     
     {sortedData?.map((blog) => (
        <div
          className="flex flex-col my-3 border shadow-md md:grid md:grid-cols-2 gap-x-2"
          key={blog._id}
        >
          <div className="">
            <Link to={`/blogs/${blog.slug}/${blog._id}`}>
              <img
                src={`${baseUrl}${blog?.coverImage}`}
                alt={blog.title}
                className="object-cover w-full h-20  min-h-20 "
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center px-1">
            <Link to={`/blogs/${blog.slug}/${blog._id}`}>
              <h5 className="text-sm font-medium tracking-wide text-gray-700 transition-all cursor-pointer font-roboto hover:text-brand_text capitalize">
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

export default RelatedBlogs; */

import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { setSelectedBloglId } from "../../redux/schoolSlice";
import { useSelector, useDispatch } from "react-redux";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const RelatedBlogs = ({ data, singleBlog }) => {
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const dispatch = useDispatch();
  // Extract tags from the single blog
  const singleBlogTags =
    singleBlog[0]?.articleTags?.map((tag) => tag._id) || [];
  const singleBlogId = singleBlog[0]?._id;

  // Filter related blogs based on tags
  const relatedBlogs = data.filter(
    (blog) =>
      blog._id !== singleBlogId &&
      blog.articleTags.some((tag) => singleBlogTags.includes(tag._id))
  );

  // Sort related blogs by creation date in descending order
  const sortedData = [...relatedBlogs].sort(
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
    <div className="overflow-y-auto px-2 single-school-scroll min-h-auto max-h-96">
      {sortedData.length > 0 ? (
        sortedData.map((blog) => (
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
                  src={`${baseUrl}${blog.coverImage}`}
                  alt={blog.title}
                  className="object-cover w-full h-20 min-h-20"
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
        ))
      ) : (
        <p className="text-gray-500 text-center">No related blogs found.</p>
      )}
    </div>
  );
};

export default RelatedBlogs;
