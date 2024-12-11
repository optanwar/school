import React, { useState } from "react";

const Queries = ({ dashBoardData }) => {
  return (
    <div>
      <div className="px-3 py-6 shadow-sm ">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-roboto text-brand_text">
          Student Details
        </h1>
        <p className="mt-3">{`Home > Students > Student details`}</p>
      </div>

      <div className="mt-5 px-3 py-5  shadow-sm">
        <p className="text-xl md:text-2xl font-medium font-roboto">
          School queries
        </p>

        <div className="mt-6 relative overflow-x-auto sm:rounded-lg">
          <table className="h-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  School Name
                </th>
                <th scope="col" className="px-6 py-3">
                  School Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Enquiry Type
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Question
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Message
                </th> */}
              </tr>
            </thead>
            <tbody>
              {dashBoardData?.data?.enquiryList?.length > 0 ? (
                dashBoardData?.data?.enquiryList?.map((ele, index) => (
                  <tr
                    key={ele?._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{ele?.school?.name}</td>
                    <td className="px-6 py-4">{ele?.school?.address}</td>
                    <td className="px-6 py-4">{ele?.type}</td>
                    <td className="px-6 py-4">{ele?.phoneNumber}</td>
                    {/* <td className="px-6 py-4">What is your school address?</td>
                    <td className="px-6 py-4">What is your school address?</td> */}
                  </tr>
                ))
              ) : (
                <td colSpan="100%">
                  <h1 className="font-semibold mt-5 text-center">
                    No Records Found
                  </h1>
                </td>
              )}
              {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Indore</td>
                <td className="px-6 py-4">What is your school address?</td>
                <td className="px-6 py-4">What is your school address?</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2
                </th>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Bhopal</td>
                <td className="px-6 py-4">What is your school address?</td>
                <td className="px-6 py-4">What is your school address?</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  3
                </th>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Pune</td>
                <td className="px-6 py-4">What is your school address?</td>
                <td className="px-6 py-4">What is your school address?</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Queries;
