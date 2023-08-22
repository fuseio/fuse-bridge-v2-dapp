import React from "react";
import LastTransactionToast from "./LastTransactionToast";
import { useAppSelector } from "../../store/store";
import { selectToastSlice } from "../../store/toastSlice";

const ToastPane = () => {
  const toastSlice = useAppSelector(selectToastSlice);
  return (
    <div className="absolute translate-x-[530px] flex flex-col pt-8 justify-start items-center">
      {toastSlice.isLastTransactionToastOpen && <LastTransactionToast />}
    </div>
  );
};

export default ToastPane;
