"use client";

import React, { useEffect, useState } from "react";

interface Feature {
  key: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  features?: Feature[];
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

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
      if (selectedWarehouse) {
        const updated =
          warehousesWithId.find((w) => w.id === selectedWarehouse.id) || null;
        setSelectedWarehouse(updated);
        setProducts(updated?.Products || []);
      }
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
    const confirmed = confirm("آیا از حذف این محصول اطمینان دارید؟");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/warehouse?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("خطا در حذف محصول!");

      await fetchWarehouses();
      alert("✅ محصول با موفقیت حذف شد!");
    } catch (err) {
      console.error(err);
      alert("❌ خطا در حذف محصول!");
    }
  };

  const openEditModal = (p: Product) => {
    setEditProduct({ ...p, features: p.features ? [...p.features] : [] });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!editProduct) return;

    try {
      const payload = {
        ...editProduct,
        warehouseId: selectedWarehouse?.id,
      };

      const res = await fetch("/api/warehouse", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("PUT failed:", text);
        throw new Error("خطا هنگام ذخیره‌سازی");
      }

      await fetchWarehouses();
      setShowEditModal(false);
      setEditProduct(null);
      alert("✔ محصول با موفقیت ویرایش شد");
    } catch (err) {
      console.error(err);
      alert("❌ خطا هنگام ویرایش محصول");
    }
  };

  const renderFeatures = (f?: Feature[]) => {
    if (!f || f.length === 0) return "-";
    return f.map((it, i) => (
      <span key={i} className="mr-2">
        {it.key}: {it.value}
      </span>
    ));
  };

  return (
    <div className="px-8 py-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-white font-bold">
          {selectedWarehouse
            ? `محصولات  ${selectedWarehouse.name}`
            : "انتخاب انبار"}
        </h1>
      </div>

      <div className="flex overflow-x-auto gap-4 mb-6 pb-3 scrollbar-thin scrollbar-thumb-gray-600">
        {warehouses.map((w) => (
          <button
            key={w.id}
            onClick={() => handleWarehouseChange(w.id)}
            className={`
              min-w-[220px] px-5 py-3 rounded-xl shadow-lg border text-right transition-all
              ${
                selectedWarehouse?.id === w.id
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
                id={`card-${p.id}`}
                className="
                  relative border border-gray-700 rounded-xl bg-gray-800 p-5 shadow-md
                  max-w-[360px] min-h-[220px] w-full
                  flex flex-col justify-between
                "
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-3">
                    نام: <span className="font-normal">{p.name}</span>
                  </h3>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      توضیحات:{" "}
                      <span className="font-normal text-gray-300">
                        {p.description || "-"}
                      </span>
                    </p>
                    <p>
                      تعداد:{" "}
                      <span className="font-normal text-gray-300">
                        {p.quantity}
                      </span>
                    </p>
                    <p>
                      قیمت:{" "}
                      <span className="font-normal text-green-500">
                        {p.price} ریال
                      </span>
                    </p>
                    <p>
                      تاریخ:{" "}
                      <span className="font-normal text-green-500">
                        {p.date || "-"}
                      </span>
                    </p>
                    <p>
                      ویژگی‌ها:{" "}
                      <span className="font-normal text-green-500">
                        {renderFeatures(p.features)}
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
                        setTimeout(
                          () =>
                            el.classList.remove("ring-2", "ring-yellow-400"),
                          700
                        );
                      }
                      openEditModal(p);
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

      {showEditModal && editProduct && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center px-4 z-50">
          <div
            dir="rtl"
            className="bg-white p-6 rounded-xl w-full max-w-lg text-black space-y-4"
          >
            <h2 className="text-lg font-bold text-center mb-2">ویرایش محصول</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">نام محصول :</label>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">توضیحات :</label>
                <textarea
                  value={editProduct.description || ""}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 h-20 resize-none"
                />
              </div>

              <div className="border border-gray-300 rounded-md p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-sm">ویژگی‌ها :</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditProduct({
                        ...editProduct,
                        features: [
                          ...(editProduct.features || []),
                          { key: "", value: "" },
                        ],
                      })
                    }
                    className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                  >
                    +
                  </button>
                </div>

                {(editProduct.features || []).map((f, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="نام ویژگی"
                      value={f.key}
                      onChange={(e) => {
                        const newFeatures = [...(editProduct.features || [])];
                        newFeatures[i].key = e.target.value;

                        setEditProduct({
                          ...editProduct,
                          features: newFeatures,
                        });
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
                    />

                    <input
                      type="text"
                      placeholder="مقدار"
                      value={f.value}
                      onChange={(e) => {
                        const newFeatures = [...(editProduct.features || [])];
                        newFeatures[i].value = e.target.value;

                        setEditProduct({
                          ...editProduct,
                          features: newFeatures,
                        });
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setEditProduct({
                          ...editProduct,
                          features: (editProduct.features || []).filter(
                            (_, idx) => idx !== i
                          ),
                        })
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-semibold">تعداد :</label>
                  <input
                    type="number"
                    value={editProduct.quantity}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        quantity: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-semibold">قیمت :</label>
                  <input
                    type="text"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  تاریخ (قابل تغییر نیست):
                </label>
                <input
                  value={editProduct.date || ""}
                  readOnly
                  disabled
                  className="w-full border bg-gray-100 border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditProduct(null);
                  }}
                  className="w-1/2 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  بستن
                </button>

                <button
                  onClick={saveEdit}
                  className="w-1/2 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  ذخیره
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
