import React from "react";
import {
  chainConfig,
  exchangeConfig,
  coinConfig,
} from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";

const Deposit = () => {
  return (
    <>
      <div className="flex bg-modal-bg rounded-md p-4 mt-3 w-full flex-col">
        <div className="flex w-full items-center">
          <span className="font-medium mr-[10px] text-lg">From</span>
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
          />
        </div>
        <div className="flex w-full items-center mt-3">
          <div className="bg-white w-2/3 p-4 rounded-s-md border-[1px] border-border-gray">
            000
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
            className="w-1/3 rounded-e-md rounded-s-none border-s-0"
          />
        </div>
        <span className="mt-3 text-sm font-medium">Balance: 6940568098</span>
      </div>
      <div className="flex justify-center">
        <img src={switchImg} alt="switch" className="mt-4 cursor-pointer" />
      </div>
      <div className="flex bg-modal-bg rounded-md px-4 py-[10px] mt-3 w-full flex-col">
        <span className="font-semibold text-lg">To Fuse Network</span>
        <span className="font-medium mt-1">You will receive 0 USDC</span>
      </div>
    </>
  );
};

export default Deposit;
