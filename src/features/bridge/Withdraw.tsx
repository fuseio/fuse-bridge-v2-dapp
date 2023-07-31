import React from "react";
import {
  chainConfig,
  exchangeConfig,
  coinConfig,
} from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";

type WithdrawProps = {
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

const Withdraw = ({
  selectedChainSection,
  selectedChainItem,
  setSelectedChainSection,
  setSelectedChainItem,
  selectedTokenSection,
  selectedTokenItem,
  setSelectedTokenSection,
  setSelectedTokenItem,
  onSwitch,
}: WithdrawProps) => {
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
            selectedSection={selectedChainSection}
            selectedItem={selectedChainItem}
            className="w-9/10"
            onClick={(section, item) => {
              setSelectedChainSection(section);
              setSelectedChainItem(item);
            }}
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
