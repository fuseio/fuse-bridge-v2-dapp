import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../commons/ConnectWallet";
import Deposit from "./Deposit";

const Home = () => {
  const [selected, setSelected] = useState(0);
  const filters = ["Deposit", "Withdraw"];
  return (
    <div className="w-full bg-light-gray flex flex-col items-center h-screen">
      <motion.div className="flex bg-white w-[30%] mt-8 rounded-lg px-8 pt-8 pb-9 flex-col">
        <p className="text-2xl font-bold">Bridge</p>
        <div className="flex mt-6 w-full bg-modal-bg rounded-md p-[2px]">
          {filters.map((filter, index) => {
            return (
              <motion.p
                className={
                  selected === index
                    ? "text-primary font-semibold py-2 rounded-md cursor-pointer w-1/2 bg-white text-center"
                    : "text-primary font-medium py-2 cursor-pointer w-1/2 text-center"
                }
                onClick={() => {
                  setSelected(index);
                }}
                key={index}
              >
                {filter}
              </motion.p>
            );
          })}
        </div>
        {selected === 0 ? <Deposit /> : <></>}
        <ConnectWallet className="mt-6 py-4 " />
      </motion.div>
      <motion.div className="flex bg-white w-[30%] mt-2 rounded-lg px-8 py-5 flex-col font-medium">
        <div className="flex justify-between">
          <span className="text-black/50">Daily Limits</span>
          <span>0.5 Min - 25,000,000 max</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-black/50">Bridge Fee</span>
          <span>Free</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
