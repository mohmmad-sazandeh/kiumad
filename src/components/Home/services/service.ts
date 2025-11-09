import { setProducts } from "@/store/features/products/productsSlice";
import { product } from "@/store/features/products/types";
import { AppDispatch } from "@/store/types/store";

export const postAddWarehouse = async ({
  warehouse,
  dispatch,
  resetForm,
}: {
  warehouse: {
    name: string;
    Products: product[];
  };
  dispatch: AppDispatch;
  resetForm: () => void;
}) => {
  await fetch("/api/warehouse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(warehouse),
  })
    .then((res) => {
      alert("✅ بار جدید با موفقیت به انبار اضافه شد!");
      dispatch(setProducts([]));
      resetForm();
    })
    .catch((err) => {
      console.error(err);
      alert("❌ خطا در ثبت انبار!");
    });
};
