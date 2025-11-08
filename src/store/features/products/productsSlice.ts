import { createSlice } from "@reduxjs/toolkit";
import { productsinitialState } from "./state";
import { productReducers } from "./reducers";

const productsSlice = createSlice({
  name: "products",
  initialState: productsinitialState,
  reducers: {
    ...productReducers,
  },
});

export const {
  addProduct,
  removeProduct,
  setProducts,
  updateProduct,
  updateFormProductField,
  clearProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
