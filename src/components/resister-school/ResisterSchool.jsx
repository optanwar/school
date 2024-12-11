import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CirclesWithBar } from "react-loader-spinner";
import {
  clearBlogFilter,
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
const ResisterSchool = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    schoolName: "",
    schoolPhone: "",
    schoolEmail: "",
    schoolAddress: "",
    studentName: "",
    studentPhone: "",
    studentEmail: "",
    studentProfile: "",
    checkbox: false,
  });
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const formRef = useRef(null);
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrMsg({ ...errMsg, [name]: "" });
    if (name === "schoolPhone" || name === "studentPhone") {
      // Allow only numeric characters
      const filteredValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormState((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : filteredValue,
      }));
    } else if (
      name === "schoolName" ||
      name === "studentName" ||
      name === "studentProfile"
    ) {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormState((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : filteredValue,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // if (name === "schoolPhone" || name === "studentPhone") {
    //   const phonePattern = /^[0-9]{10}$/; // Adjust the regex pattern to fit the desired phone number format
    //   if (!phonePattern.test(value)) {
    //     setNumberError("Please enter a valid 10-digit phone number");
    //   } else {
    //     setNumberError("");
    //   }
    // }

    // if (name === "schoolEmail" || name === "studentEmail") {
    //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailPattern.test(value)) {
    //     setEmailError("Please enter a valid email");
    //   } else {
    //     setEmailError("");
    //   }
    // }
  };
  useEffect(() => {
    dispatch(clearFilters());
    dispatch(clearBlogFilter());
    dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
  }, []);

  function simplifySchoolName(schoolName) {
    return schoolName
      .toLowerCase() // Convert to lowercase
      .replace(/the|international|school/gi, "") // Remove common words, case insensitive
      .replace(/\s+/g, "") // Remove spaces
      .trim(); // Remove any leading or trailing spaces
  }

  function isValidOfficialEmail(schoolName, email) {
    const simplifiedName = simplifySchoolName(schoolName);
    const emailRegex = new RegExp(
      `^${simplifiedName}.*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`
    );
    return emailRegex.test(email);
  }
  const handleSubmit = async (e) => {
    const form = formRef.current;
    setLoading(true);
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    let error = {};

    if (!formState.schoolName.trim()) {
      error.schoolName = "Please enter school name";
    }
    if (!formState.schoolPhone) {
      error.schoolPhone = "Please enter contact number";
    } else if (!phonePattern.test(formState.schoolPhone)) {
      error.schoolPhone = "Please enter a valid 10-digit phone number";
    }
    if (!formState.schoolEmail) {
      error.schoolEmail = "Please enter school's email id";
    } else if (!emailPattern.test(formState.schoolEmail))
      // } else if (
      //   !isValidOfficialEmail(formState.schoolName, formState.schoolEmail)
      // )
      error.schoolEmail = "Please enter a valid email";
    if (!formState.schoolAddress.trim()) {
      error.schoolAddress = "Please enter school address";
    }
    if (!formState.studentName.trim()) {
      error.studentName = "Please enter your name";
    }
    if (!formState.studentPhone) {
      error.studentPhone = "Please enter phone number";
    } else if (!phonePattern.test(formState.studentPhone)) {
      error.studentPhone = "Please enter a valid 10-digit phone number";
    }
    if (!formState.studentEmail) {
      error.studentEmail = "Please enter your email";
    } else if (!emailPattern.test(formState.studentEmail)) {
      error.studentEmail = "Please enter a valid email";
    }
    if (!formState.studentProfile.trim()) {
      error.studentProfile = "Please enter your designation";
    }
    if (!formState.checkbox)
      error.checkbox = "You must agree to the terms and conditions";
    if (Object.keys(error).length === 0) {
      setErrMsg({}); // remove all errors
      // if (!formState.checkbox) {
      //   Swal.fire({
      //     text: "You must agree to the terms and conditions",
      //     icon: "warning",
      //     confirmButtonText: "OK",
      //     confirmButtonColor: "#ffc451",
      //   });
      //   setLoading(false);
      //   return;
      // } else {
      // console.log("Form submitted successfully", formState);
      try {
        const response = await axios.post(`${baseUrl}/registerSchool`, {
          schoolName: formState.schoolName,
          Address: formState.schoolAddress,
          officialContactNumber: formState.schoolPhone,
          officialEmailId: formState.schoolEmail,
          contactPersonName: formState.studentName,
          designation: formState.studentProfile,
          contactPersonMobileNumber: formState.studentPhone,
          contactPersonEmail: formState.studentEmail,
        });
        if (response?.data?.success === true && response?.status === 200) {
          Swal.fire({
            text: response?.data?.message,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          }).then((result) => {
            if (result.isConfirmed) {
              setFormState({
                schoolName: "",
                schoolPhone: "",
                schoolEmail: "",
                schoolAddress: "",
                studentName: "",
                studentPhone: "",
                studentEmail: "",
                studentProfile: "",
                checkbox: false,
              });
            }
          });
        }
        if (response?.data?.success === false) {
          Swal.fire({
            text: response?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
          // throw new Error("Network response was not ok.");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false); // Hide loader
        Swal.fire({
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
        // }
      }
    } else {
      if (!form.checkValidity()) {
        form.reportValidity(); // This will trigger the scroll to the first invalid field
      }
      // Set error messages
      setErrMsg(error);
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
      <div className="container md:w-10/12">
        <div className="text-center">
          <p className="font-roboto text-sm md:text-lg xl:text-xl tracking-wide font-normal text-brand_text">
            BE A PART OF SCHOOL DEKHO
          </p>
          <h3 className="font-roboto text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl tracking-wide mt-2 md:mt-5 font-bold">
            Register Your School
          </h3>
        </div>

        <div className="mt-10">
          <form
            className=""
            action="/"
            method="post"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div>
              <fieldset className="border py-5 md:py-8 px-2 md:px-5 rounded-md">
                <legend className="px-0.5 text-brand_text text-xl md:text-2xl lg:text-3xl font-roboto tracking-wide">
                  School Information
                </legend>
                <div className="flex flex-col md:grid grid-cols-2 gap-3 md:gap-6">
                  <div>
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="School Name"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.schoolName}
                      onChange={handleChange}
                    />
                    {errMsg?.schoolName && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.schoolName}
                      </div>
                    )}
                    {/* Error message for schoolName */}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="schoolAddress"
                      placeholder="Address Of The School"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.schoolAddress}
                      onChange={handleChange}
                    />

                    {errMsg?.schoolAddress && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.schoolAddress}
                      </div>
                    )}
                    {/* Error message for schoolAddress */}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="schoolPhone"
                      placeholder="Official Contact Number"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.schoolPhone}
                      onChange={handleChange}
                    />
                    {errMsg?.schoolPhone && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.schoolPhone}
                      </div>
                    )}
                    {/* Error message for schoolPhone */}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="schoolEmail"
                      placeholder="Official Email Id"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.schoolEmail}
                      onChange={handleChange}
                    />
                    {errMsg?.schoolEmail && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.schoolEmail}
                      </div>
                    )}
                    {/* Error message for schoolEmail */}
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mt-5 md:mt-10">
              <fieldset className="border py-5 md:py-8 px-2 md:px-5 rounded-md">
                <legend className="px-0.5 text-brand_text text-xl md:text-2xl lg:text-3xl font-roboto tracking-wide">
                  Contact Information
                </legend>
                <div className="flex flex-col md:grid grid-cols-2 gap-3 md:gap-6">
                  <div>
                    <input
                      type="text"
                      name="studentName"
                      placeholder="Name"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      value={formState.studentName}
                      onChange={handleChange}
                      required
                    />
                    {errMsg?.studentName && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.studentName}
                      </div>
                    )}
                    {/* Error message for studentName */}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="studentProfile"
                      placeholder="Designation"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.studentProfile}
                      onChange={handleChange}
                    />
                    {errMsg?.studentProfile && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.studentProfile}
                      </div>
                    )}
                    {/* Error message for studentProfile */}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="studentPhone"
                      placeholder="Mobile Number"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.studentPhone}
                      onChange={handleChange}
                    />
                    {errMsg?.studentPhone && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.studentPhone}
                      </div>
                    )}
                    {/* Error message for studentPhone */}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="studentEmail"
                      placeholder="Email Id"
                      className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none rounded-md focus:bg-white bg-gray-100 focus:outline transition-all duration-300 focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                      required
                      value={formState.studentEmail}
                      onChange={handleChange}
                    />
                    {errMsg?.studentEmail && (
                      <div style={{ color: "red" }} className="mt-1 text-sm">
                        {errMsg?.studentEmail}
                      </div>
                    )}
                    {/* Error message for studentEmail */}
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mt-5">
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  checked={formState.checkbox}
                  onChange={handleChange}
                  className="accent-brand_text text-5xl font-roboto mr-2 cursor-pointer	"
                />
                <label htmlFor="checkbox" className="cursor-pointer	">
                  By clicking checkbox, I accept the
                  <Link
                    to="/terms-and-conditions"
                    onClick={scrollToTop}
                    className="underline text-brand_text"
                  >
                    {" "}
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    onClick={scrollToTop}
                    className="underline text-brand_text"
                  >
                    {" "}
                    Privacy Policy
                  </Link>{" "}
                  of School Dekho.
                </label>
                {errMsg?.checkbox && (
                  <div style={{ color: "red" }} className="mt-1 text-sm">
                    {errMsg?.checkbox}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-brand_text text-white font-roboto hover:bg-orange-600 mt-5 py-2 px-14 text-lg rounded-md" /*  disabled={!formState.checkbox} */
            >
              {loading ? (
                <CirclesWithBar color="#fff" height={20} width={20} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResisterSchool;
