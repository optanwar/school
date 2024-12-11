import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { submitReview } from "../../../redux/reviewSlice";
import { CirclesWithBar } from "react-loader-spinner";
import { fetchAllSchool } from "../../../redux/schoolSlice";
const WriteReview = ({ schoolId, data }) => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state?.data?.userCord);
  const { loginUser } = useSelector((state) => state?.auth);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
    schoolId: schoolId,
  });
  const charRegex = /^[a-zA-Z\s]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "name") {
      if (charRegex.test(value) || value === "") {
        console.log("if");
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === "rating" ? Number(value) : value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "rating" ? Number(value) : value,
      }));
    }
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: name === "rating" ? Number(value) : value,
    // }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validate = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    else if (!emailRegex.test(data.email))
      errors.email = "Please enter valid email";
    if (!data.review.trim()) errors.review = "Review is required";
    if (!data.rating) errors.rating = "Rating is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser?.data?.user?._id) {
      setLoading(true);
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length === 0) {
        dispatch(submitReview(formData))
          .then((response) => {
            setLoading(false);
            if (coords?.latitude)
              dispatch(
                fetchAllSchool({
                  userLat: `${coords?.latitude}`,
                  userLong: `${coords?.longitude}`,
                  // distance: 500,
                })
              );
            else dispatch(fetchAllSchool());
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
                  review: "",
                  rating: "",
                  schoolId: schoolId,
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
        className="bg-normal_bg py-8 px-4 rounded-sm shadow-md mt-6"
      >
        <h4 className="text-center font-roboto font-medium text-xl md:text-2xl lg:text-3xl">
          Write a review
        </h4>
        <div>
          <div className="flex justify-center items-center my-5">
            <div className="">
              <div className="flex items-center gap-x-2">
                <p> Your Rating : </p>
                <Rating
                  name="rating"
                  size="small"
                  value={Number(formData.rating)}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, rating: newValue });
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      rating: "",
                    }));
                  }}
                />
              </div>
              <span className="text-center">
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </span>
            </div>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  id=""
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
                  id=""
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
                name="review"
                id=""
                value={formData.review}
                onChange={handleChange}
                placeholder="Your Review"
                className="font-roboto w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200 mt-3"
              ></textarea>
              {errors.review && (
                <p className="text-red-500 text-sm">{errors.review}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button className="primary-btn  py-1.5 px-8 mt-5 rounded-md bg-brand_text text-white transition-all duration-300 hover:bg-orange-600">
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

export default WriteReview;
