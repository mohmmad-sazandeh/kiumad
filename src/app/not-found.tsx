"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | صفحه پیدا نشد";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  text-white text-center px-6">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mb-2">صفحه پیدا نشد 😕</h2>
      <p className="text-gray-300 mb-6 max-w-md">
        صفحه‌ای که دنبالش هستید وجود ندارد یا ممکن است حذف شده باشد.
      </p>

      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
