/* 
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import google from "../../assets/google.png";
import fb from "../../assets/facebook.png";
import logo from "../../assets/school-logo1.png";
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userRegister, loginUser } from "../../redux/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ name }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null); // Changed to null for clarity
  const [profile, setProfile] = useState([]);
  const [signupDetail, setSignupDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    type: "user",
  });

  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSignupDetail({ name: "", email: "", password: "" }); // Clear signup form data on modal close
  };
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowLogin(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e, setDetail) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const validate = (details) => {
    const errors = {};
    if (showLogin) {
      if (!details.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(details.email)) {
        errors.email = "Email address is invalid";
      }
      if (!details.password) {
        errors.password = "Password is required";
      } else if (details.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    } else {
      if (!details.name) {
        errors.name = "Name is required";
      }
      if (!details.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(details.email)) {
        errors.email = "Email address is invalid";
      }
      if (!details.password) {
        errors.password = "Password is required";
      } else if (details.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
    return errors;
  };

  const handleRegister = () => {
    const errors = validate(signupDetail);
    if (Object.keys(errors).length === 0) {
      // Simulate an API call to check for existing user
      const existingUser = false; // Replace with actual check
      if (existingUser) {
        Swal.fire({
          text: "User already registered with this email.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      } else {
        dispatch(userRegister(signupDetail))
          .then((response) => {
            console.log("Register API Response:", response?.payload); // Log successful response
            setSignupDetail({ name: "", email: "", password: "" });
            setErrors({});
            if (response?.payload?.success === true) {
              Swal.fire({
                text: response?.payload?.message,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",

                customClass: {
                  popup: "custom-swal", // Add your custom class here
                },
              }).then(() => {
                handleShowLogin(); // Show the login form after successful registration
              });
            }
          })
          .catch((error) => {
            console.error("Register API Error:", error); // Log error response
            setErrors({ message: "Failed to register. Please try again." }); // Set error state
          });
      }
    } else {
      setErrors(errors);
    }
  };

  const handleUserLogin = () => {
    const errors = validate(loginDetail);
    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(loginDetail))
        .then((response) => {
          console.log("Login API Response:", response); // Log successful response
          setLoginDetail({ email: "", password: "", type: "user" });
          setErrors({});
          if (response?.payload?.success === true) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            }).then(() => {
              handleClose(); // Close the modal after successful login
            });
          } else if (response?.payload?.success === false) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "info",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          }
        })
        .catch((error) => {
          console.error("Login API Error:", error); // Log error response
          setErrors({ message: "Failed to login. Please try again." }); // Set error state
        });
    } else {
      setErrors(errors);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  // Login from google
  useEffect(() => {
    if (profile.email) {
      dispatch(
        loginUser({
          type: "social",
          socialData: {
            name: profile.name,
            email: profile.email,
            id: profile.id,
            picture: profile.picture,
          },
        })
      )
        .then((response) => {
          console.log("Login API Response:", response); // Log successful response
          setLoginDetail({ email: "", password: "", type: "social" });
          setErrors({});
          if (response?.payload?.success === true) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            }).then(() => {
              handleClose(); // Close the modal after successful login
            });
          } else if (response?.payload?.success === false) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "info",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          }
        })
        .catch((error) => {
          console.error("Login API Error:", error); // Log error response
          setErrors({ message: "Failed to login. Please try again." }); // Set error state
        });
    }
  }, [profile, dispatch]);

  return (
    <div>
      <button onClick={handleOpen} className="py-2 px-5">
        {name}
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
          <Box
            sx={style}
            className="w-full min-w-44 rounded-2xl md:w-1/2 lg:w-2/5 xl:w-2/6 container"
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="">
                <div className="mb-4 flex justify-center items-center">
                  <img src={logo} alt="School Dekho logo" className="h-16" />
                </div>
              </div>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {showLogin ? (
                <div className="px-8 md:px-14 py-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Hello <span className="text-brand_text">Welcome! </span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={loginDetail.email}
                        onChange={(e) => handleChange(e, setLoginDetail)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 relative">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={loginDetail.password}
                          onChange={(e) => handleChange(e, setLoginDetail)}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full p-2 bg-brand_text text-black rounded-md"
                      onClick={handleUserLogin}
                    >
                      Login
                    </button>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <p>or</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-7 cursor-pointer"
                        onClick={() => login()}
                      />
                      <img src={fb} alt="Facebook" className="h-7" />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Don't have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowRegister}
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="px-8 md:px-14 py-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Create an <span className="text-brand_text">Account</span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.name}
                        onChange={(e) => handleChange(e, setSignupDetail)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.email}
                        onChange={(e) => handleChange(e, setSignupDetail)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <div className=" relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={signupDetail.password}
                          onChange={(e) => handleChange(e, setSignupDetail)}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full p-2 text-black bg-brand_text rounded-md"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <p>or</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-6 cursor-pointer"
                        onClick={() => login()}
                      />
                      <img src={fb} alt="Facebook" className="h-6" />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowLogin}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
 */

/* import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import google from "../../assets/google.png";
import fb from "../../assets/facebook.png";
import logo from "../../assets/school-logo1.png";
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userRegister, loginUser } from "../../redux/authSlice";
import ForgetPasswordModel from "./ForgetPassword";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ name, openRegister }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  //  const [showLogin, setShowLogin] = useState(defaultShowLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [signupDetail, setSignupDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    type: "user",
  });
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSignupDetail({ name: "", email: "", password: "" });
    setErrors({});
  };

  const handleCloseLogin = () => setOpen(false);
  //   useEffect(() => {
  //   if (openRegister) {
  //     setShowLogin(false);
  //   }
  // }); 
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowLogin(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e, setDetail) => {
    const { name, value } = e.target;
    if (name === "name" && /\d/.test(value)) return; // Prevent numeric input in name field
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear individual field errors on change
    }));
  };

  const validate = (details) => {
    const errors = {};
    if (showLogin) {
      if (!details.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(details.email)) {
        errors.email = "Email address is invalid";
      }
      if (!details.password) {
        errors.password = "Password is required";
      } else if (details.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    } else {
      if (!details.name) {
        errors.name = "Name is required";
      }
      if (!details.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(details.email)) {
        errors.email = "Email address is invalid";
      }
      if (!details.password) {
        errors.password = "Password is required";
      } else if (details.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
    return errors;
  };

  const handleRegister = () => {
    const errors = validate(signupDetail);
    if (Object.keys(errors)?.length === 0) {
      const existingUser = false; // Replace with actual check
      if (existingUser) {
        Swal.fire({
          text: "User already registered with this email.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      } else {
        dispatch(userRegister(signupDetail))
          .then((response) => {
            console.log("Register API Response:", response?.payload);
            setSignupDetail({ name: "", email: "", password: "" });
            setErrors({});
            if (response?.payload?.success === true) {
              Swal.fire({
                text: response?.payload?.message,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
                customClass: {
                  popup: "custom-swal",
                },
              }).then(() => {
                handleShowLogin();
              });
            }
            if (response?.payload?.success === false) {
              Swal.fire({
                text: response?.payload?.message,
                icon: "info",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
                customClass: {
                  popup: "custom-swal",
                },
              }).then(() => {
                handleShowLogin();
              });
            }
          })
          .catch((error) => {
            console.error("Register API Error:", error);
            setErrors({ message: "Failed to register. Please try again." });
          });
      }
    } else {
      setErrors(errors);
    }
  };

  const handleUserLogin = () => {
    const errors = validate(loginDetail);
    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(loginDetail))
        .then((response) => {
          console.log("Login API Response:", response);
          setLoginDetail({ email: "", password: "", type: "user" });
          setErrors({});
          if (response?.payload?.success === true) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            }).then(() => {
              handleClose();
            });
          } else if (response?.payload?.success === false) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "info",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          }
        })
        .catch((error) => {
          console.error("Login API Error:", error);
          setErrors({ message: "Failed to login. Please try again." });
        });
    } else {
      setErrors(errors);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    if (profile.email) {
      dispatch(
        loginUser({
          type: "social",
          socialData: {
            name: profile.name,
            email: profile.email,
            id: profile.id,
            picture: profile.picture,
          },
        })
      )
        .then((response) => {
          console.log("Login API Response:", response);
          setLoginDetail({ email: "", password: "", type: "social" });
          setErrors({});
          if (response?.payload?.success === true) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            }).then(() => {
              handleClose();
            });
          } else if (response?.payload?.success === false) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "info",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          }
        })
        .catch((error) => {
          console.error("Login API Error:", error);
          setErrors({ message: "Failed to login. Please try again." });
        });
    }
  }, [profile, dispatch]);

  return (
    <div>
      <button onClick={handleOpen} className="py-2 px-5">
        {name}
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
          <Box
            sx={style}
            className="w-full min-w-44 rounded-2xl md:w-1/2 lg:w-2/5 xl:w-2/6 container"
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="">
                <div className="mb-4 flex justify-center items-center">
                  <img src={logo} alt="School Dekho logo" className="h-16" />
                </div>
              </div>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {showLogin ? (
                <div className="px-8 md:px-14 py-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Hello <span className="text-brand_text">Welcome! </span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={loginDetail.email}
                        onChange={(e) => handleChange(e, setLoginDetail)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 relative">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={loginDetail.password}
                          onChange={(e) => handleChange(e, setLoginDetail)}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                      <div className="underline transition-all cursor-pointer text-right text-sm hover:text-brand_text font-roboto">
                        <ForgetPasswordModel modalClose={handleCloseLogin} />
                      </div>
                    </div>
                    <button
                      className="w-full p-2 bg-brand_text text-black rounded-md"
                      onClick={handleUserLogin}
                    >
                      Login
                    </button>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <p>or</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-7 cursor-pointer"
                        onClick={() => login()}
                      />
                      <img src={fb} alt="Facebook" className="h-7" />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Don't have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowRegister}
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="px-8 md:px-14 py-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Create an <span className="text-brand_text">Account</span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.name}
                        onChange={(e) => handleChange(e, setSignupDetail)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.email}
                        onChange={(e) => handleChange(e, setSignupDetail)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <div className=" relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={signupDetail.password}
                          onChange={(e) => handleChange(e, setSignupDetail)}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full p-2 text-black bg-brand_text rounded-md"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <p>or</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-6 cursor-pointer"
                        onClick={() => login()}
                      />
                      <img src={fb} alt="Facebook" className="h-6" />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowLogin}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
} */

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import google from "../../assets/google.png";
import fb from "../../assets/facebook.png";
import logo from "../../assets/school-logo1.png";
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userRegister, loginUser } from "../../redux/authSlice";
import ForgetPasswordModel from "./ForgetPassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ name, openRegister }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [signupDetail, setSignupDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    type: "user",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSignupDetail({ name: "", email: "", password: "" });
    setSignupErrors({});
    setLoginDetail({ email: "", password: "", type: "user" });
    setLoginErrors({});
  };

  const handleCloseLogin = () => setOpen(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setLoginErrors({});
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setSignupErrors({});
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e, setDetail, setError) => {
    const { name, value } = e.target;
    if (name === "name" && /\d/.test(value)) return; // Prevent numeric input in name field
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear individual field errors on change
    }));
  };

  const validateLogin = (details) => {
    const errors = {};
    if (!details.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      errors.email = "Email address is invalid";
    }
    if (!details.password) {
      errors.password = "Password is required";
    } else if (details.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const validateRegister = (details) => {
    const errors = {};
    if (!details.name) {
      errors.name = "Name is required";
    }
    if (!details.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      errors.email = "Email address is invalid";
    }
    if (!details.password) {
      errors.password = "Password is required";
    } else if (details.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleRegister = () => {
    const errors = validateRegister(signupDetail);
    if (Object.keys(errors)?.length === 0) {
      const existingUser = false; // Replace with actual check
      if (existingUser) {
        Swal.fire({
          text: "User already registered with this email.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      } else {
        dispatch(userRegister(signupDetail))
          .then((response) => {
            setSignupDetail({ name: "", email: "", password: "" });
            setSignupErrors({});
            if (response?.payload?.success === true) {
              Swal.fire({
                text: response?.payload?.message,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
                customClass: {
                  popup: "custom-swal",
                },
              }).then(() => {
                handleShowLogin();
              });
            }
            if (response?.payload?.success === false) {
              Swal.fire({
                text: response?.payload?.message,
                icon: "info",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
                customClass: {
                  popup: "custom-swal",
                },
              }).then(() => {
                handleShowLogin();
              });
            }
          })
          .catch((error) => {
            console.error("Register API Error:", error);
            setSignupErrors({
              message: "Failed to register. Please try again.",
            });
          });
      }
    } else {
      setSignupErrors(errors);
    }
  };

  const handleUserLogin = () => {
    const errors = validateLogin(loginDetail);
    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(loginDetail))
        .then((response) => {
          setLoginDetail({ email: "", password: "", type: "user" });
          setLoginErrors({});
          if (response?.payload?.success === true) {
            Swal.fire({
              text: response?.payload?.message,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            }).then(() => {
              handleClose();
            });
          } else if (response?.payload?.success === false) {
            Swal.fire({
              text: "User not found",
              icon: "info",
              confirmButtonText: "OK",
              confirmButtonColor: "#FF7A59",
            });
          }
        })
        .catch((error) => {
          console.error("Login API Error:", error);
          setLoginErrors({ message: "Failed to login. Please try again." });
        });
    } else {
      setLoginErrors(errors);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // useEffect(() => {
  //   if (user) {
  //     try {
  //       axios
  //         .get(
  //           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${user?.access_token}`,
  //               Accept: "application/json",
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           setProfile(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [user]);

  // google login new code
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
              },
            }
          );
          setProfile(res.data);

          if (res.data.email) {
            const response = await dispatch(
              loginUser({
                type: "social",
                socialData: {
                  name: res.data.name,
                  email: res.data.email,
                  id: res.data.id,
                  picture: res.data.picture,
                },
              })
            );

            setLoginDetail({ email: "", password: "", type: "social" });
            setLoginErrors({});

            if (response?.payload?.success === true) {
              Swal.fire({
                text: "Login successful",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
              }).then(() => {
                handleClose();
              });
            } else if (response?.payload?.success === false) {
              Swal.fire({
                text: "Something went wrong.",
                icon: "info",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
              });
            }
          }
        } catch (error) {
          console.error(error);
          setLoginErrors({ message: "Failed to login. Please try again." });
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  // useEffect(() => {
  //   if (profile.email) {
  //     dispatch(
  //       loginUser({
  //         type: "social",
  //         socialData: {
  //           name: profile.name,
  //           email: profile.email,
  //           id: profile.id,
  //           picture: profile.picture,
  //         },
  //       })
  //     )
  //       .then((response) => {
  //         setLoginDetail({ email: "", password: "", type: "social" });
  //         setLoginErrors({});
  //         if (response?.payload?.success === true) {
  //           Swal.fire({
  //             text: "Login successful",
  //             icon: "success",
  //             confirmButtonText: "OK",
  //             confirmButtonColor: "#FF7A59",
  //           }).then(() => {
  //             handleClose();
  //           });
  //         } else if (response?.payload?.success === false) {
  //           Swal.fire({
  //             text: "Something went wrong.",
  //             icon: "info",
  //             confirmButtonText: "OK",
  //             confirmButtonColor: "#FF7A59",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Login API Error:", error);
  //         setLoginErrors({ message: "Failed to login. Please try again." });
  //       });
  //   }
  // }, [profile, dispatch]);

  return (
    <div>
      <button onClick={handleOpen} className="py-2 px-5">
        {name}
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
          <Box
            sx={style}
            className="w-full min-w-44 rounded-2xl md:w-1/2 lg:w-2/5 xl:w-2/6 container"
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="">
                <div className="mb-4 flex justify-center items-center">
                  <img src={logo} alt="School Dekho logo" className="h-16" />
                </div>
              </div>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {showLogin ? (
                <div className="px-4 md:px-14   pt-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Hello <span className="text-brand_text">Welcome! </span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={loginDetail.email}
                        onChange={(e) =>
                          handleChange(e, setLoginDetail, setLoginErrors)
                        }
                        autoComplete="ram"
                      />
                      {loginErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {loginErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 relative">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={loginDetail.password}
                          onChange={(e) =>
                            handleChange(e, setLoginDetail, setLoginErrors)
                          }
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {loginErrors.password}
                        </p>
                      )}
                      <div className="underline transition-all cursor-pointer text-right text-sm hover:text-brand_text font-roboto md:mt-3">
                        <ForgetPasswordModel modalClose={handleCloseLogin} />
                      </div>
                    </div>
                    <button
                      className="w-full p-2 bg-brand_text text-black rounded-md"
                      onClick={handleUserLogin}
                    >
                      Login
                    </button>
                    {loginErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {loginErrors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <div className="flex items-center justify-center">
                      <hr className="w-full border-gray-800" />
                      <span className="mx-2 text-gray-500">or</span>
                      <hr className="w-full border-gray-800" />
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-7 cursor-pointer"
                        onClick={() => login()}
                      />
                      {/* <img src={fb} alt="Facebook" className="h-7" /> */}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Don't have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowRegister}
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="px-4 md:px-14 pt-4 overflow-y-auto">
                  <h1 className="text-center text-2xl font-semibold mb-4">
                    Create an <span className="text-brand_text">Account</span>
                  </h1>
                  <div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.name}
                        onChange={(e) =>
                          handleChange(e, setSignupDetail, setSignupErrors)
                        }
                      />
                      {signupErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                        value={signupDetail.email}
                        onChange={(e) =>
                          handleChange(e, setSignupDetail, setSignupErrors)
                        }
                        autoComplete="username"
                      />
                      {signupErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <div className=" relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          autoComplete="current-password"
                          className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                          value={signupDetail.password}
                          onChange={(e) =>
                            handleChange(e, setSignupDetail, setSignupErrors)
                          }
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <IoEyeOff /> : <FaRegEye />}
                        </button>
                      </div>
                      {signupErrors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupErrors.password}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full p-2 text-black bg-brand_text rounded-md"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    {signupErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <div className="flex items-center justify-center">
                      <hr className="w-full border-gray-800" />
                      <span className="mx-2 text-gray-500">or</span>
                      <hr className="w-full border-gray-800" />
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                      <img
                        src={google}
                        alt="Google"
                        className="h-6 cursor-pointer"
                        onClick={() => login()}
                      />
                      {/* <img src={fb} alt="Facebook" className="h-6" /> */}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <button
                        className="text-brand_text"
                        onClick={handleShowLogin}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
