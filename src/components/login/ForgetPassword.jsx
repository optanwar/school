import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "../../redux/axios/axios";
import { GrClose } from "react-icons/gr";
import Swal from "sweetalert2";
import { CirclesWithBar } from "react-loader-spinner";
import ResetPassword from "./ResetPassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ForgetPassword() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otpIsSend, setOtpIsSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormErrors({});
    setEmail("");
    setOtp("");
    setOtpIsSend(false);
    setResetPasswordOpen(false);
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSendOtp = async (event) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setErrMsg({ ...errMsg, email: "Please enter valid email id" });
      return;
    }
    setLoading(true);
    if (email)
      try {
        const response = await axios.post("/forgetPassword", {
          email: email,
        });
        if (response.data.success === true) {
          setOtpIsSend(true);
          setPass(response?.data?.data);
          Swal.fire({
            text: "OTP has been sent to your email",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ffc451",
          });
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          text: "Failed to send OTP. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setErrMsg({ ...errMsg, otp: "Please Enter 6 digit otp." });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/verifyOtp", {
        email: email,
        otp: otp,
      });

      if (response.data.success) {
        Swal.fire({
          text: "OTP verification successful",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#ffc451",
        }).then((result) => {
          if (result.isConfirmed) {
            // Close OTP modal and open ResetPassword modal
            setOtpIsSend(false);
            setResetPasswordOpen(true);
          }
        });
      } else {
        Swal.fire({
          // text: response.data.message,
          text: "Invalid OTP.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        text: "Failed to verify OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  const digitRegex = /^\d+$/;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setFormErrors({ ...formErrors, email: "" });
      setErrMsg({ ...errMsg, email: "" });
    } else if (name === "otp") {
      if ((digitRegex.test(value) || value === "") && value.length <= 6) {
        setErrMsg({ ...errMsg, otp: "" });
        setOtp(value);
      }
      setFormErrors({ ...formErrors, otp: "" });
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="">
        Forget Password
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
            <div id="transition-modal-title" className="py-0.5">
              <div className="flex justify-between items-start gap-x-4">
                <p className="text-center font-semibold mb-5 text-xl md:text-2xl">
                  Forget Password?
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 text-red-500 hover:text-red-700 transition-all duration-300"
                >
                  <GrClose />
                </button>
              </div>
            </div>
            <div id="transition-modal-description" className="py-2">
              {!resetPasswordOpen ? (
                <form onSubmit={!otpIsSend ? handleSendOtp : handleVerifyOtp}>
                  {!otpIsSend ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:outline ${
                          formErrors.email
                            ? "border-red-500"
                            : "outline-brand_text"
                        }`}
                        required
                        placeholder="Enter Registered Email"
                      />
                      {errMsg?.email && (
                        <div className="text-red-500">{errMsg.email}</div>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:outline ${
                          formErrors.otp
                            ? "border-red-500"
                            : "outline-brand_text"
                        }`}
                        required
                        placeholder="Enter OTP"
                      />
                      {errMsg?.otp && (
                        <div className="text-red-500">{errMsg.otp}</div>
                      )}
                    </>
                  )}
                  {formErrors.email && (
                    <div className="text-red-500">{formErrors.email}</div>
                  )}
                  {formErrors.otp && (
                    <div className="text-red-500">{formErrors.otp}</div>
                  )}
                  <button
                    type="submit"
                    className="mt-5 flex justify-center items-center w-full p-2 bg-brand_text text-black rounded-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <CirclesWithBar
                        height="24"
                        width="24"
                        color="#fff"
                        ariaLabel="circles-with-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    ) : !otpIsSend ? (
                      "Send OTP"
                    ) : (
                      ` Verify OTP`
                    )}
                  </button>
                </form>
              ) : (
                <ResetPassword
                  modalClose={() => setResetPasswordOpen(false)}
                  open={resetPasswordOpen}
                  emailModel={handleClose}
                  email={email}
                />
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
