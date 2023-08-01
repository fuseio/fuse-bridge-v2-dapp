import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../rootReducer";

export interface ChainStateType {
  lzChainId: number;
  chainId: number;
  name: string;
  icon: string;
  bridge: string | undefined;
  tokens:
    | {
        decimals: number;
        symbol: string;
        name: string;
        address: string;
        icon: string;
      }[];
}

const INIT_STATE: ChainStateType = {
  lzChainId: 0,
  chainId: 0,
  name: "",
  icon: "",
  bridge: "",
  tokens: [],
};

const chainSlice = createSlice({
  name: "CHAIN_STATE",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: {
    setChain: (state, action: PayloadAction<ChainStateType>) => {
      state = action.payload;
    },
  },
});

export const selectChainSlice = (state: AppState): ChainStateType =>
  state.chain;

export default chainSlice.reducer;
