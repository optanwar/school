import React from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const Dashboard = ({ dashBoardData }) => {
  return (
    <div>
      <div className=" flex flex-col justify-start items-center md:flex-row gap-4">
        <div className="shadow-md  rounded-md py-5 px-20 mt-10 w-fit">
          <p className="text-center font-roboto font-medium text-gray-600 tracking-wide text-xl">
            Enquiries
          </p>
          <p className="text-4xl text-center font-roboto font-bold  mt-3">
            {dashBoardData?.data?.totalEnquiry || 0}
          </p>
          <Link to={"/dashboard/queries"}>
            {" "}
            <p className="text-center mx-auto flex justify-center text-2xl mt-4 border py-2 rounded-sm border-brand_text hover:bg-brand_text hover:text-white cursor-pointer  text-brand_text transition-all duration-300">
              <MdOutlineQuestionMark />
            </p>
          </Link>
        </div>
        <div className="shadow-md  rounded-md py-5 px-24 mt-10 w-fit">
          <p className="text-center font-roboto font-medium text-gray-600 tracking-wide text-xl">
            Views
          </p>
          <p className="text-4xl text-center font-roboto font-bold  mt-3">
            {dashBoardData?.data?.totalViews || 0}
          </p>
          <Link to={"/dashboard/history"}>
            {" "}
            <p className="text-center mx-auto flex justify-center text-2xl mt-4 border py-2 rounded-sm border-brand_text hover:bg-brand_text hover:text-white cursor-pointer text-brand_text transition-all duration-300 px-7">
              <FaRegEye />
            </p>
          </Link>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
