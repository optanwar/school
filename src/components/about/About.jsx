import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/aboutbg.png";
import img1 from "../../assets/couter-home1.png";
import img2 from "../../assets/couter-home2.png";
import img3 from "../../assets/couter-home3.png";
import { CountUp } from "use-count-up";
import "aos/dist/aos.css";
import AOS from "aos";
import CounterBox from "../home/CounterBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs } from "../../redux/schoolSlice";
import {
  clearBlogFilter,
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
const About = () => {
  const dispatch = useDispatch();
  const { aboutUs } = useSelector((state) => state?.data);
  const { baseUrl } = useSelector((state) => state?.data);
  useEffect(() => {
    AOS.init();
    dispatch(fetchAboutUs());
    dispatch(clearFilters());
    dispatch(resetBlogPagination());
    dispatch(resetPaginationStep());
  }, []);
  // console.log("aboutUs", baseUrl + aboutUs?.data?.image);

  const counterRef = useRef(null);
  const [isCountingStarted, setIsCountingStarted] = useState(false);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px", // no margin
      threshold: 0.5, // trigger when 50% of the component is in view
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsCountingStarted(true);
        observer.disconnect(); // stop observing once triggered
      }
    }, options);

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    dispatch(clearBlogFilter());

    return () => {
      if (observer) {
        observer.disconnect(); // clean up on unmount
      }
    };
  }, []);
  // console.log("aboutUs?.data?.image", aboutUs);
  return (
    <div className="">
      <div
        className="py-32 md:py-44 lg:py-48 xl:py-52 2xl:py-60 bg-center bg-cover bg-fixed bg-hero-about"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) ,url( ${baseUrl}${aboutUs?.data?.image})`,
        }}
      >
        <h3 className="flex justify-center text-3xl text-white font-bold tracking-wider leading-10 md:text-5xl lg:text-7xl">
          About Us
        </h3>
      </div>
      <div className="container">
        <div className=" pt-5 pb-3 md:pt-10 md:pb-7">
          <p className="text-center text-brand_text font-normal tracking-wider pb-3 text-xl lg:text-2xl 2xl:text-3xl">
            WHO ARE WE AND WHY US?
          </p>
          <h3 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl pb-3 tracking-wide lg:pb-8">
            {aboutUs?.data?.title}
            {/* India's first search engine for school admissions */}
          </h3>
        </div>
        <div
          className="prose md:prose-lg lg:prose-lg font-roboto  w-full max-w-full"
          dangerouslySetInnerHTML={{
            __html: aboutUs?.data?.description,
          }}
        ></div>

        <div className="mt-6 md:mt-7 lg:mt-10">
          <p className="text-center text-brand_text font-xl md:text-2xl">
            #DekhoPhirChuno
          </p>

          <div>
            <CounterBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
