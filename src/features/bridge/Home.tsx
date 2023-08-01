import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../commons/ConnectWallet";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Footer from "../commons/Footer";
import history from "../../assets/history.svg";
import Transactions from "../commons/Transactions";
import { useSetChain } from "@web3-onboard/react";
import { appConfig } from "../../constants/config";

const Home = () => {
  const [{ connectedChain }, setChain] = useSetChain();
  const [selected, setSelected] = useState(0);
  const [depositSelectedChainSection, setDepositSelectedChainSection] =
    useState(0);
  const [depositSelectedChainItem, setDepositSelectedChainItem] = useState(0);
  const [depositSelectedTokenSection, setDepositSelectedTokenSection] =
    useState(0);
  const [depositSelectedTokenItem, setDepositSelectedTokenItem] = useState(0);

  const [withdrawSelectedChainSection, setWithdrawSelectedChainSection] =
    useState(0);
  const [withdrawSelectedChainItem, setWithdrawSelectedChainItem] = useState(0);
  const [withdrawSelectedTokenSection, setWithdrawSelectedTokenSection] =
    useState(0);
  const [withdrawSelectedTokenItem, setWithdrawSelectedTokenItem] = useState(0);

  const filters = ["Deposit", "Withdraw"];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Transactions isOpen={isOpen} onToggle={setIsOpen} />
      <div className="w-full bg-light-gray flex flex-col items-center h-[90%]">
        <motion.div className="flex bg-white w-[30%] mt-8 rounded-lg px-8 pt-8 pb-9 flex-col">
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
                    if (index === 1) {
                      setChain({
                        chainId: "0x7A",
                      });
                    } else {
                      setChain({
                        chainId:
                          "0x" +
                          appConfig.wrappedBridge.chains[
                            withdrawSelectedChainItem
                          ].chainId.toString(16),
                      });
                    }
                    setSelected(index);
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
                if (connectedChain)
                  setChain({
                    chainId: "0x7A",
                  });
              }}
            />
          ) : (
            <Withdraw
              selectedChainItem={withdrawSelectedChainItem}
              selectedChainSection={withdrawSelectedChainSection}
              setSelectedChainItem={setWithdrawSelectedChainItem}
              setSelectedChainSection={setWithdrawSelectedChainSection}
              selectedTokenItem={depositSelectedTokenItem}
              selectedTokenSection={depositSelectedTokenSection}
              setSelectedTokenItem={setDepositSelectedTokenItem}
              setSelectedTokenSection={setDepositSelectedTokenSection}
              onSwitch={(tokenSection, tokenItem, chainSection, chainItem) => {
                setDepositSelectedChainSection(chainSection);
                setDepositSelectedChainItem(chainItem);
                setDepositSelectedTokenSection(tokenSection);
                setDepositSelectedTokenItem(tokenItem);
                setSelected(0);
                if (connectedChain)
                  setChain({
                    chainId:
                      "0x" +
                      appConfig.wrappedBridge.chains[
                        withdrawSelectedChainItem
                      ].chainId.toString(16),
                  });
              }}
            />
          )}
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
        <Footer />
      </div>
    </>
  );
};

export default Home;
