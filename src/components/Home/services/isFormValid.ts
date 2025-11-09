import { product } from "@/store/features/products/types";

export const isFormValid = (form: product) =>
  form.name.trim() !== "" &&
  form.price.trim() !== "" &&
  form.quantity.toString().trim() !== "" &&
  form.features.every(
    (f: { key: string; value: string }) =>
      f.key.trim() !== "" && f.value.trim() !== ""
  );
