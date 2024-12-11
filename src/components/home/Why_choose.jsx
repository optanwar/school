import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import CounterBox from "./CounterBox";

import { useDispatch, useSelector } from "react-redux";
import { totalDocuments } from "../../redux/schoolSlice";
const WhyChoose = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalDocuments());
    AOS.init({
      disable: "mobile",
      offset: 100,
      duration: 400,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  return (
    <div className="bg-white pb-4 md:pb-6 lg:pb-7 xl:pb-14">
      <div className="container overflow-hidden">
        <div className="text-center px-2" data-aos="fade-up">
          <h3 className="text-2xl my-2 font-semibold md:text-3xl lg:text-5xl font-roboto">
            Why choose{" "}
            <span className="font-bold text-brand_text">School Dekho?</span>
          </h3>
          <p className="text-lg text-gray-500 tracking-wider lg:text-xl lg:my-4 font-roboto">
            India’s first search engine for school admissions.
          </p>
        </div>

        <div data-aos="fade-up">
          <CounterBox />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
