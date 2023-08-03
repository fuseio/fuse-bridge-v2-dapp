import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import chainReducer from "./chainSlice";
import balanceReducer from "./balanceSlice";
import contractReducer from "./contractSlice";
import transactionReducer from "./transactionsSlice";

const appReducer = combineReducers({
  chain: chainReducer,
  balance: balanceReducer,
  contract: contractReducer,
  transactions: transactionReducer,
});

export type AppState = CombinedState<{
  chain: ReturnType<typeof chainReducer>;
  balance: ReturnType<typeof balanceReducer>;
  contract: ReturnType<typeof contractReducer>;
  transactions: ReturnType<typeof transactionReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
