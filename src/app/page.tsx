
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
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    features: [],
    quantity: "",
    price: "",
    date: "",
  });

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { key: "", value: "" }],
    });
  };

  const removeFeature = (index: number) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  const handleFeatureChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...form.features];
    updated[index][field] = value;
    setForm({ ...form, features: updated });
  };

  const handleAddProduct = () => {
    if (!form.name || !form.quantity || !form.price) return;
    setProducts([{ ...form }, ...products]);
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

  return (
    <div className="min-h-screen bg-gray-200 text-white p-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-black">اضافه کردن بار جدید</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-800 bg-gray-800"
          >
            اضافه کردن محصول
          </button>
          <button className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-800 bg-gray-800">
            تکمیل شدن بار جدید
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-right">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md relative group"
          >
            <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{p.date || "بدون تاریخ"}</p>
            <p>تعداد: {p.quantity}</p>
            <p>قیمت: {p.price} ریال</p>

            {p.features.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-sm mb-1">ویژگی‌ها:</p>
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

            <button
              onClick={() => setProducts(products.filter((_, idx) => idx !== i))}
              className="absolute top-2 left-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-xl shadow-lg w-[500px] max-w-[95%] p-6 space-y-4 relative animate-scaleUp">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            <h2 className="text-lg font-bold text-center mb-2">
              اضافه کردن محصول جدید
            </h2>

            <div>
              <label className="text-sm font-medium">نام محصول</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">توضیحات</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 h-20 resize-none"
              />
            </div>

            <div className="border border-gray-300 rounded-md p-3 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-medium text-sm">ویژگی‌ها</label>
                <button
                  onClick={addFeature}
                  className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
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
                    className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="مقدار"
                    value={f.value}
                    onChange={(e) =>
                      handleFeatureChange(i, "value", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
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
                <label className="text-sm font-medium">تعداد</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">قیمت (ریال)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                بستن
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800"
              >
                اضافه کردن
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
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
