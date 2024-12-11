import React, { useRef, useEffect, useState } from "react";
import img1 from "../../assets/couter-home1.png";
import img2 from "../../assets/couter-home2.png";
import img3 from "../../assets/couter-home3.png";
import { CountUp } from "use-count-up";
import "aos/dist/aos.css";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import { totalDocuments } from "../../redux/schoolSlice";
const CounterBox = () => {
  const dispatch = useDispatch();
  const counterRef = useRef(null);
  const [isCountingStarted, setIsCountingStarted] = useState(false);

  const whyChooseData = useSelector((state) => state?.data?.whyChooseUs?.data);
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

    return () => {
      if (observer) {
        observer.disconnect(); // clean up on unmount
      }
    };
  }, []);

  useEffect(() => {
    dispatch(totalDocuments());
    AOS.init({
      disable: "mobile",
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  return (
    <div>
      <div className="py-3 md:py-5 lg:py-10 flex flex-col md:flex-row justify-between gap-4 mt-6 overflow-hidden">
        <div
          ref={counterRef}
          className="bg-normal_bg text-center flex justify-center items-center flex-col hover:bg-white rounded transition-all duration-200 border py-9 w-full shadow-md "
          data-aos="fade-right"
        >
          <img src={img1} alt="student counter " />
          <p className="my-6 font-bold text-2xl md:text-3xl lg:text-4xl text-brand_text">
            {isCountingStarted && (
              <CountUp
                isCounting
                end={whyChooseData?.totalSchool}
                duration={3.2}
              />
            )}{" "}
            <span>+</span>
          </p>
          <h3 className="text-gray-500 font-semibold text-xl">
            Listed Schools
          </h3>
        </div>
        <div
          ref={counterRef}
          className=" bg-normal_bg text-center flex justify-center items-center flex-col hover:bg-white rounded transition-all duration-200 border py-9  w-full  shadow-md"
          data-aos="fade-up"
        >
          <img src={img2} alt="student counter " />
          <p className="my-6 font-bold text-2xl md:text-3xl lg:text-4xl text-brand_text">
            {isCountingStarted && (
              <CountUp
                isCounting
                end={whyChooseData?.totalParentEnquiries}
                duration={3.2}
              />
            )}{" "}
            <span>+</span>
          </p>
          <h3 className="text-gray-500 font-semibold text-xl">
            Parent Enquiries
          </h3>
        </div>
        <div
          ref={counterRef}
          className=" bg-normal_bg text-center flex justify-center items-center flex-col hover:bg-white rounded transition-all duration-200 border py-9  w-full shadow-md"
          data-aos="fade-left"
        >
          <img src={img3} alt="student counter " />
          <p className="my-6 font-bold text-2xl md:text-3xl lg:text-4xl text-brand_text">
            {isCountingStarted && (
              <CountUp
                isCounting
                end={whyChooseData?.totalParentCounselled}
                duration={3.2}
              />
            )}{" "}
            <span>+</span>
          </p>
          <h3 className="text-gray-500 font-semibold text-xl">
            Parents Counselled
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CounterBox;
