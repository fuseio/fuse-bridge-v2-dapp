import React from "react";
import right from "../../assets/right.svg";
import { MessageStatus } from "@layerzerolabs/scan-client";
import { getNetworkByChainKey, getScanLink } from "@layerzerolabs/ui-core";
import { getChainKey } from "@layerzerolabs/lz-sdk";
import { TransactionType } from "../../store/transactionsSlice";
import Pill from "./Pill";

const Transaction = ({
  transaction,
  transactionHashes,
}: {
  transaction: MessageStatus;
  transactionHashes: TransactionType;
}) => {
  return (
    <div
      className="flex justify-between px-10 py-5 bg-transaction-bg w-full rounded-md mt-3 border-border-gray border-solid border font-medium cursor-pointer"
      onClick={() => {
        window.open(
          getScanLink(transactionHashes.srcChainId, transactionHashes.hash),
          "_blank"
        );
      }}
    >
      <div className="flex w-[25%] justify-between">
        <span>
          {getNetworkByChainKey(getChainKey(transactionHashes.srcChainId)).name}
        </span>
        <img src={right} alt="right" />
        <span>
          {getNetworkByChainKey(getChainKey(transactionHashes.dstChainId)).name}
        </span>
      </div>
      <span>{transactionHashes.amount}</span>
      <span>{new Date(transactionHashes.timestamp).toLocaleDateString()}</span>
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
  );
};

export default Transaction;
