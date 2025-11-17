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
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

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

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/warehouse?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("خطا در حذف محصول!");

      await fetchWarehouses();
      if (selectedWarehouse) {
        const updated = warehouses.find((w) => w.id === selectedWarehouse.id) || null;
        setSelectedWarehouse(updated);
        setProducts(updated?.Products || []);
      }
      alert("✅ محصول با موفقیت حذف شد!");
    } catch (err) {
      console.error(err);
      alert("❌ خطا در حذف محصول!");
    }
  };

  return (
    <div className="px-8 py-4" dir="rtl">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-white font-bold">
          {selectedWarehouse ? `محصولات  ${selectedWarehouse.name}` : "انتخاب انبار"}
        </h1>
      </div>

      <div className="flex overflow-x-auto gap-4 mb-6 pb-3 scrollbar-thin scrollbar-thumb-gray-600">
        {warehouses.map((w) => (
          <button
            key={w.id}
            onClick={() => handleWarehouseChange(w.id)}
            className={`
              min-w-[220px] px-5 py-3 rounded-xl shadow-lg border text-right transition-all
              ${selectedWarehouse?.id === w.id
                ? "bg-blue-600 text-white border-blue-400 scale-105"
                : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
              }
            `}
          >
            <div className="text-lg font-bold">{w.name}</div>
            <div className="text-sm text-gray-300 mt-1">{w.dateTime}</div>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-white">در حال بارگذاری...</div>
      ) : selectedWarehouse ? (
        products.length === 0 ? (
          <div className="shadow-md rounded-lg p-6 bg-gray-800 text-white">
            هیچ محصولی در این انبار موجود نیست.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="
                  relative border border-gray-700 rounded-xl bg-gray-800 p-5 shadow-md
                  max-w-[360px] min-h-[220px] w-full
                  flex flex-col justify-between
                "
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-3">نام: <span className="font-normal">{p.name}</span></h3>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p>توضیحات: <span className="font-normal text-gray-300">{p.description || "-"}</span></p>
                    <p>تعداد: <span className="font-normal text-gray-300">{p.quantity}</span></p>
                    <p>قیمت: <span className="font-normal text-green-500">{p.price} ریال</span></p>
                    <p>تاریخ: <span className="font-normal text-green-500">{p.date || "-"}</span></p>
                    <p>
                      ویژگی‌ها:{" "}
                      <span className="font-normal text-green-500">
                        {p?.features && p.features.length > 0
                          ? p.features.map((f, idx) => (
                              <span key={idx} className="mr-2">
                                {f.key}: {f.value}
                              </span>
                            ))
                          : "-"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById(`card-${p.id}`);
                      if (el) {
                        el.classList.add("ring-2", "ring-yellow-400");
                        setTimeout(() => el.classList.remove("ring-2", "ring-yellow-400"), 700);
                      }
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
                  >
                    ویرایش
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
                  >
                    حذف
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
