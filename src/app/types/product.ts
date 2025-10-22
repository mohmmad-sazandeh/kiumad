export interface Feature {
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
