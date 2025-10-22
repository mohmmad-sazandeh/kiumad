import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Feature {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  quantity: string;
  price: string;
  date: string;
}

interface ProductsState {
  list: Product[];
}

const initialState: ProductsState = {
  list: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ index: number; data: Product }>
    ) => {
      state.list[action.payload.index] = action.payload.data;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addProduct, updateProduct, removeProduct, setProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
