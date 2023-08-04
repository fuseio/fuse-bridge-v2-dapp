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
  bridgeOriginalTokens,
  bridgeWrappedTokens,
  increaseERC20Allowance,
  selectContractSlice,
} from "../../store/contractSlice";
import { setChain } from "../../store/chainSlice";
import Button from "../commons/Button";
import { fetchBridgeTransactions } from "../../store/transactionsSlice";

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
  return (
    <>
      <Transactions isOpen={isOpen} onToggle={setIsOpen} />
      <div className="w-full bg-light-gray flex flex-col items-center h-[90%]">
        <motion.div className="flex bg-white w-[575px] mt-8 rounded-lg px-8 pt-8 pb-9 flex-col">
          <div className="flex w-full justify-between items-end">
            <p className="text-2xl font-bold">Bridge</p>
            <img
              src={history}
              alt="history"
              className="cursor-pointer h-9"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
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
                          bridge: appConfig.wrappedBridge.wrapped.address,
                          icon: chains[0].icon as string,
                          lzChainId: 138,
                          name: "Fuse",
                          rpcUrl: "https://rpc.fuse.io",
                          tokens: [],
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
              onSwitch={(tokenSection, tokenItem, chainSection, chainItem) => {
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
              onSwitch={(tokenSection, tokenItem, chainSection, chainItem) => {
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
          ) : (
            displayButton && (
              <Button
                className="bg-fuse-black text-white px-4 mt-6 py-4 rounded-full font-medium md:text-sm "
                onClick={() => {
                  if (!wallet) return;
                  if (!amount) return;
                  if (parseFloat(balanceSlice.approval) < parseFloat(amount)) {
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
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].tokens[depositSelectedTokenItem].address,
                            amount: amount,
                            bridge:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].bridge,
                            decimals:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].tokens[depositSelectedTokenItem].decimals,
                            address: wallet.accounts[0].address,
                          })
                        );
                      else if (res && selected === 1)
                        dispatch(
                          increaseERC20Allowance({
                            contractAddress:
                              appConfig.wrappedBridge.wrapped.tokens[
                                withdrawSelectedTokenItem
                              ].address,
                            amount: amount,
                            bridge: appConfig.wrappedBridge.wrapped.address,
                            decimals:
                              appConfig.wrappedBridge.wrapped.tokens[
                                withdrawSelectedTokenItem
                              ].decimals,
                            address: wallet.accounts[0].address,
                          })
                        );
                    });
                  } else if (selected === 0) {
                    switchChain({
                      chainId:
                        "0x" +
                        appConfig.wrappedBridge.chains[
                          depositSelectedChainItem
                        ].chainId.toString(16),
                    }).then((res) => {
                      if (res)
                        dispatch(
                          bridgeOriginalTokens({
                            address: wallet.accounts[0].address,
                            amount: amount,
                            bridge:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].bridge,
                            contractAddress:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].tokens[depositSelectedTokenItem].address,
                            decimals:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].tokens[depositSelectedTokenItem].decimals,
                            srcChainId:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].lzChainId,
                            symbol:
                              appConfig.wrappedBridge.chains[
                                depositSelectedChainItem
                              ].tokens[depositSelectedTokenItem].symbol,
                          })
                        );
                    });
                  } else if (selected === 1) {
                    switchChain({
                      chainId: "0x7A",
                    }).then((res) => {
                      if (res)
                        dispatch(
                          bridgeWrappedTokens({
                            address: wallet.accounts[0].address,
                            amount: amount,
                            bridge: appConfig.wrappedBridge.wrapped.address,
                            contractAddress:
                              appConfig.wrappedBridge.wrapped.tokens[
                                withdrawSelectedTokenItem
                              ].address,
                            decimals:
                              appConfig.wrappedBridge.wrapped.tokens[
                                withdrawSelectedTokenItem
                              ].decimals,
                            chainId:
                              appConfig.wrappedBridge.chains[
                                withdrawSelectedChainItem
                              ].lzChainId,
                            symbol:
                              appConfig.wrappedBridge.wrapped.tokens[
                                withdrawSelectedTokenItem
                              ].symbol,
                          })
                        );
                    });
                  }
                }}
                disabled={
                  balanceSlice.isApprovalLoading ||
                  contractSlice.isBridgeLoading ||
                  contractSlice.isApprovalLoading ||
                  !amount ||
                  parseFloat(amount) === 0 ||
                  isNaN(parseFloat(amount))
                }
                text={
                  contractSlice.isBridgeLoading ||
                  contractSlice.isApprovalLoading
                    ? "Loading..."
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
            <span className="text-black/50">Daily Limits</span>
            <span>0.5 Min - 25,000,000 max</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-black/50">Bridge Fee</span>
            <span>Free</span>
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
