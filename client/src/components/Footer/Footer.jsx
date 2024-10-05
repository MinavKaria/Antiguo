// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-200 py-8">
      <div className="max-w-7xl flex justify-center items-center mx-auto flex-col px-4 sm:px-6 lg:px-8 gap-5">
        <h1 className=" text-5xl ">ANTIGUO</h1>
        <div className=" border-white border-[1px] w-1/2"></div>
        <div>Privacy policy     /      terms of use  </div>
      </div>
    </footer>
  );
};

export default Footer;
