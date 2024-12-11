/* import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../../assets/home-contact.png";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Swal from "sweetalert2";

import { CirclesWithBar } from "react-loader-spinner";
import axiosGet from "../../redux/axios/axios.js";
import { getReqCallbackCount } from "../../redux/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
const Request_Callback = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectClass: "",
    pinCode: "",
  });
  const totalEnquiry = useSelector((state) => state?.data?.totalEnquiry);
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState();
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const location = useLocation();
  console.log(totalEnquiry, 555555555);
  useEffect(() => {
    dispatch(getReqCallbackCount());
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "pinCode") {
      // Allow only numeric characters
      const filteredValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else if (name === "name") {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    setErrMsg({ ...errMsg, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setLoading(true);
    const { name, phone, selectClass, pinCode } = formData;
    let errors = {};
    const phonePattern = /^[0-9]{10}$/;
    const pinCodePattern = /^[0-9][0-9]{5}$/;
    if (!name.trim()) errors.name = "Please enter your full name";
    if (!phone) errors.phone = "Please enter your phone number";
    else if (!phonePattern.test(phone))
      errors.phone = "Please enter a valid 10-digit phone number";
    else if (phone.charAt(0) === "0")
      errors.phone = "Phone number should not start with 0";
    if (!pinCode) errors.pinCode = "Please enter pin code";
    else if (!pinCodePattern.test(pinCode))
      errors.pinCode = "Please enter a valid 6-digit pin code";
    else if (pinCode.charAt(0) === "0")
      errors.pinCode = "Pin code should not start with 0";
    if (!selectClass) errors.selectClass = "Please enter class";
    if (Object.keys(errors).length === 0) {
      setErrMsg({});
      try {
        const response = await axios.post(`${baseUrl}/submitCallBackForm`, {
          fullName: name.trim(),
          phone: phone,
          pinCode: pinCode,
          studentClass: selectClass,
        });

        // console.log(response, 555);

        if (response?.data?.success === true && response.status === 200) {
          dispatch(getReqCallbackCount());
          setFormData({
            name: "",
            phone: "",
            selectClass: "",
            pinCode: "",
          });
          Swal.fire({
            text: response?.data?.message,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          });
        }
        if (response?.data?.success === false && response.status === 200) {
          Swal.fire({
            text: response?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
        Swal.fire({
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrMsg(errors);
      if (!form.checkValidity()) {
        form.reportValidity(); // This will trigger the scroll to the first invalid field
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

  return (
    <div className="bg-normal_bg py-4 md:py-6 lg:py-7 xl:py-14" id="counsling">
      <div className="container">
        <div className="md:grid grid-cols-2 place-content-between md:gap-x-11 lg:gap-x-12 overflow-hidden">
          <div data-aos="fade-right">
            <h3 className="font-roboto text-center md:text-left text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-5 md:mb-3 lg:mb-3 tracking-wide">
              Get in touch with our Expert{" "}
              <span className="text-brand_text font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                {" "}
                COUNSELLORS
              </span>
            </h3>
            <p className="font-roboto text-center md:text-left text-lg md:text-lg lg:text-xl xl:text-2xl tracking-wide text-gray-500">
              Guaranteed call back within 24 hours from our expert counsellors.
            </p>
            <img
              src={img}
              alt=""
              className="md:mt-16 flex justify-center items-center mx-auto md:mx-0 mt-10"
            />
          </div>
          <div
            className="mt-6 md:mt-0 md:bg-white md:py-6 md:rounded-lg md:shadow-sm"
            data-aos="fade-left"
          >
            <h3 className="font-roboto text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl pb-6">
              Request a Callback
            </h3>
            <form
              ref={formRef}
              id="parents-counsling"
              action=" "
              className="md:w-11/12 lg:w-10/12 mx-auto flex flex-col mt-5 gap-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                {errMsg?.name && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.name}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errMsg?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.phone}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin-code"
                  className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                />
                {errMsg?.pinCode && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.pinCode}</p>
                )}
              </div>
              <div>
                <select
                  name="selectClass"
                  className="w-full py-3 font-roboto font-normal tracking-wide px-1 md:px-2 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.selectClass}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  {classData?.data?.map((classes) => (
                    <option value={classes._id} key={classes._id}>
                      {classes.name}
                    </option>
                  ))}
                </select>
                {errMsg?.selectClass && (
                  <p className="text-red-500 text-sm mt-1">
                    {errMsg?.selectClass}
                  </p>
                )}
              </div>
              <button
                className="flex justify-center items-center primary-btn outline-none py-2 px-2 rounded-md font-roboto bg-brand_text hover:bg-orange-600 text-white transition-all "
                type="submit"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CirclesWithBar color="#fff" height={20} width={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
            <div className="flex justify-center items-center mt-3">
              <p className=" text-center px-10 lg:px-28 font-roboto text-sm md:text-base">
                You are already the{" "}
                <span className="text-brand_text font-bold">
                  {totalEnquiry?.data}
                  <sup>th</sup>{" "}
                </span>
                person who will request a call
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request_Callback; */

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../../assets/contact-home.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Swal from "sweetalert2";

import { CirclesWithBar } from "react-loader-spinner";
import axiosGet from "../../redux/axios/axios.js";
import { getReqCallbackCount } from "../../redux/schoolSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";

const getOrdinalSuffix = (number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;

  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
};
const Request_Callback = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectClass: "",
    pinCode: "",
  });
  const totalEnquiry = useSelector((state) => state?.data?.totalEnquiry);
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState();
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const location = useLocation();
  useEffect(() => {
    dispatch(getReqCallbackCount());
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 100,
      duration: 300,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "pinCode") {
      // Allow only numeric characters
      const filteredValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else if (name === "name") {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: filteredValue,
      }));
    } else
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    setErrMsg({ ...errMsg, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setLoading(true);
    const { name, phone, selectClass, pinCode } = formData;
    let errors = {};
    const phonePattern = /^[0-9]{10}$/;
    const pinCodePattern = /^[0-9][0-9]{5}$/;
    if (!name.trim()) errors.name = "Please enter your full name";
    if (!phone) errors.phone = "Please enter your phone number";
    else if (!phonePattern.test(phone))
      errors.phone = "Please enter a valid 10-digit phone number";
    else if (phone.charAt(0) === "0")
      errors.phone = "Phone number should not start with 0";
    if (!pinCode) errors.pinCode = "Please enter pin code";
    else if (!pinCodePattern.test(pinCode))
      errors.pinCode = "Please enter a valid 6-digit pin code";
    else if (pinCode.charAt(0) === "0")
      errors.pinCode = "Pin code should not start with 0";
    if (!selectClass) errors.selectClass = "Please enter class";
    if (Object.keys(errors).length === 0) {
      setErrMsg({});
      const trimValue = (value) =>
        typeof value === "string" ? value.trim() : value;
      try {
        const response = await axios.post(`${baseUrl}/submitCallBackForm`, {
          fullName: trimValue(name),
          phone: trimValue(phone),
          pinCode: trimValue(pinCode),
          studentClass: trimValue(selectClass),
        });

        // console.log(response, 555);

        if (response?.data?.success === true && response.status === 200) {
          dispatch(getReqCallbackCount());
          setFormData({
            name: "",
            phone: "",
            selectClass: "",
            pinCode: "",
          });
          Swal.fire({
            text: response?.data?.message,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          });
        }
        if (response?.data?.success === false && response.status === 200) {
          Swal.fire({
            text: response?.data?.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
        Swal.fire({
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrMsg(errors);
      if (!form.checkValidity()) {
        form.reportValidity(); // This will trigger the scroll to the first invalid field
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

  return (
    <div className="bg-normal_bg " id="counsling">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center overflow-hidden py-4 md:py-6 lg:py-7 xl:py-14">
          <div data-aos="fade-right">
            <h3 className="font-roboto font-semibold text-center  text-xl  md:text-2xl lg:text-4xl lg:text-left">
              Get in touch with our Expert{" "}
            </h3>
            <h3 className="text-brand_text font-roboto text-center text-xl md:text-2xl lg:text-3xl font-bold lg:text-left lg:mt-2">
              {" "}
              COUNSELLORS
            </h3>
            <p className="font-roboto text-center md:text-center md:mt-3 text-sm lg:text-base tracking-wide text-gray-500 lg:text-left">
              Guaranteed call back within 24 hours from our expert counsellors.
            </p>
          </div>
          <div>
            <img
              src={img}
              alt=""
              className=" md:h-1/2 md:w-1/2 lg:h-3/4 lg:w-3/4 xl:h-5/6 xl:w-5/6 lg:px-4 flex justify-center items-center mx-auto "
            />
          </div>
          <div
            className="mt-6 md:mt-0 md:bg-white md:py-6 lg:py-8 md:rounded-lg md:shadow-sm md:w-3/5 lg:w-full  md:px-10 md:mx-auto lg:shadow-xl"
            data-aos="fade-left"
          >
            <h3 className="font-roboto tracking-wide text-center text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 lg:mb-5 font-semibold">
              Request a Callback
            </h3>
            <form
              ref={formRef}
              id="parents-counsling"
              action=" "
              className="mx-auto flex flex-col mt-2 gap-y-4"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full py-3 font-roboto font-normal tracking-wide pr-1 md:pr-2 pl-9 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                {errMsg?.name && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.name}</p>
                )}

                <span className="absolute left-0 top-4 px-3 text-gray-600">
                  <FaUser />
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full py-3 font-roboto font-normal tracking-wide pr-1 md:pr-2 pl-9 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errMsg?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.phone}</p>
                )}
                <span className="absolute left-0 top-4 px-3 text-gray-600">
                  <FaPhone />
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin-code"
                  className="w-full py-3 font-roboto font-normal tracking-wide pr-1 md:pr-2 pl-9 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                />
                {errMsg?.pinCode && (
                  <p className="text-red-500 text-sm mt-1">{errMsg?.pinCode}</p>
                )}
                <span className="absolute left-0 top-4 px-3 text-gray-600">
                  <MdLocationOn />
                </span>
              </div>
              <div className="relative">
                <select
                  name="selectClass"
                  className="select-list w-full py-3 font-roboto font-normal tracking-wide pr-1 md:pr-2 pl-9 outline-none bg-white rounded-md focus:bg-white md:bg-gray-100 focus:outline transition-all duration-300 md:focus:outline-brand_text shadow-sm focus:outline-[1px] m-0"
                  required
                  value={formData.selectClass}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    Select Class
                  </option>
                  {classData?.data?.map((classes) => (
                    <option value={classes._id} key={classes._id}>
                      {classes.name}
                    </option>
                  ))}
                </select>
                {errMsg?.selectClass && (
                  <p className="text-red-500 text-sm mt-1">
                    {errMsg?.selectClass}
                  </p>
                )}
                <span className="absolute left-0 top-4 px-3 text-gray-600">
                  <IoMdSchool />
                </span>
              </div>
              <button
                className="flex justify-center items-center primary-btn outline-none py-2 px-2 rounded-md font-roboto bg-brand_text hover:bg-orange-600 text-white transition-all "
                type="submit"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CirclesWithBar color="#fff" height={20} width={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
            {totalEnquiry?.data !== 0 && (
              <div className="flex justify-center items-center mt-3">
                <p className=" text-center px-10  font-roboto text-sm md:text-base">
                  You are already the{" "}
                  <span className="text-brand_text font-bold">
                    {totalEnquiry?.data}
                    <sup>{getOrdinalSuffix(totalEnquiry?.data)}</sup>{" "}
                  </span>
                  person who will request a call
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request_Callback;
