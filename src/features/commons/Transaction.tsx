import React from "react";
import right from "../../assets/right.svg";

const Transaction = () => {
  return (
    <div className="flex justify-between px-10 py-5 bg-transaction-bg w-full rounded-md mt-2 border-border-gray border-solid border font-medium cursor-pointer">
      <div className="flex w-[20%] justify-between">
        <span>Polygon</span>
        <img src={right} alt="right" />
        <span>Polygon</span>
      </div>
      <span>100 USDC</span>
      <span>16 Jul</span>
      <span>Complete</span>
    </div>
  );
};

export default Transaction;
