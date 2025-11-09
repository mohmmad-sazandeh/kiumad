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
  setWarehouseDateTime,
  setNameWarehouse,
  addProduct,
  removeProduct,
  setProducts,
  updateProduct,
  updateFormProductField,
} = productsSlice.actions;
export default productsSlice.reducer;
