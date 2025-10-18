"use client";

import { useState } from "react";

interface Feature {
  key: string;
  value: string;
}

interface Product {
  name: string;
  description: string;
  features: Feature[];
  quantity: string;
  price: string;
  date: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    features: [],
    quantity: "",
    price: "",
    date: "",
  });

  // افزودن ویژگی جدید
  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { key: "", value: "" }],
    });
  };

  // حذف ویژگی
  const removeFeature = (index: number) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  // تغییر ویژگی
  const handleFeatureChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...form.features];
    updated[index][field] = value;
    setForm({ ...form, features: updated });
  };

  // فرمت خودکار تاریخ (۱۴۰۳۰۷۲۵ → ۱۴۰۳/۰۷/۲۵)
  const handleDateInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 4 && digits.length <= 6)
      formatted = `${digits.slice(0, 4)}/${digits.slice(4)}`;
    else if (digits.length > 6)
      formatted = `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`;

    setForm({ ...form, date: formatted });
  };

  // افزودن یا ویرایش محصول
  const handleAddOrEditProduct = () => {
    if (!form.name || !form.quantity || !form.price) return;

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = form;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([{ ...form }, ...products]);
    }

    setForm({
      name: "",
      description: "",
      features: [],
      quantity: "",
      price: "",
      date: "",
    });
    setShowModal(false);
  };

  // ویرایش محصول
  const handleEditProduct = (index: number) => {
    setForm(products[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 p-8" dir="rtl">
      {/* هدر */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">اضافه کردن بار جدید</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setForm({
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
            className="border border-gray-700 rounded-md px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            اضافه کردن محصول
          </button>
          <button className="border border-gray-700 rounded-md px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition">
            تکمیل شدن بار جدید
          </button>
        </div>
      </div>

      {/* کارت محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-right">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-4 shadow-lg relative group max-w-[500px]"
          >
            <p className="font-bold">نام محصول : <span className="font-normal">{p.name}</span></p>
            <p className="font-bold">تاریخ : <span className="font-normal">{p.date || "بدون تاریخ"}</span></p>
            <p className="font-bold">تعداد : <span className="font-normal">{p.quantity}</span></p>
            <p className="font-bold">قیمت : <span className="font-normal">{p.price} ریال</span></p>

            {p.features.length > 0 && (
              <div className="mt-2">
                <p className="font-bold text-sm mb-1">ویژگی‌ها :</p>
                <ul className="text-sm list-disc pr-4 text-gray-300">
                  {p.features.map((f, fi) => (
                    <li key={fi}>
                      {f.key}: {f.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.description && (
              <p className="mt-2 text-sm text-gray-400">{p.description}</p>
            )}

            {/* دکمه‌های حذف و ویرایش */}
            <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => handleEditProduct(i)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                ✏️
              </button>
              <button
                onClick={() => setProducts(products.filter((_, idx) => idx !== i))}
                className="text-red-500 hover:text-red-400"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مودال */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-xl shadow-lg w-[450px] max-w-[95%] p-5 space-y-4 relative animate-scaleUp">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-lg font-bold text-center mb-2">
              {editingIndex !== null ? "ویرایش محصول" : "اضافه کردن محصول جدید"}
            </h2>

            <div>
              <label className="text-sm font-semibold">نام محصول :</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">توضیحات :</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 mt-1 h-20 resize-none"
              />
            </div>

            {/* ویژگی‌ها */}
            <div className="border border-gray-300 rounded-md p-3 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm">ویژگی‌ها :</label>
                <button
                  onClick={addFeature}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                >
                  +
                </button>
              </div>

              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="نام ویژگی"
                    value={f.key}
                    onChange={(e) =>
                      handleFeatureChange(i, "key", e.target.value)
                    }
                    className="border border-gray-300 bg-white text-gray-900 rounded-md px-2 py-1 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="مقدار"
                    value={f.value}
                    onChange={(e) =>
                      handleFeatureChange(i, "value", e.target.value)
                    }
                    className="border border-gray-300 bg-white text-gray-900 rounded-md px-2 py-1 w-1/2"
                  />
                  <button
                    onClick={() => removeFeature(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold">تعداد :</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">قیمت (ریال) :</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 mt-1"
                />
              </div>
            </div>

            {/* تاریخ */}
            <div>
              <label className="text-sm font-semibold">تاریخ :</label>
              <input
                type="text"
                placeholder="مثلاً ۱۴۰۳/۰۷/۲۵"
                value={form.date}
                onChange={(e) => handleDateInput(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-md px-3 py-2 mt-1 placeholder-gray-400 text-left tracking-wider"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                بستن
              </button>
              <button
                onClick={handleAddOrEditProduct}
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-500"
              >
                {editingIndex !== null ? "ذخیره تغییرات" : "افزودن محصول"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s ease-in-out;
        }
      `}</style>
    </div>
  );
}


