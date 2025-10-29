import { productsState } from "./types";

export const productsinitialState: productsState = {
  list: [],
  form: {
    id: "",
    name: "",
    description: "",
    features: [],
    quantity: "",
    price: "",
    date: "",
  },
};
