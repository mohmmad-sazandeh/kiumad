import { product } from "@/store/features/products/types";

export interface PropsProductCard {
  product: product;
  index: number;
  onEdit: (index: number) => void;
}

export interface PropsProductModal {
  onClose: () => void;
  onSubmit: (form: product) => void;
  onChangeForm: updateFormProductFn;
  editingIndex: number | null;
  addFeature: () => void;
  handleFeatureChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  removeFeature: (index: number) => void;
}

export type updateFormProductFn = <T extends keyof product>(
  field: T,
  value: product[T]
) => void;
