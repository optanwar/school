import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { CirclesWithBar } from "react-loader-spinner";
import axiosGet from "../../../redux/axios/axios";

const EnquiryForm = ({ data, schoolId }) => {
  const baseUrl = useSelector((state) => state.data.baseUrl);
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

  const handleSendOtp = async () => {
    setOtp("");
    try {
      const response = await axios.post(`${baseUrl}/sendOtp`, {
        phoneNumber: studentPhone,
      });
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
      try {
        let response = await axios.post(`${baseUrl}/submitAdmissionEnquiry`, {
          studentName: studentName,
          schoolId: schoolId,
          studentClass: selectClass,
          phoneNumber: studentPhone,
          gender: selectGender,
          type: "Fees enquiry",
          otp: otp,
          userId: loginUser?.data?.user?._id,
        });
        if (response?.data?.success === true && response?.status === 200) {
          Swal.fire({
            text: response?.data?.message,
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
        }
        if (response?.data?.success === false) {
          Swal.fire({
            text: response?.data?.message,
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
  }, []);

  const studentClassIds =
    data[0]?.studentClass?.map((student) => student._id) || [];

  // Filter the selectClasssData.data based on the presence of class IDs in studentClassIds
  const schoolClasses = classData?.data?.filter((classData) =>
    studentClassIds?.includes(classData._id)
  );
  return (
    <div className="bg-normal_bg mt-5 shadow-md rounded-sm py-8  px-4">
      <h4 className="font-roboto font-medium text-xl md:text-2xl">
        Fees Enquiry Form:
      </h4>
      <form
        onSubmit={handleSubmit}
        ref={enquiryFormRef}
        className="mt-8 flex justify-center items-center flex-col gap-6 mx-2  md:mx-auto "
      >
        <div className="flex flex-col gap-6 md:flex-row w-full mx-1">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Student Name"
              className="outline-offset-0 px-1 py-3 tracking-wide w-full shadow-inner outline-none rounded-sm bg-white focus:outline transition-all duration-300 focus:outline-brand_text font-roboto focus:outline-[1px]"
              value={studentName}
              name="studentName"
              onChange={handleStudentName}
              required
            />
            {errMsg?.studentName && (
              <p className="text-red-500 pt-1 text-sm">{errMsg?.studentName}</p>
            )}
          </div>
          <div className="w-full">
            <select
              className="outline-offset-0 select-list px-1 py-3 tracking-wide w-full shadow-inner outline-none rounded-sm bg-white focus:outline transition-all duration-300 focus:outline-brand_text font-roboto focus:outline-[1px]"
              value={selectClass}
              name="selectClass"
              onChange={handleSelectClass}
              required
            >
              <option value="">Select class</option>
              {schoolClasses?.map((classes) => (
                <option value={classes._id} key={classes._id}>
                  {classes.name}
                </option>
              ))}
            </select>
            {errMsg?.selectClass && (
              <p className="text-red-500 pt-1 text-sm">{errMsg?.selectClass}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row w-full mx-1">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="outline-offset-0 px-1 py-3 tracking-wide w-full shadow-inner outline-none rounded-sm bg-white focus:outline transition-all duration-300 focus:outline-brand_text font-roboto focus:outline-[1px]"
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
                className=" primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300"
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
              className="outline-offset-0 px-1 py-3 tracking-wide w-full shadow-inner outline-none rounded-sm bg-white focus:outline transition-all duration-300 focus:outline-brand_text font-roboto focus:outline-[1px]"
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
                className="primary-btn text-brand_text py-1.5 px-8 mt-5 rounded-md hover:bg-brand_text hover:text-white transition-all duration-300"
                onClick={handleSendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
        <div className="w-full">
          <select
            className="outline-offset-0 select-list px-1 py-3 tracking-wide w-full shadow-inner outline-none rounded-sm bg-white focus:outline transition-all duration-300 focus:outline-brand_text font-roboto focus:outline-[1px]"
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
            <p className="text-red-500 pt-1 text-sm">{errMsg?.selectGender}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={!isOtpSent}
          className={` border-none  py-1.5 px-8 mt-1.5 rounded-md   transition-all duration-300 font-roboto uppercase tracking-wide ${
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
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
