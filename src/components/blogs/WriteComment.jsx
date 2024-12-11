import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addComment } from "../../redux/reviewSlice";
import { CirclesWithBar } from "react-loader-spinner";
import { fetchAllSchool } from "../../redux/schoolSlice";
import { fetchAllArticles } from "../../redux/schoolSlice";
import axios from "../../redux/axios/axios";
const WriteComment = ({ blogId }) => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state?.data?.userCord);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginUser } = useSelector((state) => state?.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    articleId: blogId,
  });
  const charRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (charRegex.test(value) || value === "") {
        console.log("if");
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    else if (!emailRegex.test(data.email))
      errors.email = "Please enter valid email";
    if (!data.comment) errors.comment = "Comment is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser?.data?.user?._id) {
      setLoading(true);
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length === 0) {
        dispatch(addComment(formData))
          .then((response) => {
            setLoading(false);

            dispatch(fetchAllArticles());

            if (response?.payload?.success === true) {
              Swal.fire({
                text: response.payload.message,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
                customClass: {
                  popup: "custom-swal",
                },
              }).then(() => {
                setFormData({
                  name: "",
                  email: "",
                  comment: "",
                  articleId: blogId,
                });
                setErrors({});
              });
            } else {
              Swal.fire({
                text: response.payload.message || "Failed to submit review.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              text: "Failed to submit review. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          });
      } else {
        setLoading(false);
        setErrors(validationErrors);
      }
    } else {
      Swal.fire({
        text: "Please log in to submit a review.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF7A59",
      });
    }
  };

  return (
    <div>
      <div
        id="writeReviewFrom"
        className="bg-normal_bg py-8 px-4 rounded-sm shadow-sm mt-6"
      >
        <h4 className="font-roboto font-medium text-xl md:text-2xl lg:text-3xl">
          Leave your thought here
        </h4>
        <p className="mt-3 font-roboto text-gray-500">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="py-2 md:py-3 px-2 md:px-3 w-full shadow-inner outline-none border rounded-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2 md:py-3 px-2 md:px-3 w-full shadow-inner outline-none border rounded-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Your Comment"
                className="font-roboto w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200 mt-3"
              ></textarea>
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment}</p>
              )}
            </div>
            {/*  <div className="mt-2">
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                className="accent-brand_text text-5xl font-roboto mr-2 cursor-pointer"
              />
              <label htmlFor="checkbox" className="cursor-pointer">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </div> */}
            <div className="flex justify-center">
              <button className="primary-btn py-1.5 px-8 mt-5 rounded-md bg-brand_text text-white transition-all duration-300 hover:bg-orange-600">
                {loading ? (
                  <CirclesWithBar color="#fff" height={20} width={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
