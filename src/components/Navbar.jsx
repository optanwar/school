import React, { useEffect, useState } from "react";
import logo from "../assets/school-logo1.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./login/Login";
import { useSelector, useDispatch } from "react-redux";
import profileImg from "../../src/assets/profile.png";
import { clearLoginUser } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [toggled, setToggled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const compareList = useSelector((state) => state?.data?.compareList);
  const userDetails = useSelector(
    (state) => state?.auth?.loginUser?.data?.token
  );
  const userProfile = useSelector(
    (state) => state?.auth?.loginUser?.data?.user
  );
  useEffect(() => {
    setDropdownOpen(false);
    setIsOpen(false);
  }, [userDetails]);

  const handleMouseEnter = (e) => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  // console.log(userProfile, 2222222);
  const handleCompare = (event) => {
    event.preventDefault();
    if (compareList?.length > 0) {
      navigate("/school/compare");
    } else {
      Swal.fire({
        text: `Please add schools for comparison`,
        icon: "warning",
        title: "<h1 class='text-brand_text'>No School added</h1>",
        confirmButtonText: "<p class=''>OK</p>",
        confirmButtonColor: "#FF7A59",
      });
      // navigate("/");
    }
    // Close the hamburger menu after clicking on Compare
    setIsHamburgerOpen(false);
  };

  useEffect(() => {
    const closeDropdownMenu = () => {
      document.querySelectorAll(".dropdown").forEach((drop) => {
        drop.classList.remove("active");
      });
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-btn")) {
        closeDropdownMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeDropdownMenu();
        setIsHamburgerOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const toggleDropdown = (dropdownId) => {
    const dropdownElement = document.getElementById(dropdownId);
    dropdownElement.classList.toggle("active");
  };

  const toggleHamburger = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };

  const toggleDropdowna = () => {
    setIsOpen(!isOpen);
  };

  const toggleDrawer = () => {
    setToggled(!toggled);
  };
  const handleLogOut = () => {
    dispatch(clearLoginUser());
  };
  return (
    <div className="z-50 border-b bg-normal_bg">
      <header
        id="nav-menu"
        className="mx-auto md:w-11/12"
        aria-label="navigation bar"
      >
        <div className="flex items-center justify-between py-4 md:px-0 px-3 mx-auto ">
          <div className="nav-start">
            <NavLink className="logo" to="/">
              <img
                src={logo}
                alt="School Dekho Logo"
                className="h-14 md:ml-0 pl-1 md:pl-0"
              />
            </NavLink>
          </div>
          <div className=" z-50  flex items-center ml-auto">
            <nav className={`menu ${isHamburgerOpen ? "show" : ""}`}>
              <ul className="flex justify-between menu-bar bg-normal_bg">
                <li className="z-50 ">
                  <button
                    className="nav-link dropdown-btn my_menu_items "
                    onClick={() => toggleDropdown("dropdown1")}
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="browse"
                  >
                    Browse
                    <i className="bx bx-chevron-down" aria-hidden="true"></i>
                  </button>
                  <div id="dropdown1" className="dropdown bg-normal_bg">
                    <ul role="menu">
                      {/* <li role="menuitem">
                        <NavLink
                          to="/schools-near-me"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          Recommended Schools
                        </NavLink>
                      </li> */}
                      {/*  <li role="menuitem">
                        <NavLink
                          to="/register-your-school"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          Register your School
                        </NavLink>
                      </li> */}
                      <li role="menuitem">
                        <NavLink
                          to="/schools-near-me"
                          className="text-sm md:text-base font-medium border-b w-full my-1 hover:text-brand_text transition-all duration-200 my_menu_items"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          All Schools{" "}
                        </NavLink>
                      </li>
                      <li role="menuitem">
                        <Link
                          to="/#counsling"
                          className="text-sm md:text-base font-medium border-b w-full my-1 hover:text-brand_text transition-all duration-200 my_menu_items"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          Parent Counselling
                        </Link>
                      </li>
                      {/* <li role="menuitem"><a href='/school#counsling' onClick={() => setIsHamburgerOpen(false)}>Parent Counselling </a></li> */}
                      <li role="menuitem">
                        <NavLink
                          to="/news-and-blogs"
                          className="text-sm md:text-base font-medium border-b w-full my-1 hover:text-brand_text transition-all duration-200 my_menu_items"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          News & Blogs{" "}
                        </NavLink>
                      </li>
                      <li role="menuitem">
                        <NavLink
                          to="/about-us"
                          className="text-sm md:text-base font-medium border-b w-full my-1 hover:text-brand_text transition-all duration-200 my_menu_items"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          About Us
                        </NavLink>
                      </li>
                      <li role="menuitem">
                        <NavLink
                          className="text-sm md:text-base font-medium border-b w-full mt-1 hover:text-brand_text transition-all duration-200 my_menu_items"
                          to="/contact-us"
                          onClick={() => setIsHamburgerOpen(false)}
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <NavLink
                    className="nav-link my_menu_items"
                    to="#"
                    onClick={handleCompare}
                  >
                    Compare
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link my_menu_items"
                    to="/register-your-school"
                    onClick={() => setIsHamburgerOpen(false)}
                  >
                    Register your School
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link my_menu_items"
                    to="/schools-near-me"
                    onClick={() => setIsHamburgerOpen(false)}
                  >
                    Schools Near Me{" "}
                  </NavLink>
                </li>
                <li className="md:hidden login-btn-mobile ">
                  <div className="inline-flex font-medium tracking-wide text-white transition-all duration-300 rounded-md shadow-sm bg-brand_text hover:bg-orange-600 font-roboto">
                    {!userDetails ? (
                      <Login name="Login" />
                    ) : (
                      <div className="w-fit h-fit flex-shrink flex justify-start">
                        <div style={{ position: "relative" }}>
                          <div
                            className="flex items-center gap-x-3 px-2"
                            onClick={toggleDropdowna}
                          >
                            <img
                              id="avatarButton"
                              type="button"
                              data-dropdown-toggle="userDropdown"
                              data-dropdown-placement="bottom-start"
                              className="border border-brand_text w-10 h-10 rounded-full cursor-pointer"
                              src={profileImg}
                              alt="User dropdown"
                              onClick={toggleDropdowna}
                            />
                            <span> {userProfile?.name}</span>
                          </div>

                          {isOpen && (
                            <div
                              id="userDropdown"
                              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
                              style={{
                                position: "absolute",
                                top: "calc(100% + 2px)",
                                right: "-50x",
                              }}
                            >
                              {/*   <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>
                                  <p className="text-brand_text font-bold text-lg tracking-wide">
                                    {userProfile?.name}
                                  </p>
                                </div>
                              </div> */}
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="avatarButton"
                              >
                                <li onClick={() => setIsHamburgerOpen(false)}>
                                  <Link
                                    to={"/dashboard"}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleDrawer}
                                  >
                                    Dashboard
                                  </Link>
                                </li>
                              </ul>
                              <div className="py-1">
                                <Link
                                  // to={"/dashboard"}
                                  className="block px-4 py-2 text-sm text-brand_text font-semibold tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
                                  onClick={handleLogOut}
                                >
                                  Sign out
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
            <div className="nav-end">
              <div className="right-container">
                {/* <form className="search" role="search">
                  <input type="search md:hidden" className='outline-none' name="search" placeholder="Search" />
                  <i className="bx bx-search" aria-hidden="true"></i>
                </form> */}
                {/*     <button className="font-medium tracking-wide text-white transition-all duration-300 rounded-md shadow-sm bg-brand_text hover:bg-orange-600 font-roboto">
                  {!userDetails ? (
                    <Login name="Login" />
                  ) : (
                    <div className="w-full h-fit flex justify-end">
                      <div style={{ position: "relative" }}>
                        <img
                          id="avatarButton"
                          type="button"
                          data-dropdown-toggle="userDropdown"
                          data-dropdown-placement="bottom-start"
                          className="border border-brand_text w-10 h-10 rounded-full cursor-pointer"
                          src={profileImg}
                          alt="User dropdown"
                          onClick={toggleDropdowna}
                        />
                        {isOpen && (
                          <div
                            id="userDropdown"
                            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            style={{
                              position: "absolute",
                              top: "calc(100% + 2px)",
                              left: "-135px",
                            }}
                          >
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              <div>
                                <p className="text-brand_text font-bold text-lg tracking-wide">
                                  {userProfile?.name}
                                </p>
                              </div>
                        
                            </div>
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="avatarButton"
                            >
                              <li>
                                <Link
                                  to={"/dashboard"}
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={toggleDrawer}
                                >
                                  Dashboard
                                </Link>
                              </li>
                            </ul>
                            <div className="py-1">
                              <Link
                             
                                className="block px-4 py-2 text-sm text-brand_text font-semibold tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
                                onClick={handleLogOut}
                              >
                                Sign out
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </button> */}
                <div className="font-medium tracking-wide text-white transition-all duration-300 rounded-md shadow-sm bg-brand_text hover:bg-orange-600 font-roboto">
                  {!userDetails ? (
                    <Login name="Login" />
                  ) : (
                    <div className="w-full h-fit flex justify-end">
                      <div
                        style={{ position: "relative" }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          id="avatarButton"
                          type="button"
                          data-dropdown-toggle="userDropdown"
                          data-dropdown-placement="bottom-start"
                          className="border bg-white border-brand_text w-10 h-10 rounded-full cursor-pointer"
                          src={profileImg}
                          alt="User dropdown"
                        />
                        {dropdownOpen && (
                          <div
                            id="userDropdown"
                            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            style={{
                              position: "absolute",
                              top: "calc(100% + 2px)",
                              left: "-125px",
                            }}
                          >
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              <div>
                                <p className="text-brand_text font-bold text-lg tracking-wide">
                                  {userProfile?.name}
                                </p>
                              </div>
                            </div>
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200 list-none"
                              aria-labelledby="avatarButton"
                            >
                              <li>
                                <Link
                                  to={"/dashboard"}
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={handleMouseLeave}
                                >
                                  Dashboard
                                </Link>
                              </li>
                            </ul>
                            <div className="py-1">
                              <Link
                                className="block px-4 py-2 text-sm text-brand_text font-semibold tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={handleLogOut}
                              >
                                Sign out
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                id="hamburger"
                aria-label="hamburger"
                aria-haspopup="true"
                className=""
                aria-expanded={isHamburgerOpen}
                onClick={toggleHamburger}
              >
                <i className="bx bx-menu" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
