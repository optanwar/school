/* import React, { useState, useRef } from "react";
import jobImg from "../../assets/job-img.png";
import axios from "../../redux/axios/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { CirclesWithBar } from "react-loader-spinner";

const ApplyForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    resume: null,
    jobId: jobId,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null); // Reference to the file input
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "phoneNumber") {
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
    } else if (name === "resume") {
      const file = files[0];
      if (file) {
        const fileType = file.type;
        if (fileType !== "application/pdf" && !fileType.includes("word")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Only PDF and DOC/DOCX files are allowed.",
          }));
          return;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
        setFormData((prevState) => ({
          ...prevState,
          resume: file,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const { name, email, phoneNumber, address, resume } = formData;
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!name.trim()) errors.name = "Please enter your full name";
    if (!email) errors.email = "Please enter your email";
    else if (!emailPattern.test(email))
      errors.email = "Please enter a valid email address";
    if (!phoneNumber) errors.phoneNumber = "Please enter your phone number";
    else if (!phonePattern.test(phoneNumber))
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    if (!address.trim()) errors.address = "Please enter your address";
    if (!resume) errors.resume = "Please upload your resume";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setLoading(true);

    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });

        console.log("Sending data:", formDataToSend);

        const response = await axios.post(`/applyJob`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response received:", response);

        if (response?.data?.success === true && response.status === 200) {
          // Clear the form data
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            resume: null,
          });
          fileInputRef.current.value = ""; // Clear the file input field
          Swal.fire({
            text: response?.data?.message,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          });
        } else {
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
      setErrors(formErrors);
      if (!form.checkValidity()) {
        form.reportValidity();
      }
    }
  };

  return (
    <div id="">
      <div className="my-3 md:mt-8 flex flex-col md:flex-row gap-6 md:gap-14 bg-normal_bg pt-5 px-1 md:px-3">
        <form
          ref={formRef}
          className="p-3 md:p-6 rounded md:w-3/5"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors?.name}</p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-x-3 justify-between">
            <div className="mb-3 w-full">
              <label className="block text-gray-700 font-roboto mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block text-gray-700 font-roboto mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
                placeholder="Phone Number"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors?.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">
              Address
            </label>
            <textarea
              name="address"
              className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {errors?.address && (
              <p className="text-red-500 text-sm mt-1">{errors?.address}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              className="w-full px-3 py-2 border rounded outline-none font-roboto bg-white"
              onChange={handleChange}
              ref={fileInputRef} // Attach ref to the file input
            />
            {errors?.resume && (
              <p className="text-red-500 text-sm mt-1">{errors?.resume}</p>
            )}
          </div>
          <button
            type="submit"
            className="md:mt-3 bg-brand_text hover:bg-orange-600 text-white px-6 md:px-8 py-1.5 rounded hover:bg-brand_text-darker transition-all flex justify-center items-center"
          >
            {loading ? (
              <CirclesWithBar color="#fff" height={20} width={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <div className="p-3 md:pt-6 md:w-2/5 px-1 md:px-2 md:mt-8">
          <h1 className="font-roboto tracking-wide text-lg md:text-xl lg:text-2xl font-medium">
            Couldn't find a job that suits your preferences?
          </h1>
          <p className="mt-3 font-roboto tracking-wide text-sm md:text-base font-normal">
            Fill out the application form, and we will get in touch with you.
          </p>
          <img src={jobImg} alt="Jobs in school dekho" className="md:h-80" />
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
 */
import React, { useState, useRef } from "react";
import jobImg from "../../assets/job-img.png";
import axios from "../../redux/axios/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { CirclesWithBar } from "react-loader-spinner";

const ApplyForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    resume: null,
    jobId: jobId,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null); // Reference to the file input
  const baseUrl = useSelector((state) => state.data.baseUrl);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phoneNumber") {
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
    } else if (name === "resume") {
      const file = files[0];
      if (file) {
        const fileType = file.type;
        if (fileType !== "application/pdf" && !fileType.includes("word")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Only PDF and DOC/DOCX files are allowed.",
          }));
          return;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
        setFormData((prevState) => ({
          ...prevState,
          resume: file,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const { name, email, phoneNumber, address, resume } = formData;
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!emailPattern.test(email))
      errors.email = "Email address is invalid.";
    if (!phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
    else if (!phonePattern.test(phoneNumber))
      errors.phoneNumber = "Phone number must be 10 digits.";
    if (!address.trim()) errors.address = "Address is required.";
    if (!resume) errors.resume = "Resume is required.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });

        console.log("Sending data:", formDataToSend);

        const response = await axios.post(`/applyJob`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response received:", response);

        if (response?.data?.success === true && response.status === 200) {
          // Clear the form data
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            resume: null,
          });
          fileInputRef.current.value = ""; // Clear the file input field
          Swal.fire({
            text: response?.data?.message,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          });
        } else {
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
      setErrors(formErrors);
    }
  };

  return (
    <div id="">
      <div className="my-3 md:mt-8 flex flex-col md:flex-row gap-6 md:gap-14 bg-normal_bg pt-5 px-1 md:px-3">
        <form
          ref={formRef}
          className="p-3 md:p-6 rounded md:w-3/5"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() =>
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }))
              }
            />
            {errors?.name && (
              <p className="text-red-500 text-sm m-0.5">{errors?.name}</p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-x-3 justify-between">
            <div className="mb-3 w-full">
              <label className="block text-gray-700 font-roboto mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() =>
                  setErrors((prevErrors) => ({ ...prevErrors, email: "" }))
                }
              />
              {errors?.email && (
                <p className="text-red-500 text-sm m-0.5">{errors?.email}</p>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block text-gray-700 font-roboto mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                onFocus={() =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    phoneNumber: "",
                  }))
                }
              />
              {errors?.phoneNumber && (
                <p className="text-red-500 text-sm m-0.5">
                  {errors?.phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">
              Address
            </label>
            <textarea
              name="address"
              className="focus:outline-brand_text border outline-1 w-full px-3 py-2 rounded outline-none font-roboto outline-offset-0"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              onFocus={() =>
                setErrors((prevErrors) => ({ ...prevErrors, address: "" }))
              }
            ></textarea>
            {errors?.address && (
              <p className="text-red-500 text-sm m-0.5">{errors?.address}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-roboto mb-2">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              className="w-full px-3 py-2 border rounded outline-none font-roboto bg-white"
              onChange={handleChange}
              ref={fileInputRef} // Attach ref to the file input
            />
            {errors?.resume && (
              <p className="text-red-500 text-sm m-0.5">{errors?.resume}</p>
            )}
          </div>
          <button
            type="submit"
            className="md:mt-3 bg-brand_text hover:bg-orange-600 text-white px-6 md:px-8 py-1.5 rounded hover:bg-brand_text-darker transition-all flex justify-center items-center"
          >
            {loading ? (
              <CirclesWithBar color="#fff" height={20} width={20} />
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <div className="p-3 md:pt-6 md:w-2/5 px-1 md:px-2 md:mt-8">
          <h1 className="font-roboto tracking-wide text-lg md:text-xl lg:text-2xl font-medium">
            Couldn't find a job that suits your preferences?
          </h1>
          <p className="mt-3 font-roboto tracking-wide text-sm md:text-base font-normal">
            Fill out the application form, and we will get in touch with you.
          </p>
          <img src={jobImg} alt="Jobs in school dekho" className="md:h-80" />
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
