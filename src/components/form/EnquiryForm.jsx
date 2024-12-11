import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { CirclesWithBar } from "react-loader-spinner";
import axiosGet from "../../redux/axios/axios.js";
import {
  clearBlogFilter,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice.js";

const EnquiryForm = () => {
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state?.data?.baseUrl);
  const { loginUser } = useSelector((state) => state?.auth);

  const location = useLocation();
  const id = location.state?.id || "";
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [numberError, setNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [otp, setOtp] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [classData, setClassData] = useState();
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const enquiryFormRef = useRef(null);
  const [myotp, setmyOtp] = useState("");
  const handleStudentName = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
    setStudentName(filteredValue);
    setErrMsg({ ...errMsg, [e.target.name]: "" });
  };

  const handleStudentPhone = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/\D/g, "");
    setStudentPhone(filteredValue);
    setErrMsg({ ...errMsg, [e.target.name]: "" });
    setIsOtpSent(false);
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(filteredValue)) {
      setIsPhoneValid(true);
      setErrMsg((prev) => ({ ...prev, studentPhone: "" }));
    } else {
      setIsPhoneValid(false);
      setErrMsg((prev) => ({ ...prev, studentPhone: "Invalid phone number" }));
    }
  };

  const handleSelectClass = (e) => {
    setSelectClass(e.target.value);
    setErrMsg({ ...errMsg, [e.target.name]: "" });
  };

  const handleSelectGender = (e) => {
    setSelectGender(e.target.value);
    setErrMsg({ ...errMsg, [e.target.name]: "" });
  };
  const trimValue = (value) =>
    typeof value === "string" ? value.trim() : value;
  const handleSendOtp = async () => {
    setOtp("");
    try {
      const response = await axios.post(`${baseUrl}/sendOtp`, {
        phoneNumber: trimValue(studentPhone),
      });

      setmyOtp(response?.data?.data);
      if (response?.data?.success) {
        Swal.fire({
          text: "OTP sent successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#ffc451",
        });
        setIsOtpSent(true);
      } else {
        Swal.fire({
          text: response?.data?.message || "Failed to send OTP",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
    setIsOtpSent(true);
  };

  const handleOtpChange = (e) => {
    const digitRegex = /^\d+$/;
    const { value } = e.target;
    setErrMsg({ ...errMsg, [e.target.name]: "" });
    if (digitRegex.test(value) || value === "")
      if (value?.length <= 6) setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = enquiryFormRef.current;
    const phonePattern = /^[0-9]{10}$/;
    let errors = {};
    if (!studentName.trim()) errors.studentName = "Please enter student name";
    if (!studentPhone) errors.studentPhone = "please enter phone number";
    else if (!phonePattern.test(studentPhone))
      errors.studentPhone = "Please enter a valid 10-digit phone number";
    else if (studentPhone.charAt(0) === "0")
      errors.studentPhone = "Phone number should not start with 0";
    if (!selectClass) errors.selectClass = "Please select class";
    if (!selectGender) errors.selectGender = "Please select gender";
    if (otp === "") errors.otp = "Please Enter otp";
    else if (otp?.length !== 6) errors.otp = "Please Enter valid otp";
    if (Object.keys(errors).length === 0) {
      const trimValue = (value) =>
        typeof value === "string" ? value.trim() : value;
      try {
        let response = await axios.post(`${baseUrl}/submitAdmissionEnquiry`, {
          studentName: trimValue(studentName),
          schoolId: trimValue(id),
          studentClass: trimValue(selectClass),
          phoneNumber: trimValue(studentPhone),
          gender: trimValue(selectGender),
          type: "Admission enquiry",
          otp: trimValue(otp),
          userId: trimValue(loginUser)?.data?.user?._id,
        });
        if (response?.data?.success) {
          Swal.fire({
            text: "Your Request Is Submitted",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          }).then((result) => {
            if (result.isConfirmed) {
              setSelectGender("");
              setSelectClass("");
              setStudentPhone("");
              setStudentName("");
              setOtp("");
              setIsOtpSent(false);
              setIsPhoneValid(false);
            }
          });
        } else {
          Swal.fire({
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        if (!otp) {
          Swal.fire({
            text: "Please Enter OTP",
            icon: "info",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            text: "OTP is not valid.Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrMsg(errors);
      setLoading(false);
      if (!form.checkValidity()) {
        form.reportValidity();
      }
    }
  };

  useEffect(() => {
    try {
      axiosGet
        .get("/fetchClasses")
        .then((response) => {
          setClassData(response.data);
          setLoadings(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoadings(false);
        });
    } catch (error) {
      console.log(error);
    }
    // dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
    dispatch(clearBlogFilter());
  }, []);

  return (
    <div className="py-4 md:py-6 lg:py-7 xl:py-14">
      <div className="container">
        <div className="mb-3 flex items-center justify-start">
          <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/">
              <p className="flex items-center gap-x-1 ">
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

        <div className="bg-normal_bg py-4 md:py-6 lg:py-8 shadow">
          <div className="pb-4 md:mb-5">
            <h3 className="font-roboto tracking-wide text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
              Contact information
            </h3>
            <p className="font-roboto tracking-wide text-base md:text-lg text-center text-gray-500 mt-2 font-normal">
              {/* Provide your details below to create your account profile */}
              Please provide your details below
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            ref={enquiryFormRef}
            className="flex justify-center items-center flex-col gap-6 mx-2 md:w-10/12 md:mx-auto lg:w-9/12"
          >
            <div className="flex flex-col gap-6 md:flex-row w-full mx-1">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  className="px-1 py-2 w-full shadow-inner outline-none border rounded-sm indent-2"
                  value={studentName}
                  name="studentName"
                  onChange={handleStudentName}
                  required
                />
                {errMsg?.studentName && (
                  <p className="text-red-500 pt-1 text-sm">
                    {errMsg?.studentName}
                  </p>
                )}
              </div>
              <div className="w-full">
                <select
                  className="select-list w-full py-2 px-1 shadow-inner outline-none border rounded-sm"
                  value={selectClass}
                  name="selectClass"
                  onChange={handleSelectClass}
                  required
                >
                  <option value="">Select class</option>
                  {classData?.data?.map((classes) => (
                    <option value={classes._id} key={classes._id}>
                      {classes.name}
                    </option>
                  ))}
                </select>
                {errMsg?.selectClass && (
                  <p className="text-red-500 pt-1 text-sm">
                    {errMsg?.selectClass}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="flex flex-col gap-6 md:flex-row w-full mx-1">
              <div className="w-full">
                {!isOtpSent ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter Your Phone Number"
                      className="px-1 py-2 w-full shadow-inner outline-none border rounded-sm indent-2"
                      value={studentPhone}
                      name="studentPhone"
                      onChange={handleStudentPhone}
                      required
                    />
                    {errMsg?.studentPhone && (
                      <p className="text-red-500 pt-1 text-sm">
                        {errMsg?.studentPhone}
                      </p>
                    )}
                    {isPhoneValid && (
                      <button
                        type="button"
                        className="primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300 outline-none"
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      className="px-1 py-2 w-full shadow-inner outline-none border rounded-sm indent-2"
                      value={otp}
                      name="otp"
                      onChange={handleOtpChange}
                      required
                    />
                    {isPhoneValid && (
                      <button
                        type="button"
                        className="primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300 outline-none"
                        onClick={handleSendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="w-full">
                <select
                  className="w-full py-2 px-1 shadow-inner outline-none border rounded-sm"
                  value={selectGender}
                  name="selectGender"
                  onChange={handleSelectGender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errMsg?.selectGender && (
                  <p className="text-red-500 pt-1 text-sm">
                    {errMsg?.selectGender}
                  </p>
                )}
              </div>
            </div> */}
            <div className="flex flex-col gap-6 md:flex-row w-full mx-1">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  className="px-1 py-2 w-full shadow-inner outline-none border rounded-sm indent-2"
                  value={studentPhone}
                  name="studentPhone"
                  onChange={handleStudentPhone}
                  required
                />
                {errMsg?.studentPhone && (
                  <p className="text-red-500 pt-1 text-sm">
                    {errMsg?.studentPhone}
                  </p>
                )}
                {isPhoneValid && !isOtpSent && (
                  <button
                    type="button"
                    className="primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300 outline-none"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="px-1 py-2 w-full shadow-inner outline-none border rounded-sm indent-2"
                  value={otp}
                  name="otp"
                  onChange={handleOtpChange}
                  required
                />
                {errMsg?.otp && (
                  <p className="text-red-500 pt-1 text-sm">{errMsg?.otp}</p>
                )}
                {isOtpSent && isPhoneValid && (
                  <button
                    type="button"
                    className="primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300 outline-none"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
            <div className="w-full">
              <select
                className="select-list w-full py-2 px-1 shadow-inner outline-none border rounded-sm"
                value={selectGender}
                name="selectGender"
                onChange={handleSelectGender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errMsg?.selectGender && (
                <p className="text-red-500 pt-1 text-sm">
                  {errMsg?.selectGender}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              disabled={!isOtpSent}
              className={` border-none  py-1.5 px-8 mt-5 rounded-md   transition-all duration-300 font-roboto uppercase tracking-wide ${
                !isOtpSent
                  ? "bg-gray-300 cursor-not-allowed text-black"
                  : "bg-brand_text hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? (
                <CirclesWithBar color="#fff" height={20} width={20} />
              ) : (
                "Submit"
              )}
              {/* {myotp} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
