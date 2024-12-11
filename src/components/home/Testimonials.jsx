/* import React, { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../redux/schoolSlice";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state?.data);
  const { baseUrl } = useSelector((state) => state?.data);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <div className="bg-normal_bg pt-7 md:pt-12">
      <div className="container">
        <h3 className="text-center text-xl md:text-3xl lg:text-4xl tracking-normal font-medium font-roboto">
          People Say About Us
        </h3>
        <div className="mt-0 md:mt-4 lg:mt-4">
          {testimonials?.data?.length ? (
            <Swiper
              spaceBetween={30}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 2,
                },
              }}
              className="mySwiper "
            >
              {testimonials?.data?.map(
                ({ _id, title, name, image, description }) => {
                  return (
                    <SwiperSlide key={_id} className="py-8  md:pb-16">
                      <div className="min-h-auto md:min-h-72 lg:min-h-[17rem] px-10 py-5 rounded-sm shadow-lg flex flex-col justify-between bg-cover bg-no-repeat bg-center bg-testimonial-bg ">
                        <p className="text-left font-roboto flex flex-col gap-x-3 text-sm xl:text-base">
                          <span className="mb-2 text-brand_text text-base md:text-lg lg:text-xl font-semibold   ">
                            <FaQuoteLeft />
                          </span>{" "}
                          {description}
                        </p>
                        <button
                          onClick={toggleExpand}
                          className="text-brand_text text-sm mt-2"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                        <div className="flex gap-x-2 justify-start items-center pt-5">
                          <img
                            src={baseUrl + image}
                            alt="person pic"
                            className="h-14 w-14 md:h-20 md:w-20 object-cover rounded-md aspect-square"
                          />
                          <div>
                            <h3 className=" text-base md:text-lg font-semibold font-roboto capitalize">
                              {name}
                            </h3>
                            <h3 className=" text-sm md:text-base text-gray-500 font-roboto italic">
                              {title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Testimonials);
 */

import React, { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../redux/schoolSlice";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state?.data);
  const { baseUrl } = useSelector((state) => state?.data);
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <div className="bg-normal_bg pt-7 md:pt-12">
      <div className="container">
        <h3 className="text-center text-xl md:text-3xl lg:text-4xl tracking-normal font-medium font-roboto">
          People Say About Us
        </h3>
        <div className="mt-0 md:mt-4 lg:mt-4">
          {testimonials?.data?.length ? (
            <Swiper
              spaceBetween={30}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
              className="mySwiper "
            >
              {testimonials?.data?.map(
                ({ _id, title, name, image, description }) => {
                  const isExpanded = expandedIds[_id];
                  const trimmedDescription =
                    description.length > 120 && !isExpanded
                      ? `${description.substring(0, 120)}...`
                      : description;
                  return (
                    <SwiperSlide key={_id} className="py-8 md:pb-16">
                      <div className="px-10 py-5 rounded-sm shadow-lg flex flex-col justify-between bg-cover bg-no-repeat bg-center bg-testimonial-bg ">
                        <p className="text-left font-roboto flex flex-col gap-x-3 text-sm xl:text-base">
                          <span className="mb-2 text-brand_text text-base md:text-lg lg:text-xl font-semibold">
                            <FaQuoteLeft />
                          </span>{" "}
                          {trimmedDescription}
                          <span
                            onClick={() => toggleExpand(_id)}
                            className="text-brand_text text-sm mt-0.5 cursor-pointer"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </span>
                        </p>

                        <div className="flex gap-x-2 justify-start items-center pt-3">
                          <img
                            src={baseUrl + image}
                            alt="person pic"
                            className="h-14 w-14 md:h-16 md:w-16 object-cover rounded-md aspect-square"
                          />
                          <div>
                            <h3 className="text-base md:text-lg font-semibold font-roboto capitalize">
                              {name}
                            </h3>
                            <h3 className="text-sm md:text-base text-gray-500 font-roboto italic">
                              {title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Testimonials);
