import React, { useEffect, useState } from "react";
import {
  chainConfig,
  exchangeConfig,
  coinConfig,
  appConfig,
} from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { getERC20Balance } from "../../utils/erc20";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchBalance, selectBalanceSlice } from "../../store/balanceSlice";

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
  amount: string;
  setAmount: (amount: string) => void;
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
  amount,
  setAmount,
}: DepositProps) => {
  const [{ connectedChain }, setChain] = useSetChain();
  const [{ wallet }] = useConnectWallet();
  const dispatch = useAppDispatch();
  const balanceSlice = useAppSelector(selectBalanceSlice);
  useEffect(() => {
    if (wallet)
      dispatch(
        fetchBalance({
          address: wallet.accounts[0].address,
          contractAddress:
            appConfig.wrappedBridge.chains[selectedChainItem].tokens[
              selectedTokenItem
            ].address,
          decimals:
            appConfig.wrappedBridge.chains[selectedChainItem].tokens[
              selectedTokenItem
            ].decimals,
          bridge: appConfig.wrappedBridge.chains[selectedChainItem].bridge,
        })
      );
  }, [selectedTokenItem, selectedTokenSection, connectedChain, wallet]);
  useEffect(() => {
    if (wallet)
      dispatch(
        fetchBalance({
          address: wallet.accounts[0].address,
          contractAddress:
            appConfig.wrappedBridge.chains[selectedChainItem].tokens[
              selectedTokenItem
            ].address,
          decimals:
            appConfig.wrappedBridge.chains[selectedChainItem].tokens[
              selectedTokenItem
            ].decimals,
          bridge: appConfig.wrappedBridge.chains[selectedChainItem].bridge,
        })
      );
  }, []);
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
                    id: chain.lzChainId,
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
              if (connectedChain)
                setChain({
                  chainId:
                    "0x" +
                    appConfig.wrappedBridge.chains[item].chainId.toString(16),
                });
            }}
          />
        </div>
        <div className="flex w-full items-center mt-3">
          <div className="bg-white p-4 rounded-s-md border-[1px] border-border-gray w-2/3">
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
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
        <span className="mt-3 text-sm font-medium">
          Balance: {balanceSlice.balance}
        </span>
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
        <span className="font-medium mt-1">
          You will receive {amount ? amount : 0} USDC
        </span>
      </div>
    </>
  );
};

export default Deposit;
