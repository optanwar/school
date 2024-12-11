import React, { useEffect } from "react";
import img from "../../assets/school-1.png";
import img1 from "../../assets/school-2.jpg";
import img2 from "../../assets/school-3.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const History = ({ dashBoardData }) => {
  const { baseUrl } = useSelector((state) => state?.data);
  const navigate = useNavigate();
  const userDetails = useSelector(
    (state) => state?.auth?.loginUser?.data?.token
  );
  /* useEffect(() => {
    if (!userDetails) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [userDetails, navigate]); */
  function dateFormater(date) {
    const formatDate = new Date(date);
    const month = formatDate.getMonth() + 1; // Months are zero-indexed
    const day = formatDate.getDate();
    const year = formatDate.getFullYear() % 100; // Get last two digits of the year

    // Format as MM/DD/YY
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  return (
    <div>
      <div className="px-3 py-6 shadow-sm ">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-roboto text-brand_text">
          Student History
        </h1>
        <p className="mt-3">{`Home > Students > Student details`}</p>
      </div>

      <div className="mt-5  px-3 py-5  shadow-sm">
        <p className="text-xl md:text-2xl font-medium font-roboto">History</p>

        <div className="mt-6 relative overflow-x-auto sm:rounded-lg">
          <table className="h-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl
                </th>
                <th scope="col" className="px-6 py-3">
                  Logo
                </th>
                <th scope="col" className="px-6 py-3">
                  School Name
                </th>
                <th scope="col" className="px-6 py-3">
                  School Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                {/* count section removed due because view count only 1 per user in backend  */}
                {/* <th scope="col" className="px-6 py-3">
                  Count
                </th> */}
              </tr>
            </thead>
            <tbody>
              {dashBoardData?.data?.schoolViewList?.length > 0 ? (
                <>
                  {dashBoardData?.data?.schoolViewList
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    ?.map((ele, index) => (
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
                        <td className="px-6 py-4">
                          {/* <img src={img} alt="school logo" className="h-8" /> */}
                          <img
                            src={baseUrl + ele?.schoolId?.schoolLogoPath}
                            alt="school logo"
                            className="h-8"
                          />
                        </td>
                        <td className="px-6 py-4">{ele?.schoolId?.name}</td>
                        <td className="px-6 py-4">{ele?.schoolId?.address}</td>
                        <td className="px-6 py-4">
                          {dateFormater(ele?.createdAt)}
                        </td>
                        {/* count section removed because view count only 1 per user in backend  */}
                        {/* <td className="px-6 py-4">2</td> */}
                      </tr>
                    ))}
                </>
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
                <td className="px-6 py-4">
                  <img src={img} alt="schhool logo" className="h-8" />
                </td>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Dewas</td>
                <td className="px-6 py-4">1/2/24</td>
                <td className="px-6 py-4">2</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2
                </th>
                <td className="px-6 py-4">
                  <img src={img1} alt="schhool logo" className="h-8" />
                </td>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Bhopal</td>
                <td className="px-6 py-4">1/2/24</td>
                <td className="px-6 py-4">9</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  3
                </th>
                <td className="px-6 py-4">
                  <img src={img2} alt="schhool logo" className="h-8" />
                </td>
                <td className="px-6 py-4">Green Valley High School</td>
                <td className="px-6 py-4">Indore</td>
                <td className="px-6 py-4">1/2/24</td>
                <td className="px-6 py-4">99</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
