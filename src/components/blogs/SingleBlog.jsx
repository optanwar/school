import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import LatestBlog from "./LatestBlog";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import logoicon from "../../assets/logo-icon.png";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import RelatedBlogs from "./RelatedBlog";
import WriteComment from "./WriteComment";
import { getArticle } from "../../redux/schoolSlice";
import { fetchAllArticles } from "../../redux/schoolSlice";
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
const SingleBlog = () => {
  const dispatch = useDispatch();
  const selectedBlogId = useSelector((state) => state?.data?.selectedBlogId);
  const location = useLocation();
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const blogData = useSelector((state) => state.data?.articlesData?.data);
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments?.length - 1];
  const lastSegment2 = pathSegments[pathSegments?.length - 2];

  const filterBlog = blogData.filter((blog) => blog._id == selectedBlogId);
  const blogId = filterBlog[0]?._id;
  const useIp = useSelector((state) => state?.data?.userIP?.ip);
  const userids = useSelector(
    (state) => state?.auth?.loginUser?.data?.user._id
  );

  const newSingleBlog = useSelector(
    (state) => state?.data?.singleBlogCountData?.data
  );

  useEffect(() => {
    dispatch(
      getArticle({
        articleId: selectedBlogId,
        browserIp: useIp,
        userId: userids,
      })
    );
  }, [selectedBlogId]);

  useEffect(() => {
    // if (newSingleBlog) {
    //   dispatch(fetchAllArticles());
    // } else {
    //   dispatch(fetchAllArticles());
    // }
    dispatch(fetchAllArticles());
  }, [newSingleBlog]);

  // dispatch(fetchAllArticles());

  return (
    <div className="py-5 md:py-7 lg:py-9 xl:py-11">
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
            <Link to="/news-and-blogs">
              {" "}
              <p className="flex items-center gap-x-1 ">
                <span className="hover:text-brand_text">Blogs </span>
              </p>{" "}
            </Link>
          </Breadcrumb.Item>
        </div>

        <div className="px-3 py-10 rounded-lg bg-normal_bg">
          <h1 className="text-lg font-semibold tracking-wide text-center md:text-xl lg:text-2xl xl:text-2xl font-roboto text-brand_text">
            {filterBlog[0]?.title}
          </h1>
        </div>

        <div className="flex flex-col-reverse justify-between mt-12 lg:flex-row gap-x-10">
          <div className="lg:w-2/6">
            <div className="md:mt-0 mt-10 bg-normal_bg">
              <h4 className="px-3 py-2 text-xl font-semibold tracking-wider  text-white border-b-2 font-roboto bg-brand_text rounded-se-lg rounded-ss-lg md:text-2xl">
                Latest Posts
              </h4>
              <div className="mt-6 md:mt-2 px-1">
                <LatestBlog data={blogData} />
              </div>
            </div>
            <div className="mt-4 md:mt-5 lg:mt-8 bg-normal_bg">
              <h4 className="px-3 py-2 text-xl font-semibold tracking-wider text-white border-b-2 font-roboto bg-brand_text rounded-se-lg rounded-ss-lg md:text-2xl">
                Related Posts
              </h4>
              <div className="mt-6 md:mt-2 px-1">
                <RelatedBlogs data={blogData} singleBlog={filterBlog} />
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            {filterBlog?.map((blog) => (
              <div className="" key={blog.id}>
                <img
                  src={`${baseUrl}${blog?.coverImage}`}
                  alt=""
                  className="w-full h-72 object-cover"
                />

                <div className="flex flex-wrap justify-between mt-3 text-gray-500 gap-x-3 font-roboto">
                  <p className="flex items-center justify-center gap-x-1">
                    <img
                      src={logoicon}
                      alt="School dekho logo "
                      className="h-4"
                    />
                    School Dekho
                  </p>
                  <p className="flex items-center justify-center gap-x-1">
                    <MdOutlineDateRange />
                    {formatDate(blog.createdAt)}
                  </p>
                  <p className="flex items-center justify-center gap-x-1">
                    <FaRegEye />
                    {blog?.totalView ? blog?.totalView : 0} Views
                  </p>
                  <p className="flex items-center justify-center gap-x-1">
                    {" "}
                    <FaRegCommentDots />
                    {blog?.comment.length} Comment
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold tracking-wide font-roboto md:text-xl lg:text-2xl">
                    {blog.title}
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog?.content }}
                    className="prose md:prose-lg lg:prose-lg font-roboto  w-full max-w-full  "
                  />
                </div>

                <div>
                  <div>
                    <WriteComment blogId={blogId} />
                  </div>
                </div>

                <div className="bg-normal_bg py-8  px-4 rounded-sm shadow-sm mt-6">
                  <h1 className="font-roboto font-medium text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 ">
                    Comments:- {blog?.comment?.length}
                  </h1>

                  <div className="flex flex-col gap-3 overflow-y-auto single-school-scroll max-h-96">
                    {blog?.comment &&
                      blog?.comment
                        ?.slice()
                        .reverse()
                        .map((commenta) => (
                          <div
                            key={commenta._id}
                            className="shadow-sm rounded-md border py-6 px-5 bg-white"
                          >
                            <h3 className="font-semibold font-roboto capitalize tracking-wide">
                              {commenta.name}
                            </h3>
                            <p className="my-2 font-roboto text-sm">
                              Posted Date : {formatDate(commenta.createdAt)}
                            </p>

                            <p className="font-roboto text-gray-500 font-normal text-justify tracking-wide">
                              {commenta.comment}
                            </p>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
            <div>
              {/*     <div>
                <WriteComment blogId={blogId} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
