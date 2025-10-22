"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addProduct, updateProduct } from "./features/products/productsSlice";
import { PackageCheck, PlusCircle } from "lucide-react";
import { Product } from "./types/product";
import ProductModal from "./components/Modal/ProductModal";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.list);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    features: [],
    quantity: "",
    price: "",
    date: "",
  });

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, { key: "", value: "" }],
    }));
  };

  const handleFeatureChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newFeatures = [...form.features];
    newFeatures[index][field] = value;
    setForm({ ...form, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index),
    });
  };

  const handleCompleteNewLoad = async () => {
    if (!form.name || !form.quantity || !form.price) {
      alert("لطفاً حداقل نام، تعداد و قیمت محصول را وارد کنید!");
      return;
    }

    const newProduct: Product = {
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

      if (!res.ok) {
        throw new Error("خطا در ذخیره محصول!");
      }

      alert("محصول با موفقیت ثبت شد!");

      setForm({
        id: "",
        name: "",
        description: "",
        features: [],
        quantity: "",
        price: "",
        date: "",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("خطا در ثبت محصول!");
    }
  };

  const handleEditProduct = (index: number) => {
    setForm(products[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  console.log(products);

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
              setForm({
                id: "",
                name: "",
                description: "",
                features: [],
                quantity: "",
                price: "",
                date: "",
              });
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
          onSubmit={(formData: Product) => {
            if (editingIndex !== null) {
              dispatch(updateProduct({ index: editingIndex, data: formData }));
            } else {
              dispatch(addProduct({ ...formData, id: Date.now().toString() }));
            }
            setEditingIndex(null);
            setShowModal(false);
          }}
          form={form}
          setForm={setForm}
          editingIndex={editingIndex}
          addFeature={addFeature}
          handleFeatureChange={handleFeatureChange}
          removeFeature={removeFeature}
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
