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

interface Warehouse {
  id: string;
  name: string;
  dateTime: string;
  Products: Product[];
}

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // گرفتن لیست انبارها
  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/warehouse");
      const data = await res.json();

      const warehousesWithId: Warehouse[] = (data.Warehouses || []).map(
        (w: any, idx: number) => ({
          id: w.id || `${w.name}-${idx}`,
          name: w.name,
          dateTime: w.dateTime,
          Products: w.Products || [],
        })
      );

      setWarehouses(warehousesWithId);
    } catch (err) {
      console.error("خطا در گرفتن انبارها:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleWarehouseChange = (id: string) => {
    const warehouse = warehouses.find((w) => w.id === id) || null;
    setSelectedWarehouse(warehouse);
    setProducts(warehouse?.Products || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید می‌خواهید این محصول را حذف کنید؟")) return;

    try {
      const res = await fetch(`/api/warehouses?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("خطا در حذف محصول");

      if (selectedWarehouse) {
        const updatedProducts = selectedWarehouse.Products.filter(
          (p) => p.id !== id
        );
        setSelectedWarehouse({
          ...selectedWarehouse,
          Products: updatedProducts,
        });
        setProducts(updatedProducts);
      }

      alert("✅ محصول با موفقیت حذف شد!");
    } catch (err) {
      console.error(err);
      alert("❌ خطا در حذف محصول!");
    }
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-gray-900" dir="rtl">
      <h1 className="text-3xl text-white font-bold mb-6">انبار</h1>

      <div className="mb-6">
        <label className="text-white font-semibold mr-3 ml-4">
          انتخاب انبار:
        </label>
        <select
          value={selectedWarehouse?.id || ""}
          onChange={(e) => handleWarehouseChange(e.target.value)}
          className="w-full sm:w-auto rounded-lg bg-gray-700 text-white px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="" className="text-gray-300">
            لطفاً انبار را انتخاب کنید
          </option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id} className="text-black">
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-white">در حال بارگذاری...</div>
      ) : selectedWarehouse ? (
        products.length === 0 ? (
          <div className="shadow-md rounded-lg p-6 bg-gray-800 text-white">
            هیچ محصولی در این انبار موجود نیست.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative border border-gray-700 rounded-xl bg-gray-800 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative z-10 space-y-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    نام محصول: {p.name}
                  </h3>
                  <p className="text-gray-300">توضیحات: {p.description}</p>
                  <p className="text-gray-300">تعداد: {p.quantity}</p>
                  <p className="text-gray-300 font-medium">
                    قیمت: <span className="text-green-500">{p.price} ریال</span>
                  </p>
                  <p className="text-gray-300 font-medium">
                    تاریخ: <span className="text-green-500">{p.date}</span>
                  </p>
                  <p className="text-gray-300 font-medium">
                    ویژگی‌ها:{" "}
                    <span className="text-green-500">
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
        )
      ) : (
        <div className="text-white mt-4">لطفاً یک انبار را انتخاب کنید</div>
      )}
    </div>
  );
}
