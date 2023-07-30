import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cross from "../../assets/cross.svg";

interface TransactionProps {
  delegators?: Array<Array<string>> | undefined;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  isLoading?: boolean;
}

const Transactions = ({
  isOpen,
  onToggle,
  isLoading = false,
}: TransactionProps): JSX.Element => {
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-bg") {
        onToggle(false);
      }
    });
  }, [onToggle]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, right: "-100%" }}
            animate={{ opacity: 1, right: "0%" }}
            exit={{ opacity: 0, right: "-100%" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-white h-screen w-[50%] right-0 absolute p-6"
          >
            <img
              src={cross}
              alt="cross"
              className="h-10 bg-modal-bg p-1 rounded-md cursor-pointer"
              onClick={() => {
                onToggle(false);
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Transactions;
