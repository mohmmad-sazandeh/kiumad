"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-gray-700 bg-gray-800">
      <div className="flex gap-3 flex-row-reverse">
        <button
          onClick={() => router.push("/")}
          className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700"
        >
          اضافه کردن
        </button>

        <button
          onClick={() => router.push("/warehouse")}
          className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700"
        >
          انبار
        </button>

        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          -
        </button>

        <button className="border border-gray-500 rounded-md px-4 py-2 text-white hover:bg-gray-700">
          -
        </button>
      </div>

      <div className="text-2xl font-bold text-white">Kiumad</div>
    </header>
  );
}

