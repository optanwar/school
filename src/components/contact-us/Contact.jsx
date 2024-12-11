import * as React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import Map from "./Map";
import Swal from "sweetalert2";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  clearContactUsFormResp,
  contactUsForm,
  fetchContactUs,
} from "../../redux/schoolSlice";
import {
  clearBlogFilter,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
const Contact = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { contactUsFormResp } = useSelector((state) => state?.data);
  const { fetchContactUsResp } = useSelector((state) => state?.data);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = React.useState({});
  const contactFormRef = React.useRef(null);
  React.useEffect(() => {
    if (contactUsFormResp?.success) {
      Swal.fire({
        // text: contactUsFormResp?.message,
        text: "Succesfully submitted",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff7a59",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      dispatch(clearContactUsFormResp());
    }
    if (contactUsFormResp?.success === false) {
      const errorObj = contactUsFormResp?.errors?.reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      setErrors(errorObj);
      dispatch(clearContactUsFormResp());
    }
  }, [contactUsFormResp]);

  React.useEffect(() => {
    dispatch(fetchContactUs());
    dispatch(clearBlogFilter());
    dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    if (name === "phoneNumber") {
      // Allow only numeric characters
      const filteredValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else if (name === "firstName" || name === "lastName") {
      // Allow only alphabetic characters and spaces
      const filteredValue = value.replace(/[^A-Za-z\s]/g, ""); // Remove non-alphabetic characters
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const validate = () => {
    let formErrors = {};
    if (!formData.firstName.trim())
      formErrors.firstName = "First Name is required";
    if (!formData.lastName.trim())
      formErrors.lastName = "Last Name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Phone Number is invalid";
    }
    if (!formData.message.trim()) formErrors.message = "Message is required";

    if (Object.keys(formErrors).length === 0) {
      setErrors(formErrors);
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setErrors(formErrors);
      dispatch(contactUsForm(formData));
      // Handle form submission (e.g., send data to server)
    } else {
      setErrors(formErrors);
      const form = contactFormRef.current;
      // console.log("form", form.reportValidity);
      if (!form.checkValidity()) {
        form.reportValidity(); // This will trigger the scroll to the first invalid field
      }
    }
  };
  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
      <div className="container">
        <div className="mb-3 flex items-center justify-start">
          <Breadcrumb className="hover:text-brand_text cursor-pointer  tracking-wide font-medium">
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
          <Breadcrumb.Item className="text-lg  tracking-wide capitalize">
            {location.pathname.replace(/-/g, " ").substring(1)}
          </Breadcrumb.Item>
        </div>

        <div className="mb-3 lg:mb-10 bg-normal_bg py-8 px-2 rounded-sm">
          <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl  text-brand_text">
            Contact Us
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16 py-5">
          <div className="flex flex-col md:flex-row lg:flex-col  gap-6 lg:gap-8 order-2   mt-10 lg:mt-0 lg:w-2/5">
            <div className=" flex gap-x-5">
              <span className="flex justify-start items-center text-xl rounded-full border border-brand_text lg:text-2xl text-brand_text shadow-lg px-3 py-3 h-fit">
                <FaLocationDot />
              </span>
              <div>
                <h4 className="font-roboto font-semibold text-base lg:text-lg ">
                  Address
                </h4>
                <p className=" font-roboto text-sm lg:text-base text-gray-500">
                  {fetchContactUsResp?.data?.address}
                </p>
              </div>
            </div>
            <div className=" flex gap-x-5">
              <span className="flex justify-start items-center text-xl rounded-full border border-brand_text lg:text-2xl text-brand_text shadow-lg px-3 py-3 h-fit">
                <FaPhone />
              </span>
              <div>
                <h4 className="font-roboto font-semibold text-base lg:text-lg ">
                  Contact
                </h4>
                <p className=" font-roboto text-sm lg:text-base text-gray-500">
                  Mobile: {fetchContactUsResp?.data?.mobile} <br />
                  {fetchContactUsResp?.data?.email}
                </p>
              </div>
            </div>
            <div className=" flex gap-x-5">
              <span className="flex justify-start items-center text-xl rounded-full border border-brand_text lg:text-xl text-brand_text font-bold shadow-lg px-3 py-3 h-fit">
                <CiClock2 />
              </span>
              <div>
                <h4 className="font-roboto font-semibold text-base lg:text-lg ">
                  Hour of operation
                </h4>
                <p className=" font-roboto text-sm lg:text-base text-gray-500">
                  {fetchContactUsResp?.data &&
                  Object.keys(fetchContactUsResp?.data)?.length
                    ? fetchContactUsResp?.data?.hours
                        .split(/\r?\n\r?\n/)
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                    : null}
                </p>
              </div>
            </div>
          </div>

          <div className=" order-1  lg:w-3/5">
            <form onSubmit={handleSubmit} className="" ref={contactFormRef}>
              <div className="w-full grid  gird-col-1 lg:grid-cols-2 gap-5">
                <div>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className=" w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 ps-1 text-sm">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className=" w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 ps-1 text-sm">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className=" w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                  />
                  {errors.email && (
                    <p className="text-red-500 ps-1 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className=" w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 ps-1 text-sm">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <textarea
                  required
                  name="message"
                  rows={3}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className=" w-full py-2 md:py-3 px-2 md:px-3 outline-none border rounded-md shadow-inner shadow-gray-200 mt-5"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 ps-1 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="primary-btn py-2 px-10 md:px-12 lg:px-16 mt-4 rounded-md bg-brand_text text-white transition-all  block mx-auto hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12 rounded-md shadow-lg outline-none">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Contact;
