import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import chainReducer from "./chainSlice";

const appReducer = combineReducers({
  chain: chainReducer,
});

export type AppState = CombinedState<{
  chain: ReturnType<typeof chainReducer>;
}>;

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};

export default rootReducer;
