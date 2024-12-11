import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import LatestBlog from "./LatestBlog";
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllArticles } from "../../redux/schoolSlice";
import axios from "../../redux/axios/axios";
import { CirclesWithBar } from "react-loader-spinner";
import Swal from "sweetalert2";
import {
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
  setBlogFilter,
} from "../../redux/schoolFilterSlice";

const Blog = () => {
  const data = useSelector((state) => state?.data?.articlesData?.data);

  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blogCategory, setBlogCategory] = useState({});
  const [blogTag, setBlogTag] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { blogSearchTerm, selectedTag, selectedCat } = useSelector(
    (state) => state?.schoolFilters
  );
  // Fetch all articles when the component mounts
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearFilters());
    dispatch(resetPaginationStep());
    if (selectedCat?.length) setSelectedCategories(selectedCat);
    if (selectedTag?.length) setSelectedTags(selectedTag);
    if (blogSearchTerm?.length) setSearchTerm(blogSearchTerm);
  }, []);
  useEffect(() => {
    // if condition not clear all fields
    // if (selectedCategories?.length || selectedTags.length || searchTerm)
    dispatch(
      setBlogFilter({
        selectedCategories: selectedCategories,
        selectedTags: selectedTags,
        searchTerm: searchTerm,
      })
    );
  }, [selectedCategories, selectedTags, searchTerm]);

  // Fetch categories from the API
  useEffect(() => {
    try {
      axios
        .get("/fetchArticleCategory")
        .then((response) => {
          setBlogCategory(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log("Error fetchArticleCategory", error);
    }
  }, []);

  // Fetch tags from the API
  useEffect(() => {
    try {
      axios
        .get("/fetchArticleTags")
        .then((response) => {
          setBlogTag(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    dispatch(resetBlogPagination());
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev?.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    dispatch(resetBlogPagination());
  };

  // Filter blogs based on selected categories, tags, and search term
  const filteredBlogs = data?.filter((blog) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        blog?.articleCategory?._id?.includes(category)
      );
    /*  const matchesTag =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => blog?.articleTags.includes(tag)); */
    const matchesTag =
      selectedTags.length === 0 ||
      blog?.articleTags?.some((tag) => selectedTags.includes(tag._id));
    const matchesSearch =
      !searchTerm ||
      blog?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

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
          visible={true}
        />
      </div>
    );
  }

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
          <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
            {location.pathname.replace(/-/g, " ").substring(1)}
          </Breadcrumb.Item>
        </div>
        <div className="bg-normal_bg py-7 px-3 rounded-lg">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-roboto text-brand_text text-center">
            All Blogs
          </h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row mt-10 gap-x-10 justify-between">
          <div className="lg:w-2/6">
            <div className="relative my-5 shadow-sm">
              <input
                type="text"
                placeholder="Search Blogs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-3 px-6 pl-8 rounded-md outline-none bg-normal_bg border-none font-roboto w-full pointer-events-auto  relative"
              />
              <IoSearchSharp className="absolute left-2 top-3 text-xl text-gray-500" />
            </div>

            <div className="my-5 shadow-md bg-normal_bg  pb-2">
              <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                Categories
              </h4>
              <ul className="my-4">
                {blogCategory?.data &&
                  blogCategory?.data?.map((category) => (
                    <div
                      key={category?._id}
                      className="flex justify-between items-center px-2"
                    >
                      <li
                        className={`my-1 capitalize cursor-pointer ${
                          selectedCategories?.includes(category._id)
                            ? "text-brand_text"
                            : ""
                        }`}
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        {category.name}
                      </li>
                      <p>{category?.count}</p>
                    </div>
                  ))}
              </ul>
            </div>

            <div className="my-5 shadow-md bg-normal_bg  pb-2">
              <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                Popular Tags
              </h4>
              <div className="flex flex-wrap items-center gap-y-4 gap-x-3 mt-3 px-2">
                {blogTag?.data &&
                  blogTag?.data?.map((tag) => (
                    <p
                      key={tag._id}
                      className={`py-1 capitalize px-6 shadow-sm rounded-md cursor-pointer transition-all ${
                        selectedTags.includes(tag._id)
                          ? "bg-brand_text text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => handleTagClick(tag._id)}
                    >
                      {tag.tagName}
                    </p>
                  ))}
              </div>
            </div>

            <div className="shadow-md bg-normal_bg">
              <h4 className="border-b-2 font-roboto bg-brand_text py-2 px-3 rounded-se-lg rounded-ss-lg text-white font-semibold tracking-wider text-lg md:text-xl">
                Latest Posts
              </h4>
              <div className="mt-2 px-1 ">
                <LatestBlog data={data} />
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 mt-[-12px]">
            <BlogList data={filteredBlogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
