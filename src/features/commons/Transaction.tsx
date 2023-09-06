import React from "react";
import right from "../../assets/right.svg";
import { MessageStatus } from "@layerzerolabs/scan-client";
import {
  getEstimatedTransactionTime,
  getNetworkByChainKey,
  getScanLink,
} from "@layerzerolabs/ui-core";
import { getChainKey } from "@layerzerolabs/lz-sdk";
import { TransactionType } from "../../store/transactionsSlice";
import Pill from "./Pill";
import info from "../../assets/info.svg";

const Transaction = ({
  transaction,
  transactionHashes,
}: {
  transaction: MessageStatus;
  transactionHashes: TransactionType;
}) => {
  return (
    <div
      className="flex flex-col px-10 py-5 bg-transaction-bg w-full rounded-md mt-3 border-border-gray border-solid border font-medium cursor-pointer text-sm"
      onClick={() => {
        window.open(
          getScanLink(transactionHashes.srcChainId, transactionHashes.hash),
          "_blank"
        );
      }}
    >
      <div className="flex w-full justify-between">
        <div className="flex w-[25%] justify-between">
          <span>
            {
              getNetworkByChainKey(getChainKey(transactionHashes.srcChainId))
                .name
            }
          </span>
          <img src={right} alt="right" className="h-3" />
          <span>
            {
              getNetworkByChainKey(getChainKey(transactionHashes.dstChainId))
                .name
            }
          </span>
        </div>
        <span className="w-[15%] flex justify-center text-right">
          {transactionHashes.amount}
        </span>
        <span className="w-[15%] flex justify-center">
          {new Date(transactionHashes.timestamp).toLocaleDateString()}
        </span>
        <Pill
          text={
            transaction === MessageStatus.DELIVERED
              ? "Complete"
              : transaction === MessageStatus.INFLIGHT
              ? "Finishing"
              : "Failed"
          }
          type={
            transaction === MessageStatus.DELIVERED
              ? "success"
              : transaction === MessageStatus.INFLIGHT
              ? "warning"
              : "error"
          }
        />
      </div>
      {transaction === MessageStatus.INFLIGHT && (
        <div className="flex rounded-md px-3 py-[6px] bg-[#E9E9E9] mt-2 items-center mr-auto">
          <img src={info} alt="info" className="h-3 mr-2" />
          <span className="text-xs flex">
            Expected transaction completion time:{" "}
            <p className="font-semibold ml-1">
              {(
                getEstimatedTransactionTime(transactionHashes.srcChainId) / 60
              ).toFixed(1) + " min"}
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Transaction;
