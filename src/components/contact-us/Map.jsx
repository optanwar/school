import React from "react";

const Map = () => {
  return (

    <div className="outline-none">

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.140074776208!2d75.86765287048112!3d22.685828883331972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce9643647dd%3A0xc1ffcef90e9b429d!2sCrystal%20IT%20Park!5e0!3m2!1sen!2sin!4v1715259307708!5m2!1sen!2sin"
        width="600"
        height="350"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="iframe-contact outline-none w-full border-none"

      ></iframe>
    </div>
  );
};

export default Map;
