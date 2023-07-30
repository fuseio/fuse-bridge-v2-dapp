import React from "react";
import {
  chainConfig,
  exchangeConfig,
  coinConfig,
} from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";

const Withdraw = () => {
  return (
    <>
      <div className="flex bg-modal-bg rounded-md p-4 mt-3 w-full flex-col">
        <span className="font-semibold text-lg">From Fuse Network</span>
        <div className="flex w-full items-center mt-3">
          <div className="bg-white w-2/3 p-4 rounded-s-md border-[1px] border-border-gray">
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <Dropdown
            items={[
              {
                heading: "Tokens",
                items: coinConfig.coins.map((coin, i) => {
                  return {
                    icon: coin.icon,
                    id: i,
                    item: coin.symbol,
                  };
                }),
              },
            ]}
            selectedSection={0}
            selectedItem={0}
            className="rounded-e-md rounded-s-none border-s-0 w-1/3"
          />
        </div>
        <span className="mt-3 text-sm font-medium">Balance: 6940568098</span>
      </div>
      <div className="flex justify-center">
        <img src={switchImg} alt="switch" className="mt-4 cursor-pointer" />
      </div>
      <div className="flex bg-modal-bg rounded-md px-4 py-6 mt-3 w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium mr-[10px]">To</span>
          <Dropdown
            items={[
              {
                heading: "Chains",
                items: chainConfig.chains.map((chain) => {
                  return {
                    item: chain.chainName,
                    icon: chain.icon,
                    id: chain.chainId,
                  };
                }),
              },
              {
                heading: "Centralized Exchanges",
                items: exchangeConfig.exchanges.map((exchange, i) => {
                  return {
                    item: exchange.name,
                    icon: exchange.icon,
                    id: i,
                  };
                }),
              },
            ]}
            selectedSection={0}
            selectedItem={0}
            className="w-9/10"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-black/50 font-medium">You will receive</span>
        <span className="font-medium">
          0.000003458748567 <span className="font-bold">USDC</span>
        </span>
      </div>
    </>
  );
};

export default Withdraw;
