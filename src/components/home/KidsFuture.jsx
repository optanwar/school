import React, { useEffect } from "react";
import kids from "../../assets/kids-future.jpg";
import "aos/dist/aos.css";
import AOS from "aos";
import Resister from "../login/Login";
const KidsFuture = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="py-5 overflow-hidden">
      <div
        className=" mx-auto bg-normal_bg rounded-md md:flex justify-between items-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="md:w-2/6 px-4 py-6  md:px-4 lg:px-7">
          <h3 className="text-2xl font-semibold mb-2">
            Worried about kids Future?
          </h3>
          <p className="text-gray-600">
            Create an account for our free counselling.
          </p>
          <div className="border text-center border-brand_text mt-6 hover:bg-brand_text  rounded transition-all font-semibold tracking-wider hover:text-white w-fit primary-btn text-brand_text">
            <Resister name="Register for Free" openRegister={true} />
          </div>
        </div>
        <div className="hidden md:block md:w-2/3  lg:w-auto">
          <img
            src={kids}
            alt="Kids Future image"
            className="md:h-64  rounded-e"
          />
        </div>
      </div>
    </div>
  );
};

export default KidsFuture;
