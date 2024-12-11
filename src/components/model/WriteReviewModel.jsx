import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { submitReview, clearSubmitReviewRes } from "../../redux/reviewSlice";
import { CirclesWithBar } from "react-loader-spinner";
import { fetchAllSchool } from "../../redux/schoolSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const TransitionsModal = ({ schoolId, onCloseModal, modalClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const coords = useSelector((state) => state?.data?.userCord);
  const { loginUser } = useSelector((state) => state?.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
    schoolId: schoolId,
  });

  const handleOpen = () => {
    if (loginUser?.data?.user?._id) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(clearSubmitReviewRes());
    modalClose();
  };
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
    if (!data.rating || data.rating === "")
      errors.rating = "Rating is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(submitReview(formData))
        .then((response) => {
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
            handleClose(); // Close modal after success
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
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="shadow-xl bg-green-400 py-2 px-5 text-white hover:bg-brand_text transition-all duration-300 rounded-md"
      >
        Write a review <span></span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div id="transition-modal-title" variant="h6" component="h2">
              <div className="flex justify-between items-center mb-6">
                <p className="text-center font-semibold text-xl md:text-2xl">
                  Write a review
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 text-red-500 hover:text-red-700 transition-all duration-300 "
                >
                  <GrClose />
                </button>
              </div>
            </div>
            <div id="transition-modal-description" sx={{ mt: 4 }}>
              <div className="flex flex-col justify-start items-center">
                <div className="flex items-center gap-x-2">
                  Your Rating:{" "}
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
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
                <form className="mt-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="font-roboto w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        className="font-roboto w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Your Review"
                    className="font-roboto w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200 mt-6"
                  ></textarea>
                  {errors.review && (
                    <p className="text-red-500 text-sm">{errors.review}</p>
                  )}
                  <button className="mt-5 mx-auto primary-btn px-6 py-1.5 rounded-sm bg-brand_text hover:bg-orange-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-x-2">
                    {/*  Submit Review */}
                    {loading ? (
                      <CirclesWithBar color="#fff" height={20} width={20} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
