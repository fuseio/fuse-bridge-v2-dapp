import React from "react";
import historyPurple from "../../assets/historyPurple.svg";
import dismiss from "../../assets/dismiss.svg";
import right from "../../assets/right.svg";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTransactionsSlice } from "../../store/transactionsSlice";
import { MessageStatus } from "@layerzerolabs/scan-client";
import { getNetworkByChainKey, getScanLink } from "@layerzerolabs/ui-core";
import { getChainKey } from "@layerzerolabs/lz-sdk";
import { TransactionType } from "../../store/transactionsSlice";
import Pill from "./Pill";
import { toggleLastTransactionToast } from "../../store/toastSlice";

const LastTransactionToast = () => {
  const transactionsSlice = useAppSelector(selectTransactionsSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="w-[400px] bg-white rounded-md border-[#8054FF66]/40 border-[1px]">
      <div className="flex p-4">
        <img src={historyPurple} alt="history" className="h-6 w-1/10" />
        <div className="flex flex-col w-9/10 ml-3">
          <div className="flex items-center justify-between">
            <p className="font-bold">Your last transaction</p>
            <img
              src={dismiss}
              alt="dismiss"
              className="h-5 cursor-pointer"
              onClick={() => {
                dispatch(toggleLastTransactionToast(false));
              }}
            />
          </div>
          <p className="text-sm text-secondary-gray mt-3">From</p>
          <div className="flex font-medium mt-1">
            <span>
              {
                getNetworkByChainKey(
                  getChainKey(transactionsSlice.transactionHashes[0].srcChainId)
                ).name
              }
            </span>
            <img src={right} alt="right" className="ml-2" />
            <span className="ml-2">
              {
                getNetworkByChainKey(
                  getChainKey(transactionsSlice.transactionHashes[0].dstChainId)
                ).name
              }
            </span>
          </div>
          <div className="flex text-sm text-secondary-gray mt-3">
            <div className="flex flex-col w-1/2">
              <p>Amount</p>
              <p className="font-medium text-black mt-1">
                {transactionsSlice.transactionHashes[0].amount}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mb-1">Status</p>
              <Pill
                text={
                  transactionsSlice.transactions[0] === MessageStatus.DELIVERED
                    ? "Complete"
                    : transactionsSlice.transactions[0] ===
                      MessageStatus.INFLIGHT
                    ? "Finishing"
                    : "Failed"
                }
                type={
                  transactionsSlice.transactions[0] === MessageStatus.DELIVERED
                    ? "success"
                    : transactionsSlice.transactions[0] ===
                      MessageStatus.INFLIGHT
                    ? "warning"
                    : "error"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastTransactionToast;
