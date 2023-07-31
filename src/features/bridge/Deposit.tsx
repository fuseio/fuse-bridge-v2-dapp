import React from "react";
import {
  chainConfig,
  exchangeConfig,
  coinConfig,
  appConfig,
} from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";

type DepositProps = {
  selectedChainSection: number;
  selectedChainItem: number;
  setSelectedChainSection: (section: number) => void;
  setSelectedChainItem: (item: number) => void;
  selectedTokenSection: number;
  selectedTokenItem: number;
  setSelectedTokenSection: (section: number) => void;
  setSelectedTokenItem: (item: number) => void;
  onSwitch: (
    tokenSection: number,
    tokenItem: number,
    chainSection: number,
    chainItem: number
  ) => void;
};

const Deposit = ({
  selectedChainSection,
  selectedChainItem,
  setSelectedChainSection,
  setSelectedChainItem,
  selectedTokenSection,
  selectedTokenItem,
  setSelectedTokenSection,
  setSelectedTokenItem,
  onSwitch,
}: DepositProps) => {
  return (
    <>
      <div className="flex bg-modal-bg rounded-md p-4 mt-3 w-full flex-col">
        <div className="flex w-full items-center">
          <span className="font-medium mr-[10px] text-lg">From</span>
          <Dropdown
            items={[
              {
                heading: "Chains",
                items: appConfig.wrappedBridge.chains.map((chain) => {
                  return {
                    item: chain.name,
                    icon: chain.icon,
                    id: chain.chainId,
                  };
                }),
              },
            //   {
            //     heading: "Centralized Exchanges",
            //     items: exchangeConfig.exchanges.map((exchange, i) => {
            //       return {
            //         item: exchange.name,
            //         icon: exchange.icon,
            //         id: i,
            //       };
            //     }),
            //   },
            ]}
            selectedSection={selectedChainSection}
            selectedItem={selectedChainItem}
            className="w-full"
            onClick={(section, item) => {
              setSelectedChainSection(section);
              setSelectedChainItem(item);
            }}
          />
        </div>
        <div className="flex w-full items-center mt-3">
          <div className="bg-white p-4 rounded-s-md border-[1px] border-border-gray w-2/3">
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
                items: appConfig.wrappedBridge.chains[
                  selectedChainItem
                ].tokens.map((coin, i) => {
                  return {
                    icon: coin.icon,
                    id: i,
                    item: coin.symbol,
                  };
                }),
              },
            ]}
            selectedSection={selectedTokenSection}
            selectedItem={selectedTokenItem}
            className="rounded-e-md rounded-s-none border-s-0 w-1/3"
            onClick={(section, item) => {
              setSelectedTokenSection(section);
              setSelectedTokenItem(item);
            }}
          />
        </div>
        <span className="mt-3 text-sm font-medium">Balance: 6940568098</span>
      </div>
      <div className="flex justify-center">
        <img
          src={switchImg}
          alt="switch"
          className="mt-4 cursor-pointer"
          onClick={() => {
            onSwitch(
              selectedTokenSection,
              selectedTokenItem,
              selectedChainSection,
              selectedChainItem
            );
          }}
        />
      </div>
      <div className="flex bg-modal-bg rounded-md px-4 py-[10px] mt-3 w-full flex-col">
        <span className="font-semibold text-lg">To Fuse Network</span>
        <span className="font-medium mt-1">You will receive 0 USDC</span>
      </div>
    </>
  );
};

export default Deposit;
