"use client";

import { useState } from "react";
import { PackageCheck, PlusCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addProduct,
  updateFormProductField,
  updateProduct,
} from "@/store/features/products/productsSlice";
import { product } from "@/store/features/products/types";
import CommonModal from "./components/ModalWrapper"; // ✅ مودال مشترک
import ProductCard from "./components/ProductCard";
import { updateFormProductFn } from "./types/type";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list: products, nameWarehouse } = useAppSelector(
    (state) => state.products
  );

  const [showProductModal, setShowProductModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onChangeForm: updateFormProductFn = (field, value) => {
    dispatch(updateFormProductField({ field, value }));
  };

  const resetForm = () => {
    const emptyForm: product = {
      id: "",
      name: "",
      description: "",
      features: [],
      quantity: "",
      price: "",
      date: "",
    };
    (Object.keys(emptyForm) as (keyof product)[]).forEach((key) =>
      onChangeForm(key, emptyForm[key])
    );
  };

  const handleOpenWarehouseModal = () => {
    if (products.length === 0) {
      alert("هیچ محصولی برای ارسال وجود ندارد!");
      return;
    }
    setShowWarehouseModal(true);
  };

  const handleEditProduct = (index: number) => {
    const prod = products[index];
    for (const [key, value] of Object.entries(prod) as [
      keyof product,
      product[keyof product]
    ][]) {
      onChangeForm(key, value);
    }
    setEditingIndex(index);
    setShowProductModal(true);
  };

  return (
    <div className="bg-gray-700 font-sans pb-10">
      <div className="px-7 flex justify-between gap-4">
        <div className="flex gap-x-3">
          <button
            onClick={handleOpenWarehouseModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2.5 rounded-xl font-medium shadow-md"
          >
            <PackageCheck className="w-3 h-5" /> تکمیل شدن بار جدید
          </button>

          <button
            onClick={() => {
              resetForm();
              setEditingIndex(null);
              setShowProductModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-2.5 rounded-xl font-medium shadow-md"
          >
            <PlusCircle className="w-3 h-5" />
            افزودن بار جدید
          </button>
        </div>
      </div>

      {/* ✅ مودال محصول */}
      <CommonModal
        type="product"
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingIndex(null);
        }}
        onSubmit={(formData: product) => {
          if (editingIndex !== null) {
            dispatch(updateProduct({ index: editingIndex, data: formData }));
          } else {
            dispatch(addProduct({ ...formData, id: Date.now().toString() }));
          }
          setEditingIndex(null);
          setShowProductModal(false);
        }}
        editingIndex={editingIndex}
      />

      {/* ✅ مودال انبار */}
      <CommonModal
        type="warehouse"
        isOpen={showWarehouseModal}
        onClose={() => setShowWarehouseModal(false)}
        products={products}
        resetForm={resetForm}
      />

      <div
        dir="rtl"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-right p-7"
      >
        {products.map((p, idx) => (
          <ProductCard
            key={p.id}
            product={p}
            index={idx}
            onEdit={handleEditProduct}
          />
        ))}
      </div>
    </div>
  );
}
