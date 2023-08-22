import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../commons/ConnectWallet";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Footer from "../commons/Footer";
import history from "../../assets/history.svg";
import Transactions from "../commons/Transactions";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { appConfig } from "../../constants/config";
import { selectBalanceSlice } from "../../store/balanceSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  bridgeAndUnwrap,
  bridgeNativeTokens,
  bridgeOriginalTokens,
  bridgeWrappedTokens,
  increaseERC20Allowance,
  selectContractSlice,
} from "../../store/contractSlice";
import { setChain } from "../../store/chainSlice";
import Button from "../commons/Button";
import { fetchBridgeTransactions } from "../../store/transactionsSlice";
import {
  estimateOriginalFee,
  estimateWrappedFee,
  selectFeeSlice,
} from "../../store/feeSlice";
import { getNativeCurrency } from "@layerzerolabs/ui-core";
import { getChainKey } from "@layerzerolabs/lz-sdk";
import ToastPane from "../commons/ToastPane";

const Home = () => {
  const [{ connectedChain, chains }, switchChain] = useSetChain();
  const [{ wallet }] = useConnectWallet();
  const dispatch = useAppDispatch();
  const balanceSlice = useAppSelector(selectBalanceSlice);
  const contractSlice = useAppSelector(selectContractSlice);
  const [selected, setSelected] = useState(0);
  const [depositSelectedChainSection, setDepositSelectedChainSection] =
    useState(0);
  const [depositSelectedChainItem, setDepositSelectedChainItem] = useState(0);
  const [depositSelectedTokenSection, setDepositSelectedTokenSection] =
    useState(0);
  const [depositSelectedTokenItem, setDepositSelectedTokenItem] = useState(0);
  const [displayButton, setDisplayButton] = useState(true);
  const [withdrawSelectedChainSection, setWithdrawSelectedChainSection] =
    useState(0);
  const [withdrawSelectedChainItem, setWithdrawSelectedChainItem] = useState(0);
  const [withdrawSelectedTokenSection, setWithdrawSelectedTokenSection] =
    useState(0);
  const [withdrawSelectedTokenItem, setWithdrawSelectedTokenItem] = useState(0);
  const [amount, setAmount] = useState("");
  const filters = ["Deposit", "Withdraw"];
  const [isOpen, setIsOpen] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [isDisabledChain, setIsDisabledChain] = useState(false);
  useEffect(() => {
    if (wallet?.accounts[0].address) {
      dispatch(fetchBridgeTransactions(wallet?.accounts[0].address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.accounts[0].address]);
  const feeSlice = useAppSelector(selectFeeSlice);

  const handleIncreaseAllowance = () => {
    switchChain({
      chainId:
        selected === 0
          ? "0x" +
            appConfig.wrappedBridge.chains[
              depositSelectedChainItem
            ].chainId.toString(16)
          : "0x7A",
    }).then((res) => {
      if (res && selected === 0)
        dispatch(
          increaseERC20Allowance({
            contractAddress:
              appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                depositSelectedTokenItem
              ].address,
            amount: amount,
            bridge:
              appConfig.wrappedBridge.chains[depositSelectedChainItem].original,
            decimals:
              appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                depositSelectedTokenItem
              ].decimals,
            address: wallet?.accounts[0].address as string,
          })
        );
      else if (res && selected === 1)
        dispatch(
          increaseERC20Allowance({
            contractAddress:
              appConfig.wrappedBridge.fuse.tokens[withdrawSelectedTokenItem]
                .address,
            amount: amount,
            bridge: appConfig.wrappedBridge.fuse.wrapped,
            decimals:
              appConfig.wrappedBridge.fuse.tokens[withdrawSelectedTokenItem]
                .decimals,
            address: wallet?.accounts[0].address as string,
          })
        );
    });
  };

  const handleDeposit = () => {
    switchChain({
      chainId:
        "0x" +
        appConfig.wrappedBridge.chains[
          depositSelectedChainItem
        ].chainId.toString(16),
    }).then((res) => {
      if (res) {
        if (
          appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
            depositSelectedTokenItem
          ].isBridged &&
          appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
            depositSelectedTokenItem
          ].isNative
        ) {
          dispatch(
            bridgeAndUnwrap({
              address: wallet?.accounts[0].address as string,
              amount: amount,
              bridge:
                appConfig.wrappedBridge.chains[depositSelectedChainItem]
                  .wrapped,
              contractAddress:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].address,
              decimals:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].decimals,
              srcChainId:
                appConfig.wrappedBridge.chains[depositSelectedChainItem]
                  .lzChainId,
              symbol:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].symbol,
              chainId: 138,
            })
          );
        } else if (
          !appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
            depositSelectedTokenItem
          ].isBridged
        )
          dispatch(
            bridgeOriginalTokens({
              address: wallet?.accounts[0].address as string,
              amount: amount,
              bridge:
                appConfig.wrappedBridge.chains[depositSelectedChainItem]
                  .original,
              contractAddress:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].address,
              decimals:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].decimals,
              srcChainId:
                appConfig.wrappedBridge.chains[depositSelectedChainItem]
                  .lzChainId,
              symbol:
                appConfig.wrappedBridge.chains[depositSelectedChainItem].tokens[
                  depositSelectedTokenItem
                ].symbol,
              dstChainId: 138,
            })
          );
      }
    });
  };

  const handleWithdraw = () => {
    switchChain({
      chainId: "0x7A",
    }).then((res) => {
      if (res) {
        if (
          appConfig.wrappedBridge.chains[withdrawSelectedTokenItem].tokens[
            withdrawSelectedTokenItem
          ].isNative &&
          appConfig.wrappedBridge.chains[withdrawSelectedTokenItem].tokens[
            withdrawSelectedTokenItem
          ].isBridged
        ) {
          dispatch(
            bridgeNativeTokens({
              address: wallet?.accounts[0].address as string,
              amount: amount,
              bridge:
                appConfig.wrappedBridge.chains[withdrawSelectedChainItem]
                  .originalFuse,
              decimals:
                appConfig.wrappedBridge.chains[withdrawSelectedChainItem]
                  .tokens[withdrawSelectedTokenItem].decimals,
              dstChainId:
                appConfig.wrappedBridge.chains[withdrawSelectedChainItem]
                  .lzChainId,
              srcChainId: 138,
              symbol: "FUSE",
            })
          );
        } else
          dispatch(
            bridgeWrappedTokens({
              address: wallet?.accounts[0].address as string,
              amount: amount,
              bridge: appConfig.wrappedBridge.fuse.wrapped,
              contractAddress:
                appConfig.wrappedBridge.fuse.tokens[withdrawSelectedTokenItem]
                  .address,
              decimals:
                appConfig.wrappedBridge.fuse.tokens[withdrawSelectedTokenItem]
                  .decimals,
              chainId:
                appConfig.wrappedBridge.chains[withdrawSelectedChainItem]
                  .lzChainId,
              symbol:
                appConfig.wrappedBridge.fuse.tokens[withdrawSelectedTokenItem]
                  .symbol,
              srcChainId: 138,
            })
          );
      }
    });
  };
  return (
    <>
      <Transactions isOpen={isOpen} onToggle={setIsOpen} />
      <div className="w-8/9 flex flex-col md:w-9/10 min-h-[90vh] relative">
        <div className="w-full flex">
          <div className="flex flex-col pt-14 w-2/3 pe-60">
            <p className="font-black text-[44px]">Fuse Bridge</p>
            <p className="text-text-heading-gray text-lg mt-4">
              The Fuse Bridge allows you to move funds from different networks
              and centralized exchanges to Fuse.
            </p>
            <ToastPane />
          </div>
          <div className="flex-col items-center flex pt-14">
            <span
              className="flex bg-white ms-auto px-2 items-center rounded-md cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <img src={history} alt="history" className="h-9" />
              <p className="font-medium ml-1">History</p>
            </span>
            <motion.div className="flex bg-white w-[575px] mt-3 rounded-lg px-8 pt-8 pb-9 flex-col">
              <div className="flex w-full bg-modal-bg rounded-md p-[2px]">
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
                        if (isExchange) return;
                        if (index === 1) {
                          if (withdrawSelectedChainSection === 1) {
                            setIsDisabledChain(true);
                            return;
                          } else {
                            setIsDisabledChain(false);
                          }
                          dispatch(
                            setChain({
                              chainId: 122,
                              icon: chains[0].icon as string,
                              lzChainId: 138,
                              name: "Fuse",
                              rpcUrl: "https://rpc.fuse.io",
                              tokens: [],
                              wrapped: appConfig.wrappedBridge.fuse.wrapped,
                            })
                          );
                          dispatch(
                            estimateWrappedFee({
                              contractAddress:
                                appConfig.wrappedBridge.fuse.wrapped,
                              lzChainId:
                                appConfig.wrappedBridge.chains[
                                  withdrawSelectedChainItem
                                ].lzChainId,
                              rpcUrl: "https://rpc.fuse.io",
                            })
                          );
                        } else {
                          if (depositSelectedChainSection === 1) {
                            setIsDisabledChain(true);
                            return;
                          } else {
                            setIsDisabledChain(false);
                          }
                          dispatch(
                            setChain(
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ]
                            )
                          );
                          dispatch(
                            estimateOriginalFee({
                              contractAddress:
                                appConfig.wrappedBridge.chains[
                                  depositSelectedChainItem
                                ].original,
                              rpcUrl:
                                appConfig.wrappedBridge.chains[
                                  depositSelectedChainItem
                                ].rpcUrl,
                            })
                          );
                        }
                      }}
                      key={index}
                    >
                      {filter}
                    </motion.p>
                  );
                })}
              </div>
              {selected === 0 ? (
                <Deposit
                  selectedChainItem={depositSelectedChainItem}
                  selectedChainSection={depositSelectedChainSection}
                  setSelectedChainItem={setDepositSelectedChainItem}
                  setSelectedChainSection={setDepositSelectedChainSection}
                  selectedTokenItem={depositSelectedTokenItem}
                  selectedTokenSection={depositSelectedTokenSection}
                  setSelectedTokenItem={setDepositSelectedTokenItem}
                  setSelectedTokenSection={setDepositSelectedTokenSection}
                  onSwitch={(
                    tokenSection,
                    tokenItem,
                    chainSection,
                    chainItem
                  ) => {
                    setWithdrawSelectedChainSection(chainSection);
                    setWithdrawSelectedChainItem(chainItem);
                    setWithdrawSelectedTokenSection(tokenSection);
                    setWithdrawSelectedTokenItem(tokenItem);
                    setSelected(1);
                  }}
                  amount={amount}
                  setAmount={setAmount}
                  setDisplayButton={setDisplayButton}
                  isExchange={isExchange}
                  setIsExchange={setIsExchange}
                  isDisabledChain={isDisabledChain}
                  setIsDisabledChain={setIsDisabledChain}
                />
              ) : (
                <Withdraw
                  selectedChainItem={withdrawSelectedChainItem}
                  selectedChainSection={withdrawSelectedChainSection}
                  setSelectedChainItem={setWithdrawSelectedChainItem}
                  setSelectedChainSection={setWithdrawSelectedChainSection}
                  selectedTokenItem={withdrawSelectedTokenItem}
                  selectedTokenSection={withdrawSelectedTokenSection}
                  setSelectedTokenItem={setWithdrawSelectedTokenItem}
                  setSelectedTokenSection={setWithdrawSelectedTokenSection}
                  onSwitch={(
                    tokenSection,
                    tokenItem,
                    chainSection,
                    chainItem
                  ) => {
                    setDepositSelectedChainSection(chainSection);
                    setDepositSelectedChainItem(chainItem);
                    setDepositSelectedTokenSection(tokenSection);
                    setDepositSelectedTokenItem(tokenItem);
                    setSelected(0);
                  }}
                  amount={amount}
                  setAmount={setAmount}
                  isDisabledChain={isDisabledChain}
                  setIsDisabledChain={setIsDisabledChain}
                  setDisplayButton={setDisplayButton}
                />
              )}
              {!connectedChain && displayButton ? (
                <ConnectWallet className="mt-6 py-4 " />
              ) : displayButton &&
                selected === 1 &&
                !appConfig.wrappedBridge.chains[withdrawSelectedChainItem]
                  .tokens[withdrawSelectedTokenItem].isNative &&
                parseFloat(amount) > parseFloat(balanceSlice.liquidity) ? (
                <Button
                  className="bg-[#FFEBE9] text-[#FD0F0F] px-4 mt-6 py-4 rounded-full font-medium md:text-sm "
                  disabled
                  text="No Liquidity"
                />
              ) : (
                displayButton && (
                  <Button
                    className="bg-fuse-black text-white px-4 mt-6 py-4 rounded-full font-medium md:text-sm "
                    onClick={async () => {
                      if (selected === 1 && connectedChain?.id !== "0x7a") {
                        await switchChain({
                          chainId: "0x7a",
                        });
                      } else {
                        if (!wallet) return;
                        if (!amount) return;
                        if (
                          selected === 1 &&
                          appConfig.wrappedBridge.chains[
                            withdrawSelectedChainItem
                          ].tokens[withdrawSelectedTokenItem].isNative
                        ) {
                          handleWithdraw();
                        } else if (
                          parseFloat(balanceSlice.approval) < parseFloat(amount)
                        ) {
                          handleIncreaseAllowance();
                        } else if (selected === 0) {
                          handleDeposit();
                        } else if (selected === 1) {
                          handleWithdraw();
                        }
                      }
                    }}
                    disabled={
                      (selected === 1 && connectedChain?.id === "0x7a") ||
                      selected === 0
                        ? balanceSlice.isApprovalLoading ||
                          contractSlice.isBridgeLoading ||
                          contractSlice.isApprovalLoading ||
                          balanceSlice.isBalanceLoading ||
                          !amount ||
                          parseFloat(amount) === 0 ||
                          isNaN(parseFloat(amount))
                        : false
                    }
                    text={
                      contractSlice.isBridgeLoading ||
                      contractSlice.isApprovalLoading
                        ? "Loading..."
                        : selected === 1 && connectedChain?.id !== "0x7a"
                        ? "Switch To Fuse"
                        : selected === 1 &&
                          appConfig.wrappedBridge.chains[
                            withdrawSelectedChainItem
                          ].tokens[withdrawSelectedTokenItem].isNative
                        ? "Bridge"
                        : parseFloat(balanceSlice.approval) < parseFloat(amount)
                        ? "Approve"
                        : "Bridge"
                    }
                    disabledClassname="bg-fuse-black/20 text-black px-4 mt-6 py-4 rounded-full font-medium md:text-sm "
                  />
                )
              )}
            </motion.div>
            <motion.div className="flex bg-white w-[575px] mt-2 rounded-lg px-8 py-5 flex-col font-medium">
              <div className="flex justify-between">
                <span className="text-black/50">Bridge Fee</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-black/50">Gas Estimation</span>
                {feeSlice.isGasFeeLoading ? (
                  <span className="px-14 rounded-md animate-pulse bg-fuse-black/10"></span>
                ) : !(isExchange || isDisabledChain) ? (
                  <span>
                    {feeSlice.gasFee}{" "}
                    {
                      getNativeCurrency(
                        getChainKey(
                          selected === 0
                            ? appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].lzChainId
                            : 138
                        )
                      ).symbol
                    }
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-black/50">Daily Limits</span>
                <span>0.5 Min - 25,000,000 max</span>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
