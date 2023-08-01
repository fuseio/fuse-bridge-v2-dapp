import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import chainReducer from "./chainSlice";
import balanceReducer from "./balanceSlice";

const appReducer = combineReducers({
  chain: chainReducer,
  balance: balanceReducer,
});

export type AppState = CombinedState<{
  chain: ReturnType<typeof chainReducer>;
  balance: ReturnType<typeof balanceReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
