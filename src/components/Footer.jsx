import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import logo from "../assets/school-logo1.png";
import { Link, NavLink } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import facebook from "../assets/fb.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
import linkedin from "../assets/linkedin.png";
import { useSelector } from "react-redux";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const { fetchContactUsResp } = useSelector((state) => state?.data);
  return (
    <div className="pt-2 bg-normal_bg md:pt-5 lg:pt-7 xl:pt-6 ">
      <div className="container">
        <div className="flex flex-col justify-between gap-5 py-10 md:flex-row">
          <div>
            <NavLink className="logo" to="/" onClick={scrollToTop}>
              {/* <img src={logo} alt="School Dekho Logo" className='w-[180px]'/> */}
              <img src={logo} alt="school dekho footer logo" className="h-20" />
            </NavLink>
            <div className="pt-4">
              <h3 className="text-lg font-semibold font-roboto">Call us</h3>
              <p className="font-mono text-2xl text-green-800 ">
                {/* 1800 2588 074 */}
                {fetchContactUsResp?.data?.mobile || "1800 2588 074"}
              </p>
              <p className="py-1 tracking-wide text-gray-500 font-roboto">
                {/* Sati Plaza, Barrackpore, Kolkata - 120  */}
                {fetchContactUsResp?.data?.address ||
                  "Sati Plaza, Barrackpore, Kolkata - 120 "}
                <br />
                {/* info@schooldekho.org */}
                {fetchContactUsResp?.data?.email || "info@schooldekho.org"}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mt-3">
              <span>
                <img
                  src={facebook}
                  alt="School Dekho facebook"
                  className="h-5 md:h-7 cursor-pointer "
                />
              </span>
              <span>
                <img
                  src={twitter}
                  alt="School Dekho twitter"
                  className="h-5 md:h-7 cursor-pointer "
                />
              </span>
              <span>
                <img
                  src={instagram}
                  alt="School Dekho instagram"
                  className="h-5 md:h-7 cursor-pointer "
                />
              </span>
              <span>
                <img
                  src={linkedin}
                  alt="School Dekho linkedin"
                  className="h-5 md:h-7 cursor-pointer "
                />
              </span>
              <span>
                <img
                  src={youtube}
                  alt="School Dekho youtube"
                  className="h-5 md:h-7 cursor-pointer "
                />
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold tracking-wide font-roboto ">
              About
            </h3>
            <ul>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/about-us"
                  onClick={scrollToTop}
                  className="my_menu_items"
                >
                  {" "}
                  About Us
                </Link>
              </li>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/contact-us"
                  onClick={scrollToTop}
                  className="my_menu_items"
                >
                  Contact Us
                </Link>{" "}
              </li>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/news-and-blogs"
                  onClick={scrollToTop}
                  className="my_menu_items"
                >
                  News & Blogs
                </Link>{" "}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold tracking-wide font-roboto">
              Links
            </h3>
            <ul>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>{" "}
                <Link
                  to="/refund-policy"
                  className="my_menu_items"
                  onClick={scrollToTop}
                >
                  Refund Policy
                </Link>{" "}
              </li>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/careers"
                  className="my_menu_items"
                  onClick={scrollToTop}
                >
                  Careers
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold tracking-wide font-roboto">
              Information
            </h3>
            <ul>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/terms-and-conditions"
                  className="my_menu_items"
                  onClick={scrollToTop}
                >
                  Terms & Conditions
                </Link>{" "}
              </li>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/privacy-policy"
                  className="my_menu_items"
                  onClick={scrollToTop}
                >
                  Privacy Policy
                </Link>{" "}
              </li>
              <li className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-">
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>{" "}
                <Link to="/" className="my_menu_items" onClick={scrollToTop}>
                  {" "}
                  Sitemap
                </Link>
              </li>
              <li
                className="flex items-center tracking-wide text-gray-500 transition-all hover:text-brand_text font-roboto hover:text-"
                onClick={scrollToTop}
              >
                <span className="mr-2 text-sm">
                  <FaAnglesRight />
                </span>
                <Link
                  to="/frequently-asked-questions"
                  className="my_menu_items"
                >
                  FAQ
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="justify-between py-4 mt-5 text-center border-t md:flex font-roboto ">
          <p className="text-sm tracking-wide text-gray-500 font-roboto">
            © {new Date().getFullYear()} School Dekho. All rights reserved.
          </p>
          <p className="text-sm tracking-wide text-gray-500  font-roboto">
            Designed & Developed by Shrinkcom.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
