import React, { useEffect } from "react";
import Main from "./Main";
import Recommended_Sc from "./Recommended_Sc";
import Request_Callback from "./Request_Callback";
import Articles from "./Articles";
import Testimonials from "./Testimonials";
import Featured from "./Featured";
import Why_Choose from "./Why_choose";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactUs,
  setUserCord,
  userIPAddress,
} from "../../redux/schoolSlice";
import {
  clearBlogFilter,
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";

const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // Scroll to the contact section if the URL includes the hash "#box"
    if (window.location.hash === "#counsling") {
      const boxElement = document.getElementById("counsling");
      if (boxElement) {
        boxElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchContactUs());
    dispatch(userIPAddress());
    dispatch(clearBlogFilter());
    dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
    dispatch(clearFilters());
  }, []);

  const useIp = useSelector((state) => state?.data?.userIP);

  useEffect(() => {
    const checkLocationServices = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords, 1230);
            // dispatch(setUserCord(position.coords));
            dispatch(
              setUserCord({
                latitude: position.coords?.latitude,
                longitude: position.coords?.longitude,
              })
            );
          },
          (error) => {
            if (
              error.code === error.PERMISSION_DENIED ||
              error.code === error.POSITION_UNAVAILABLE
            ) {
              Swal.fire({
                text: ` Please allow location, To see your nearest schools`,
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF7A59",
              });
              dispatch(setUserCord({}));
            }
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        Swal.fire({
          text: `Geolocation is not supported by this browser.`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF7A59",
        });
      }
    };

    // checkLocationServices();
  }, []);

  return (
    <div className="">
      <Main />
      <Recommended_Sc />
      <Request_Callback />
      <Articles />
      <Testimonials />
      <Featured />
      <Why_Choose />
    </div>
  );
};
export default Home;
