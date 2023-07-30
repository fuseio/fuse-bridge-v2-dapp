import React from "react";
import lzlogo from "../../assets/lzlogo.png";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center mt-auto py-6">
      <span className="font-medium text-lg">Powered by</span>
      <a href="https://layerzero.network/" target="_blank" rel="noreferrer">
        <img src={lzlogo} alt="logo" className="ml-2 h-10" />
      </a>
    </footer>
  );
};

export default Footer;
