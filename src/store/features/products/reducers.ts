  import { PayloadAction } from "@reduxjs/toolkit";
  import { product, productsState } from "./types";

  export const productReducers = {

    setNameWarehouse : (state : productsState , action:PayloadAction<string>)=>{
      state.nameWarehouse = action.payload
    },

    setWarehouseDateTime: (state: productsState, action: PayloadAction<string>) => {
  state.warehouseDateTime = action.payload;
},

    addProduct: (state: productsState, action: PayloadAction<product>) => {
      state.list.push(action.payload);
    },
    updateProduct: (
      state: productsState,
      action: PayloadAction<{ index: number; data: product }>
    ) => {
      state.list[action.payload.index] = action.payload.data;
    },
    removeProduct: (state: productsState, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    setProducts: (state: productsState, action: PayloadAction<product[]>) => {
      state.list = action.payload;
    },
    updateFormProductField: <T extends keyof product>(
      state: productsState,
      action: PayloadAction<{ field: T; value: product[T] }>
    ) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
  };
