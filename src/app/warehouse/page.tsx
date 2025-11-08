"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
  features?: { key: string; value: string }[];
  quantity: string;
  price: string;
  date?: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.Products || []);
    } catch (error) {
      console.error("خطا در گرفتن داده‌ها:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید می‌خواهید این محصول را حذف کنید؟")) return;

    try {
      console;

      await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      fetchProducts();
      alert("محصول با موفقیت حذف شد!");
    } catch (error) {
      console.error(error);
      alert("خطا در حذف محصول!");
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="text-white p-6">
        در حال بارگذاری...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-gray-900 px-8" dir="rtl">
        <h1 className="text-2xl text-white font-bold mb-6">انبار</h1>
        <div className="shadow-md rounded-lg p-6 bg-gray-600 text-white">
          هیچ محصولی در انبار موجود نیست.
        </div>
      </div>
    );
  }
  console.log(products);

  return (
    <div className="text-gray-900 px-8" dir="rtl">
      <h1 className="text-2xl text-white font-bold mb-6">انبار</h1>
      <div className="shadow-md rounded-lg p-6 bg-gray-600">
        <p className="text-white">لیست محصولات</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative border border-gray-200 rounded-xl bg-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative z-10 space-y-2">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  نام محصول: {p.name}
                </h3>
                <p className="text-gray-600">توضیحات: {p.description}</p>
                <p className="text-gray-600">تعداد: {p.quantity}</p>
                <p className="text-gray-700 font-medium">
                  قیمت: <span className="text-green-600">{p.price} ریال</span>
                </p>
                <p className="text-gray-700 font-medium">
                  تاریخ: <span className="text-green-600">{p.date}</span>
                </p>
                <p className="text-gray-700 font-medium">
                  ویژگی‌ها:{" "}
                  <span className="text-green-600">
                    {p?.features?.map((f, idx) => (
                      <span key={idx} className="mr-2">
                        {f.key}: {f.value}
                      </span>
                    ))}
                  </span>
                </p>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  حذف محصول
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
