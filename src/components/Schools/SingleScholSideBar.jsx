import React from "react";
import { MdOutlineRateReview } from "react-icons/md";
import Rating from "@mui/material/Rating";
import Model from "../model/ReviewModel";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { setSelectedSchoolId } from "../../redux/schoolSlice";
const SingleScholSideBar = ({ singleData, data }) => {
  const location = useLocation();
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const lastSegment = pathSegments[pathSegments.length - 1];
  const lastSegment2 = pathSegments[pathSegments.length - 2];

  const dataSchool = useSelector((state) => state.data);

  const singleSchool = dataSchool?.schools?.filter(
    (item) => item.id === lastSegment
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleScroll = (id) => {
    dispatch(setSelectedSchoolId(id));
    scrollToTop();
  };
  const containerStyle = {
    width: "100%",
    height: "250px",
  };

  const lng = singleData[0]?.location?.coordinates[0];
  const lat = singleData[0]?.location?.coordinates[1];

  const center = {
    lat: lat,
    lng: lng,
  };

  const apiKey = "AIzaSyA5Zau53zsCJ1Q2oEAyMIwW5RmAPFjjD5A";

  return (
    <div className="lg:h-[96px]">
      <div className="bg-normal_bg shadow-md shadow-gray-200">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            className="h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72 w-full"
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
        <div className="flex justify-center items-center py-5">
          <p className="tracking-wide text-center px-5">
            {singleData[0]?.address}
          </p>
        </div>
      </div>
      <div className="bg-normal_bg shadow-md shadow-gray-200 mt-5 py-10 flex flex-col justify-center items-center ">
        <h3 className=" tracking-wide font-roboto text-lg font-medium text-center  md:text-xl lg:text-2xl ">
          Get more Reviews
        </h3>
        <div>
          <Model schoolId={singleData[0]?._id} />
        </div>
      </div>
      <div className="bg-normal_bg shadow-md shadow-gray-200 mt-5 py-10">
        <h3 className=" tracking-wide font-roboto text-lg font-medium text-center md:text-xl lg:text-2xl">
          Nearby Schools
        </h3>

        <div className="flex mt-6 gap-y-3 flex-col  mx-2">
          {data &&
            data?.slice(0, 5)?.map((school) => (
              <div
                key={school._id}
                className="px-1 md:px-3 rounded-sm flex items-center bg-white shadow-sm py-3 gap-x-3"
              >
                <div>
                  <Link
                    to={`/schools/${school?.slug}`}
                    onClick={(e) => handleScroll(school?._id)}
                  >
                    <img
                      src={`${baseUrl}${school?.schoolLogoPath}`}
                      alt={school?.name}
                      className="h-20 md:h-24"
                    />
                  </Link>
                </div>
                <div className="">
                  <Link
                    to={`/schools/${school?.slug}`}
                    onClick={(e) => handleScroll(school?._id)}
                  >
                    <h4 className="hover:text-brand_text font-medium text-sm md:text-base  tracking-wide scroll-smooth">
                      {school.name}
                    </h4>
                  </Link>

                  <p className="my-1 text-sm text-gray-500  tracking-wide multiline-ellipsis-school ">
                    {school?.address}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="">
                      <Rating
                        name="simple-controlled "
                        value={school?.averageRating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                    </p>

                    <p className="text-sm">{school?.distance?.toFixed(2)} km</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleScholSideBar;
