import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { GrClose } from "react-icons/gr";
import axios from "../../redux/axios/axios";
import { CirclesWithBar } from "react-loader-spinner";
import Swal from "sweetalert2";
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
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

export default function ResetPassword({ modalClose, open, emailModel, email }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordVisibilityConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);
  const handleClose = () => {
    setErrors({});
    modalClose();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long.";
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/resetPassword", {
        email: email.trim(),
        password: newPassword.trim(),
        confirmPassword: confirmPassword.trim(),
      });

      if (response.data.success) {
        Swal.fire({
          text: "Password reset successful!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#ffc451",
        });
        handleClose();
        emailModel(); // Close the parent modal
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
        text: "Failed to reset password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <div
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="py-0.5"
          >
            <div className="flex justify-between items-start gap-x-4">
              <p className="text-center font-semibold mb-5 text-xl md:text-2xl">
                Reset Password?
              </p>
              <button
                onClick={handleClose}
                className="mt-3 text-red-500 hover:text-red-700 transition-all duration-300"
              >
                <GrClose />
              </button>
            </div>
          </div>
          <div
            id="transition-modal-description"
            className="py-2"
            sx={{ mt: 2 }}
          >
            <form onSubmit={handleResetPassword}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline outline-brand_text"
                  required
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2  transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOff /> : <FaRegEye />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
              )}
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-4 p-2 border rounded-md focus:outline outline-brand_text"
                  required
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="absolute top-9 right-2  transform -translate-y-1/2"
                  onClick={togglePasswordVisibilityConfirm}
                >
                  {showPasswordConfirm ? <IoEyeOff /> : <FaRegEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

              <button
                type="submit"
                className="flex justify-center items-center mt-5 w-full p-2 bg-brand_text text-black rounded-md"
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
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
