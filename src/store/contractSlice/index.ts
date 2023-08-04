import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";
import { increaseAllowance } from "../../utils/erc20";
import { ethers } from "ethers";
import { AsyncThunkRejectedActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { fetchApproval, fetchBalance } from "../balanceSlice";
import { bridgeOriginal } from "../../utils/originalBridge";
import { bridgeWrapped } from "../../utils/wrappedBridge";
import { insertTransactionToLocalStorage } from "../../utils/helpers";
import { updateTransactions } from "../transactionsSlice";

export interface ContractStateType {
  isBridgeLoading: boolean;
  isApprovalLoading: boolean;
  isError: boolean;
}

const INIT_STATE: ContractStateType = {
  isBridgeLoading: false,
  isApprovalLoading: false,
  isError: false,
};

export const increaseERC20Allowance = createAsyncThunk(
  "CONTRACT/INCREASE_ALLOWANCE",
  async (
    {
      amount,
      contractAddress,
      bridge,
      decimals = 18,
      address,
    }: {
      amount: string;
      contractAddress: string;
      bridge: string;
      decimals: number;
      address: string;
    },
    thunkAPI
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      increaseAllowance(contractAddress, bridge, amount, decimals)
        .then((txHash) => {
          thunkAPI.dispatch(
            fetchApproval({
              contractAddress,
              address,
              spender: bridge,
              decimals,
            })
          );
          resolve(txHash);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const bridgeOriginalTokens = createAsyncThunk(
  "CONTRACT/BRIDGE_ORIGINAL",
  async (
    {
      amount,
      contractAddress,
      bridge,
      decimals = 18,
      address,
      srcChainId,
      symbol,
    }: {
      amount: string;
      contractAddress: string;
      bridge: string;
      decimals: number;
      address: string;
      srcChainId: number;
      symbol: string;
    },
    thunkAPI
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      bridgeOriginal(bridge, address, contractAddress, amount, decimals)
        .then((txHash) => {
          thunkAPI.dispatch(
            fetchBalance({
              address,
              bridge,
              contractAddress,
              decimals,
            })
          );
          insertTransactionToLocalStorage({
            hash: txHash,
            srcChainId,
            address,
            amount: amount + " " + symbol,
            timestamp: Date.now(),
          });
          thunkAPI.dispatch(
            updateTransactions({
              hash: txHash,
              srcChainId,
              address,
              amount: amount + " " + symbol,
              timestamp: Date.now(),
            })
          );
          resolve(txHash);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

export const bridgeWrappedTokens = createAsyncThunk(
  "CONTRACT/BRIDGE_WRAPPED",
  async (
    {
      amount,
      contractAddress,
      bridge,
      decimals = 18,
      address,
      chainId,
      symbol,
    }: {
      amount: string;
      contractAddress: string;
      bridge: string;
      decimals: number;
      address: string;
      chainId: number;
      symbol: string;
    },
    thunkAPI
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      bridgeWrapped(bridge, address, contractAddress, amount, decimals, chainId)
        .then((txHash) => {
          thunkAPI.dispatch(
            fetchBalance({
              address,
              bridge,
              contractAddress,
              decimals,
            })
          );
          insertTransactionToLocalStorage({
            hash: txHash,
            srcChainId: 138,
            address,
            amount: amount + " " + symbol,
            timestamp: Date.now(),
          });
          thunkAPI.dispatch(
            updateTransactions({
              hash: txHash,
              srcChainId: 138,
              address,
              amount: amount + " " + symbol,
              timestamp: Date.now(),
            })
          );
          resolve(txHash);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const contractSlice = createSlice({
  name: "CONTRACT_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: {
    [increaseERC20Allowance.pending.type]: (state) => {
      state.isApprovalLoading = true;
    },
    [increaseERC20Allowance.fulfilled.type]: (state) => {
      state.isApprovalLoading = false;
    },
    [increaseERC20Allowance.rejected.type]: (state) => {
      state.isApprovalLoading = false;
      state.isError = true;
    },
    [bridgeOriginalTokens.pending.type]: (state) => {
      state.isBridgeLoading = true;
    },
    [bridgeOriginalTokens.fulfilled.type]: (state) => {
      state.isBridgeLoading = false;
    },
    [bridgeOriginalTokens.rejected.type]: (state) => {
      state.isBridgeLoading = false;
      state.isError = true;
    },
    [bridgeWrappedTokens.pending.type]: (state) => {
      state.isBridgeLoading = true;
    },
    [bridgeWrappedTokens.fulfilled.type]: (state) => {
      state.isBridgeLoading = false;
    },
    [bridgeWrappedTokens.rejected.type]: (state) => {
      state.isBridgeLoading = false;
      state.isError = true;
    },
  },
});

export const selectContractSlice = (state: AppState): ContractStateType =>
  state.contract;

export default contractSlice.reducer;
