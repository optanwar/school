import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { GrClose } from "react-icons/gr";
import Typography from "@mui/material/Typography";
import { MdOutlineRateReview } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import WriteReviewModel from "./WriteReviewModel";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
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

export default function TransitionsModal({ schoolId }) {
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const { loginUser } = useSelector((state) => state?.auth);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenReview = () => {
    if (loginUser?.data?.user?._id) {
      setOpenReview(true);
    } else {
      Swal.fire({
        text: "Please log in to submit a review.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF7A59",
      });
    }
  };
  const handleCloseReview = () => setOpenReview(false);
  // React.useEffect(() => {
  //   console.log("openReview", openReview, open);
  // }, [openReview, open]);
  return (
    <div>
      <button
        onClick={handleOpen}
        className=" tracking-wide primary-btn py-1 md:py-2 px-4 md:px-7 mt-3 md:mt-7  text-brand_text  font-medium text-base md:text-lg flex justify-center items-center gap-x-2 font-roboto hover:bg-brand_text hover:text-white rounded-sm transition-all duration-200"
      >
        <span>
          {" "}
          <MdOutlineRateReview />{" "}
        </span>
        Ask for a Review
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div id="transition-modal-title" variant="h6" component="h2">
              <div className="flex justify-between items-start gap-x-4">
                <p className="text-center font-semibold mb-5 text-xl md:text-2xl">
                  You can share this link to get more review
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 text-red-500 hover:text-red-700 transition-all duration-300"
                >
                  <GrClose />
                </button>
              </div>
            </div>
            <div id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-2">
                <button className="primary-btn px-3 py-2 rounded-md text-brand_text hover:bg-brand_text hover:text-white font-medium transition-all duration-300 flex items-center justify-center gap-x-2">
                  {" "}
                  <span>
                    <FaXTwitter />{" "}
                  </span>{" "}
                </button>
                <button className="primary-btn px-3 py-2 rounded-md text-brand_text hover:bg-brand_text hover:text-white font-medium transition-all duration-300 flex items-center justify-center gap-x-2">
                  {" "}
                  <span>
                    <FaFacebookF />
                  </span>{" "}
                </button>
                <button className="primary-btn px-3 py-2 rounded-md text-brand_text hover:bg-brand_text hover:text-white font-medium transition-all duration-300 flex items-center justify-center gap-x-2">
                  {" "}
                  <span>
                    <IoLogoWhatsapp />
                  </span>{" "}
                </button>
              </div>
            </div>
            <div id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  name="closeModel"
                  onClick={() => {
                    handleOpenReview();
                  }}
                >
                  <WriteReviewModel
                    schoolId={schoolId}
                    modalClose={handleClose}
                  />
                </button>
              </div>
            </div>
            <div id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="mt-6 flex justify-center">
                <p className="text-sm">
                  <Link
                    to="/contact-us"
                    className="cursor-pointer hover:text-brand_text transition-all duration-200"
                  >
                    <span className="underline underline-offset-1 transition-all duration-200 cursor-pointer hover:text-brand_text">
                      Contact us
                    </span>
                  </Link>{" "}
                  for any queries.
                </p>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
