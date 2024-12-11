import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdDashboard } from "react-icons/md";
import { RiFileHistoryFill } from "react-icons/ri";
import { SiGooglebigquery } from "react-icons/si";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import profileImg from "../../assets/profile.png";
import Dashboard from "./UserDashboard";
import Queries from "./Queries";
import History from "./History";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { clearFilters } from "../../redux/schoolFilterSlice";
import axios from "../../redux/axios/axios";
const Drawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [dashBoardData, setDashboardData] = React.useState([]);
  const [dashboardErr, setDashboardErr] = React.useState(null);
  const location = useLocation();
  const userDetails = useSelector(
    (state) => state?.auth?.loginUser?.data?.token
  );
  const { loginUser } = useSelector((state) => state?.auth);
  /* useEffect(() => {
    if (!userDetails) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [userDetails, navigate]); */
  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  useEffect(() => {
    // Close the drawer when location changes (link clicked)
    setToggled(false);
  }, [location]);

  const renderContent = () => {
    switch (id) {
      case "history":
        return <History dashBoardData={dashBoardData} />;
      case "queries":
        return <Queries dashBoardData={dashBoardData} />;
      default:
        return <Dashboard dashBoardData={dashBoardData} />;
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDrawer = () => {
    setToggled(!toggled);
  };

  useEffect(() => {
    dispatch(clearFilters());
    async function fetchFaq() {
      try {
        let resp = await axios.post("/getDashboardCount", {
          userId: loginUser?.data?.user?._id,
        });

        setDashboardData(resp?.data);
        setDashboardErr(null);
      } catch (error) {
        setDashboardErr("Something went wrong.");
      }
    }
    fetchFaq();
  }, []);
  useEffect(() => {
    if (!loginUser?.data?.user?._id) {
      navigate("/");
    }
  }, [loginUser]);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        width="180px"
        toggled={toggled}
        transitionDuration={300}
        onToggle={() => setToggled(!toggled)}
        className={`min-h-screen bg-normal_bg ${
          toggled ? "block" : "hidden"
        } md:block`}
        breakPoint="sm"
      >
        <div className="shadow-sm flex justify-end p-2 md:hidden">
          <button
            className="p-1 bg-gray-100 text-xl rounded-md"
            onClick={toggleDrawer}
          >
            <MdOutlineClose />
          </button>
        </div>
        <Menu>
          <Link
            to={"/dashboard"}
            className="block"
            onClick={() => {
              handleTabChange("dashboard");
              toggleDrawer();
            }}
          >
            <MenuItem
              icon={<MdDashboard />}
              className={`shadow-sm ${
                location?.pathname === "/dashboard" ? "bg_primary" : ""
              }`}
            >
              Dashboard
            </MenuItem>
          </Link>
          <SubMenu label="History" icon={<RiFileHistoryFill />}>
            <Link
              to={"/dashboard/history"}
              className={`shadow-sm block ${
                location?.pathname === "/dashboard/history" ? "bg_primary" : ""
              }`}
              onClick={() => {
                handleTabChange("history");
                toggleDrawer();
              }}
            >
              <MenuItem>- Your History</MenuItem>
            </Link>
          </SubMenu>
          <SubMenu label="Query" icon={<SiGooglebigquery />}>
            <Link
              to={"/dashboard/queries"}
              // className="block shadow-sm"
              className={`shadow-sm block ${
                location?.pathname === "/dashboard/queries" ? "bg_primary" : ""
              }`}
              onClick={() => {
                handleTabChange("queries");
                toggleDrawer();
              }}
            >
              <MenuItem>- All Queries</MenuItem>
            </Link>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main className="w-full flex-col flex items-baseline">
        <div className="w-full flex justify-between md:justify-start bg-normal_bg items-center px-3 py-1">
          <button
            className="p-1 h-fit bg-gray-200 rounded-md md:hidden"
            onClick={() => setToggled(!toggled)}
          >
            {toggled ? (
              <MdOutlineClose />
            ) : (
              <span className="flex justify-between items-center gap-x-1">
                <IoMenu /> Dashboard
              </span>
            )}
          </button>
          <button
            className="p-1 h-fit bg-gray-200 rounded-md hidden md:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaArrowRightLong /> : <FaArrowLeftLong />}
          </button>
          {/*   <div className='w-full h-fit flex justify-end'>
            <div style={{ position: 'relative' }}>
              <img
                id="avatarButton"
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="border border-brand_text w-10 h-10 rounded-full cursor-pointer"
                src={profileImg}
                alt="User dropdown"
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div
                  id="userDropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 2px)',
                    left: '-135px',
                  }}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div><p className='text-brand_text font-bold text-lg tracking-wide'>OP TANWAR</p></div>
                    <div className="font-normal truncate">optanwar@gmail.com</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li>
                      <Link to={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleDrawer}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/history"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleDrawer}>
                        History
                      </Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/queries"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={toggleDrawer}>
                        Queries
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <Link to={"/dashboard"} className="block px-4 py-2 text-sm text-brand_text font-semibold tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white " onClick={toggleDrawer}>
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>
        <div className="p-4 w-full">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Drawer;
