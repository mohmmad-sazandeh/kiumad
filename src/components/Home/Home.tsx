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
import ProductModal from "./components/ProductModal";
import ProductCard from "./components/ProductCard";
import { updateFormProductFn } from "./types/type";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list: products, form } = useAppSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onChangeForm: updateFormProductFn = (field, value) => {
    dispatch(updateFormProductField({ field, value }));
  };

  const resetForm = () => {
    const emptyForm = {
      id: "",
      name: "",
      description: "",
      features: [],
      quantity: "",
      price: "",
      date: "",
    };
    (Object.keys(emptyForm) as (keyof typeof emptyForm)[]).forEach((key) =>
      onChangeForm(key, emptyForm[key])
    );
  };

  const handleFeatureChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newFeatures = [...form.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChangeForm("features", newFeatures);
  };

  const handleCompleteNewLoad = async () => {
    if (!form.name || !form.quantity || !form.price) {
      alert("لطفاً حداقل نام، تعداد و قیمت محصول را وارد کنید!");
      return;
    }

    const newProduct: product = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      features: form.features,
      quantity: form.quantity,
      price: form.price,
      date: form.date,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("خطا در ذخیره محصول!");

      alert("محصول با موفقیت ثبت شد!");
      resetForm();
      dispatch(addProduct(newProduct));
    } catch (error) {
      console.error(error);
      alert("خطا در ثبت محصول!");
    }
  };

  const handleEditProduct = (index: number) => {
    for (const [key, value] of Object.entries(products[index]) as [
      keyof product,
      product[keyof product]
    ][]) {
      onChangeForm(key, value);
    }
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-700 min-h-screen font-sans pb-10">
      <div className="px-7 flex justify-between gap-4">
        <div className="flex gap-x-3">
          <button
            onClick={handleCompleteNewLoad}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2.5 rounded-xl font-medium shadow-md"
          >
            <PackageCheck className="w-3 h-5" /> تکمیل شدن بار جدید
          </button>

          <button
            onClick={() => {
              resetForm();
              setEditingIndex(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-2.5 rounded-xl font-medium shadow-md"
          >
            <PlusCircle className="w-3 h-5" />
            افزودن بار جدید
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal
          onClose={() => setShowModal(false)}
          onSubmit={(formData: product) => {
            if (editingIndex !== null) {
              dispatch(updateProduct({ index: editingIndex, data: formData }));
            } else {
              dispatch(addProduct({ ...formData, id: Date.now().toString() }));
            }
            setEditingIndex(null);
            setShowModal(false);
          }}
          onChangeForm={onChangeForm}
          editingIndex={editingIndex}
          addFeature={() =>
            onChangeForm("features", [...form.features, { key: "", value: "" }])
          }
          handleFeatureChange={handleFeatureChange}
          removeFeature={(index) =>
            onChangeForm(
              "features",
              form.features.filter((_, i) => i !== index)
            )
          }
        />
      )}

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
