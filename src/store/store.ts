import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { RootState } from "./types/store";
import productsSlice from "./features/products/productsSlice";

const appReducer = combineReducers({
  products: productsSlice,
});

const rootReducer = (state: RootState | undefined, action: PayloadAction) => {
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
