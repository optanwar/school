/* import React from "react";

const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white text-2xl"
        >
          &times;
        </button>
        <img
          src={src}
          alt="Zoomed"
          className="max-w-full max-h-full school-gallery-img"
        />
      </div>
    </div>
  );
};

export default ImageModal; */

import React from "react";

const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute  left-full top-0 font-bold px-3 py-0.5 m-0.5 rounded-full  bg-brand_text text-2xl text-white hover:bg-orange-600 transition-all "
        >
          &times;
        </button>
        <img
          src={src}
          alt="Zoomed"
          className="max-w-full max-h-full school-gallery-img rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageModal;
