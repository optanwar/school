import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoSchoolSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArticles, setSelectedBloglId } from "../../redux/schoolSlice";
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
const Articles = ({ deviceType }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setSelectedBloglId(id));
    scrollToTop();
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const blogData = useSelector((state) => state?.data?.articlesData?.data);
  // const data = useSelector((state) => state.data?.articlesData?.data);

  const sortedData =
    blogData && Object.keys(blogData).length
      ? [...blogData]?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [];
  // const blogData = useSelector((state) => state.data.blogs)

  return (
    <div className="py-4 md:py-6 lg:py-7 xl:py-14">
      <div className="container">
        <div className="flex justify-center md:justify-between items-center gap-x-11 flex-wrap gap-y-3 md:gap-y-0 ">
          <h3 className="font-roboto text-xl md:text-3xl lg:text-4xl tracking-normal">
            Recent Articles
          </h3>
          <Link to="/news-and-blogs" onClick={scrollToTop}>
            {" "}
            <button className="flex items-center gap-x-2 font-roboto border px-6 py-2 border-brand_text hover:bg-brand_text hover:text-white  primary-btn transition-all font-normal tracking-wide rounded-sm text-brand_text">
              View All <FaLongArrowAltRight />
            </button>
          </Link>
        </div>

        <div className="my-3 md:my-2">
          {blogData?.length > 0 && (
            <Carousel
              /* swipeable={false}
              draggable={false}
              // showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              // autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlay={deviceType !== "mobile" ? true : false}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              deviceType={deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px" */
              swipeable={false}
              draggable={false}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={deviceType !== "mobile" ? true : false}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 1s ease"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              className="py-10"
            >
              {sortedData?.map((blog) => {
                return (
                  <div
                    className="blog-card overflow-hidden  rounded-sm mx-2 h-full shadow-md bg-normal_bg  "
                    key={blog?._id}
                  >
                    <Link
                      to={`/blogs/${blog?.slug}`}
                      onClick={(e) => handleScroll(blog?._id)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={`${baseUrl}${blog?.coverImage}`}
                          alt={blog?.title}
                          height={400}
                          className="blogs-img cursor-pointer h-40 object-cover md:h-48 w-full"
                        />
                        <p className="bg-brand_text absolute bottom-1 left-0.5 text-white px-1.5  font-roboto  tracking-wider py-1 rounded-sm text-xs md:text-sm">
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={`/blogs/${blog?.slug}`}
                      onClick={(e) => handleScroll(blog?._id)}
                    >
                      {" "}
                      <h3 className="hover:text-brand_text transition-all duration-200 px-4 mt-3 text-lg font-semibold">
                        {blog.title}
                      </h3>
                    </Link>
                    <div className="px-4 flex justify-between py-4">
                      <p className="flex items-center">
                        <span className="mr-1 text-brand_text">
                          <IoSchoolSharp />
                        </span>{" "}
                        School Dekho
                      </p>
                      <p className="flex items-center">
                        {" "}
                        <span className="mr-1 text-green-500">
                          <FaEye />
                        </span>{" "}
                        {blog.totalView ? blog.totalView : 0} Views{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
