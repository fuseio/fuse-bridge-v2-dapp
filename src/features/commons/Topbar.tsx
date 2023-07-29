import React from "react";
import ConnectWallet from "./ConnectWallet";
import fuseLogo from "../../assets/fuselogo.svg";

const Topbar = () => {
  return (
    <nav className="w-full sticky top-0 bg-light-gray/60 backdrop-blur-xl flex justify-center py-6 z-40">
      <div className="flex justify-between h-full items-center w-8/9 md:w-9/10" >
        <span>
          <a href="/">
            <img src={fuseLogo} alt="fuse logo" className="h-8 z-50" />
          </a>
        </span>
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Topbar;
