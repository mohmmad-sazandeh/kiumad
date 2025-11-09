import { setProducts } from "@/store/features/products/productsSlice";
import { product } from "@/store/features/products/types";
import { AppDispatch } from "@/store/types/store";

interface Warehouse {
  name: string;
  dateTime: string;
  Products: product[];
}

export const postAddWarehouse = async ({
  warehouse,
  dispatch,
  resetForm,
}: {
  warehouse: Warehouse;
  dispatch: AppDispatch;
  resetForm: () => void;
}) => {
  try {
    const res = await fetch("/api/warehouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouse),
    });

    if (!res.ok) throw new Error("خطا در ثبت انبار!");

    alert("✅ بار جدید با موفقیت به انبار اضافه شد!");
    dispatch(setProducts([]));
    resetForm();
  } catch (err) {
    console.error(err);
    alert("❌ خطا در ثبت انبار!");
  }
};
