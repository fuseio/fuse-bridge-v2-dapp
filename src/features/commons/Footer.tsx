import React from "react";
import lzlogo from "../../assets/lzlogo.png";

const Footer = () => {
  return (
    <footer className="w-full mt-auto py-6 flex justify-start">
      <div className="w-2/3"></div>
      <div className="flex justify-center items-center w-[575px]">
        <span className="font-medium text-lg">Powered by</span>
        <a href="https://layerzero.network/" target="_blank" rel="noreferrer">
          <img src={lzlogo} alt="logo" className="ml-2 h-10" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
