export interface Feature {
  key: string;
  value: string;
}

export interface product {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  quantity: string;
  price: string;
  date: string;
}

export interface productsState {
  warehouseDateTime : string,
  nameWarehouse : string,
  list: product[];
  form: product;
}
