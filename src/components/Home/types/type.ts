import { product } from "@/store/features/products/types";

export interface PropsProductCard {
  product: product;
  index: number;
  onEdit: (index: number) => void;
}

export interface PropsProductModal {
  onClose: () => void;
  onSubmit: (form: product) => void;
  editingIndex: number | null;
}

export type updateFormProductFn = <T extends keyof product>(
  field: T,
  value: product[T]
) => void;
