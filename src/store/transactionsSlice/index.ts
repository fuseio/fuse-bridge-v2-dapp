import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { increaseAllowance } from "../../utils/erc20";
import { ethers } from "ethers";
import { AsyncThunkRejectedActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { fetchApproval, fetchBalance } from "../balanceSlice";
import { bridgeOriginal } from "../../utils/originalBridge";
import { bridgeWrapped } from "../../utils/wrappedBridge";

export interface TransactionsStateType {
  isTransactionLoading: boolean;
  isError: boolean;
  transactions: {
    hash: string;
    blockNumber: number;
  }[];
}

const INIT_STATE: TransactionsStateType = {
  isTransactionLoading: false,
  isError: false,
  transactions: [],
};

export const fetchBridgeTransactions = createAsyncThunk(
  "TRANSACTIONS/FETCH_TRANSACTIONS",
  async (
    {
      contractAddress,
      address,
      rpcUrl,
    }: {
      contractAddress: string;
      address: string;
      rpcUrl: string;
    },
    thunkAPI
  ) => {
    return new Promise<any>(async (resolve, reject) => {});
  }
);

const transactionsSlice = createSlice({
  name: "TRANSACTION_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: {
    [fetchBridgeTransactions.pending.type]: (state) => {
      state.isTransactionLoading = true;
    },
    [fetchBridgeTransactions.fulfilled.type]: (state, action) => {
      let transactions = state.transactions;
      transactions.concat(action.payload);
      transactions.sort((a, b) => {
        return a.blockNumber - b.blockNumber;
      });
      state.transactions = transactions;
      console.log("transactions", transactions);
      state.isTransactionLoading = false;
    },
    [fetchBridgeTransactions.rejected.type]: (state) => {
      state.isTransactionLoading = false;
      state.isError = true;
    },
  },
});

export const selectTransactionsSlice = (
  state: AppState
): TransactionsStateType => state.transactions;

export default transactionsSlice.reducer;
