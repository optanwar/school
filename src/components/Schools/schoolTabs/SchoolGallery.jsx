/* import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
const SchoolGallery = ({ data }) => {
  const baseUrl = useSelector((state) => state.data.baseUrl);
  return (
    <div>
      <Carousel>
        {data &&
          data.map((img) => (
            <div
              key={img.index}
              className="hover:scale-110 transition-all duration-300"
            >
              <img src={`${baseUrl}${img}`} alt="img" className="school" />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default SchoolGallery; */
/* import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import ImageModal from "./ImageModal"; // Import the modal component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Ensure you import the carousel styles

const SchoolGallery = ({ data }) => {
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const [modalSrc, setModalSrc] = useState(null);

  const handleImageClick = (src) => {
    setModalSrc(src);
  };

  const handleCloseModal = () => {
    setModalSrc(null);
  };

  return (
    <div>
      <Carousel>
        {data &&
          data.map((img, index) => (
            <div
              key={index}
              className=""
              onClick={() => handleImageClick(`${baseUrl}${img}`)}
            >
              <img src={`${baseUrl}${img}`} alt="img" className="school" />
            </div>
          ))}
      </Carousel>
      {modalSrc && <ImageModal src={modalSrc} onClose={handleCloseModal} />}
    </div>
  );
};

export default SchoolGallery;
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import ImageModal from "./ImageModal"; // Import the modal component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Ensure you import the carousel styles

const SchoolGallery = ({ data }) => {
  const baseUrl = useSelector((state) => state.data.baseUrl);
  const [modalSrc, setModalSrc] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageClick = (src) => {
    if (isLargeScreen) {
      setModalSrc(src);
    }
  };

  const handleCloseModal = () => {
    setModalSrc(null);
  };

  return (
    <div>
      <Carousel>
        {data &&
          data.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleImageClick(`${baseUrl}${img}`)}
            >
              <img src={`${baseUrl}${img}`} alt="img" className="school" />
            </div>
          ))}
      </Carousel>
      {modalSrc && <ImageModal src={modalSrc} onClose={handleCloseModal} />}
    </div>
  );
};

export default SchoolGallery;
