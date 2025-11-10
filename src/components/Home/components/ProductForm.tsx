"use client";

import React from "react";
import { todayJalali } from "@/utils/TodayJalali";
import { PropsProductModal, updateFormProductFn } from "../types/type";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateFormProductField } from "@/store/features/products/productsSlice";
import { isFormValid } from "../services/isFormValid";

const ProductForm: React.FC<PropsProductModal> = ({
  onClose,
  onSubmit,
  editingIndex,
}) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.products);

  const onChangeForm: updateFormProductFn = (field, value) => {
    dispatch(updateFormProductField({ field, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex === null) {
      onSubmit({ ...form, date: todayJalali });
    } else {
      onSubmit(form);
    }
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

  return (
    <div dir="rtl" className="space-y-4">
      <h2 className="text-lg font-bold text-center mb-2">
        {editingIndex !== null ? "ویرایش محصول" : "اضافه کردن محصول جدید"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">نام محصول :</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChangeForm("name", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold">توضیحات :</label>
          <textarea
            value={form.description}
            onChange={(e) => onChangeForm("description", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 h-20 resize-none"
          />
        </div>

        <div className="border border-gray-300 rounded-md p-3 space-y-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-sm">ویژگی‌ها :</label>
            <button
              type="button"
              onClick={() =>
                onChangeForm("features", [
                  ...form.features,
                  { key: "", value: "" },
                ])
              }
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
                onChange={(e) => handleFeatureChange(i, "key", e.target.value)}
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
                type="button"
                onClick={() =>
                  onChangeForm(
                    "features",
                    form.features.filter((_, index) => index !== i)
                  )
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
              value={form.quantity}
              onChange={(e) => onChangeForm("quantity", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-sm font-semibold">قیمت :</label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => onChangeForm("price", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid(form)}
          className={`w-full py-2 rounded-md transition ${
            isFormValid(form)
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
        >
          ذخیره
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
