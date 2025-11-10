"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNameWarehouse } from "@/store/features/products/productsSlice";
import { RootState } from "@/store/types/store";
import { postAddWarehouse } from "../services/service";

interface WarehouseFormProps {
  onClose: () => void;
  products: any[];
  resetForm: () => void;
}

const WarehouseForm = ({
  onClose,
  products,
  resetForm,
}: WarehouseFormProps) => {
  const dispatch = useDispatch();
  const { nameWarehouse } = useSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const shamsiDate = now.toLocaleDateString("fa-IR");
    const time = now.toLocaleTimeString("fa-IR");
    setDateTime(`${shamsiDate} - ${time}`);
    dispatch(setNameWarehouse("انبار"));
  }, [dispatch]);

  const handleSubmit = async () => {
    if (products.length === 0) {
      alert("هیچ محصولی برای ارسال وجود ندارد!");
      return;
    }

    setLoading(true);
    await postAddWarehouse({
      warehouse: { name: nameWarehouse, dateTime, Products: products },
      dispatch,
      resetForm,
    });
    setLoading(false);
    onClose();
  };

  return (
    <div dir="rtl">
      <h2 className="text-lg font-bold text-center mb-3">🗃 افزودن به انبار</h2>

      <input
        type="text"
        value={nameWarehouse}
        onChange={(e) => dispatch(setNameWarehouse(e.target.value))}
        placeholder="نام انبار را وارد کنید..."
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />

      <div className="text-sm text-gray-500 text-center mt-1">{dateTime}</div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          انصراف
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {loading ? "در حال ثبت..." : "✅ ثبت انبار"}
        </button>
      </div>
    </div>
  );
};

export default WarehouseForm;
