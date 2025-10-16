"use client";

import React from "react";

interface HeaderProps {
  onAddProduct?: (product: any) => void;
}

export default function Header({ onAddProduct }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-gray-700 bg-gray-800">
      {/* دکمه‌ها سمت چپ */}
      <div className="flex gap-3 flex-row-reverse">
        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          اضافه کردن
        </button>
        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          -
        </button>
        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          -
        </button>
        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          -
        </button>
      </div>

      {/* لوگو سمت راست */}
      <div className="text-2xl font-bold text-white">Kiumad</div>
    </header>
  );
}
