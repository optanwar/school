/* import React, { useEffect } from "react";
import KidsFuture from "./KidsFuture";
import Marquee from "react-fast-marquee";
import { fetchFeaturedOn } from "../../redux/schoolSlice";
import { useDispatch, useSelector } from "react-redux";
const Featured = () => {
  const dispatch = useDispatch();
  const { featuredOnResp } = useSelector((state) => state?.data);
  const { baseUrl } = useSelector((state) => state?.data);
  useEffect(() => {
    dispatch(fetchFeaturedOn());
  }, []);

  return (
    <div className="py-4 md:py-6 lg:py-7 xl:py-14 container">
      <h3 className="text-left text-3xl w-10/12 md:w-10/12 md:text-center mx-auto mb-0 pb-0 font-bold lg:text-5xl">
        <span className="text-brand_text">School Dekho</span> Featured on
      </h3>
      <Marquee gradientWidth={100} speed={100} className="py-16 pb-14 m-0">
        {featuredOnResp?.data?.map((ele) => {
          return (
            <img
              key={ele?._id}
              src={baseUrl + ele.image}
              alt="featured on images"
              className="max-h-24 w-100 mx-6"
            />
          );
        })}
      </Marquee>
      <div>
        <KidsFuture />
      </div>
    </div>
  );
};
export default Featured;
 */

import React, { useEffect } from "react";
import KidsFuture from "./KidsFuture";
import Marquee from "react-fast-marquee";
import { fetchFeaturedOn } from "../../redux/schoolSlice";
import { useDispatch, useSelector } from "react-redux";

const Featured = () => {
  const dispatch = useDispatch();
  const { featuredOnResp } = useSelector((state) => state?.data);
  const { baseUrl } = useSelector((state) => state?.data);

  useEffect(() => {
    dispatch(fetchFeaturedOn());
  }, [dispatch]);

  return (
    <div className="py-4 md:py-6 lg:py-7 xl:py-14 container">
      <h3 className="text-center text-3xl w-10/12 md:w-10/12  mx-auto mb-0 pb-0 font-bold lg:text-5xl">
        <span className="text-brand_text ">School Dekho</span> Featured on
      </h3>
      <Marquee
        gradientWidth={0}
        speed={50}
        loop={0}
        className="py-16 pb-14 m-0"
      >
        {featuredOnResp?.data
          ?.concat(featuredOnResp?.data)
          .map((ele, index) => (
            <img
              key={`${ele?._id}-${index}`}
              src={baseUrl + ele.image}
              alt="featured on images"
              className="max-h-24 w-100 mx-1 md:mx-6"
            />
          ))}
      </Marquee>
      <div>
        <KidsFuture />
      </div>
    </div>
  );
};

export default Featured;
