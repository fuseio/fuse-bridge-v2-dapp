/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { appConfig } from "../../constants/config";
import Dropdown from "../commons/Dropdown";
import switchImg from "../../assets/switch.svg";
import { useSetChain, useConnectWallet } from "@web3-onboard/react";
import { selectBalanceSlice, fetchBalance } from "../../store/balanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectChainSlice, setChain } from "../../store/chainSlice";
import alert from "../../assets/alert.svg";
import visit from "../../assets/visit.svg";
import sFuse from "../../assets/sFuse.svg";
import { estimateWrappedFee } from "../../store/feeSlice";

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
  amount: string;
  setAmount: (amount: string) => void;
  isDisabledChain: boolean;
  setIsDisabledChain: (isDisabledChain: boolean) => void;
  setDisplayButton: (displayButton: boolean) => void;
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
  amount,
  setAmount,
  isDisabledChain,
  setIsDisabledChain,
  setDisplayButton,
}: WithdrawProps) => {
  const [{ chains }] = useSetChain();
  const [{ wallet }] = useConnectWallet();
  const dispatch = useAppDispatch();
  const balanceSlice = useAppSelector(selectBalanceSlice);
  const chainSlice = useAppSelector(selectChainSlice);
  useEffect(() => {
    if (wallet && selectedChainSection === 0)
      dispatch(
        fetchBalance({
          address: wallet.accounts[0].address,
          contractAddress:
            appConfig.wrappedBridge.wrapped.tokens[selectedTokenItem].address,
          decimals:
            appConfig.wrappedBridge.wrapped.tokens[selectedTokenItem].decimals,
          bridge: appConfig.wrappedBridge.wrapped.address,
        })
      );
  }, [
    selectedTokenItem,
    selectedTokenSection,
    wallet?.accounts[0].address,
    chainSlice.chainId,
  ]);
  useEffect(() => {
    if (chainSlice.chainId === 0) {
      dispatch(
        setChain({
          chainId: 122,
          bridge: appConfig.wrappedBridge.wrapped.address,
          icon: chains[0].icon as string,
          lzChainId: 138,
          name: "Fuse",
          rpcUrl: "https://rpc.fuse.io",
          tokens: [],
        })
      );
    }
  }, [chainSlice.chainId]);
  return (
    <>
      {!isDisabledChain && (
        <>
          <div className="flex bg-modal-bg rounded-md p-4 mt-3 w-full flex-col">
            <span className="font-semibold text-lg">
              From
              <img
                src={sFuse}
                alt="sFuse"
                className="inline-block ml-2 mr-2 h-7"
              />
              Fuse Network
            </span>
            <div className="flex w-full items-center mt-3">
              <div className="bg-white w-2/3 p-4 rounded-s-md border-[1px] border-border-gray">
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
              Balance:{" "}
              {balanceSlice.isBalanceLoading ||
              balanceSlice.isApprovalLoading ? (
                <span className="px-10 py-1 ml-2 rounded-md animate-pulse bg-fuse-black/10"></span>
              ) : (
                balanceSlice.balance
              )}
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
                dispatch(
                  setChain(appConfig.wrappedBridge.chains[selectedChainItem])
                );
              }}
            />
          </div>
        </>
      )}
      <div className="flex bg-modal-bg rounded-md p-4 mt-3 w-full flex-col">
        <span className="font-medium mb-2">To Network</span>
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
            {
              items: appConfig.wrappedBridge.disabledChains.map((chain, i) => {
                return {
                  item: chain.chainName,
                  icon: chain.icon,
                  id: i,
                };
              }),
            },
          ]}
          selectedSection={selectedChainSection}
          selectedItem={selectedChainItem}
          onClick={(section, item) => {
            setSelectedChainSection(section);
            setSelectedChainItem(item);
            if (section === 1) {
              setDisplayButton(false);
              setIsDisabledChain(true);
            } else {
              dispatch(setChain(appConfig.wrappedBridge.chains[item]));
              dispatch(
                estimateWrappedFee({
                  contractAddress: appConfig.wrappedBridge.wrapped.address,
                  lzChainId: appConfig.wrappedBridge.chains[item].lzChainId,
                  rpcUrl: "https://rpc.fuse.io",
                })
              );
              setDisplayButton(true);
              setIsDisabledChain(false);
            }
          }}
        />
        <span className="text-black/50 font-medium mt-3">
          You will receive:{" "}
          <span className="text-black font-medium">
            {" "}
            {amount && !isNaN(parseFloat(amount)) ? parseFloat(amount) : 0}{" "}
            <span className="font-bold">
              {
                appConfig.wrappedBridge.chains[selectedChainItem].tokens[
                  selectedTokenItem
                ].symbol
              }
            </span>
          </span>
        </span>
      </div>
      {isDisabledChain && (
        <>
          <div className="px-2 py-4 mt-4 mb-2 bg-warning-bg rounded-md border border-warning-border flex">
            <div className="flex p-2 w-[10%] items-start">
              <img src={alert} alt="warning" className="h-5" />
            </div>
            <div className="flex flex-col font-medium">
              <p>
                To move tokens from Fuse to{" "}
                {
                  appConfig.wrappedBridge.disabledChains[selectedChainItem]
                    .chainName
                }{" "}
                please use{" "}
                {
                  appConfig.wrappedBridge.disabledChains[selectedChainItem]
                    .appName
                }{" "}
                dApp.
              </p>
            </div>
          </div>
          <a
            href={
              appConfig.wrappedBridge.disabledChains[selectedChainItem].appURL
            }
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer"
          >
            <div className="flex mt-2 bg-modal-bg py-4 px-5 rounded-md items-center cursor-pointer">
              <img
                src={
                  appConfig.wrappedBridge.disabledChains[selectedChainItem]
                    .appLogo
                }
                alt="icon"
              />
              <div className="flex flex-col ml-3">
                <p className="font-semibold text-lg">
                  {
                    appConfig.wrappedBridge.disabledChains[selectedChainItem]
                      .appName
                  }
                </p>
                <p className="font-medium text-[#898888]">
                  {
                    appConfig.wrappedBridge.disabledChains[selectedChainItem]
                      .appURL
                  }
                </p>
              </div>
              <img src={visit} alt="go" className="ml-auto" />
            </div>
          </a>
        </>
      )}
    </>
  );
};

export default Withdraw;
