import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import img1 from "../../assets/home-slide-1.webp";
import img2 from "../../assets/home_slide2.png";
import img3 from "../../assets/home_slide3.jpg";
import img4 from "../../assets/home_slide4.jpg";

import img5 from "../../assets/home-slide-5.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
// import img6 from '../../assets/home-slide-6.webp';

const BackgroundSlider = () => {
  const images = [img1, img3, img5];

  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 200,
      duration: 600,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current); // Cleanup on component unmount
    };
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 20;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="background-slider">
      <div
        className="background-image  bg-no-repeat bg-cover bg-center transition-all duration-500 py-12 md:py-14 lg:py-16 xl:py-20"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="overflow-hidden container">
          <div data-aos="zoom-in-right">
            <h3 className="text-brand_text font-bold text-sm md:text-base xl:text-lg font-roboto tracking-wide">
              PATH TO SUCCESS
            </h3>
            <h2 className="font-semibold  font-roboto text-gray-700 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl md:w-7/12 my-2 lg:my-3 tracking-wide">
              Finding the best school for your kid is now just a click away!
            </h2>
            <div className="mt-4 md:mt-8">
              <p className="  font-roboto font-semibold flex justify-start items-center gap-x-2 text-sm md:text-base xl:text-lg tracking-wide mt-2 md:mt-4 mb-2">
                {" "}
                <span>
                  <FaHome />
                </span>{" "}
                Local Schools
              </p>
              <p className="tracking-wider leading-5 text-lg md:text-xl xl:text-2xl font-roboto font-medium text-brand_text">
                Find School Near Me
              </p>
              <Link
                to="/schools-near-me"
                state={{
                  focus: true,
                }}
              >
                <button className="shadow-md py-2 mt-6 px-10 border border-brand_text uppercase rounded-sm font-semibold bg-brand_text hover:bg-orange-600 text-white transition-all primary-btn font-roboto">
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSlider;
