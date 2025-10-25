import store from "../store";
import { productsState } from "../features/products/types";

export interface RootState {
  products: productsState;
}

export type AppDispatch = typeof store.dispatch;
