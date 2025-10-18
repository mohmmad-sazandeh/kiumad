// src/app/warehouse/page.tsx  (یا app/warehouse/page.tsx)
export default function WarehousePage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">📦 انبار / Warehouse</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">
          این صفحهٔ انبار است. در آینده اینجا لیست موجودی، جزئیات هر کالا و فیلترها نمایش داده می‌شود.
        </p>

        {/* نمونه کارت ساده */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-md p-4">
            <p className="font-bold">نام محصول : مثال</p>
            <p>تعداد : 10</p>
            <p>قیمت : 1,000,000 ریال</p>
          </div>
        </div>
      </div>
    </div>
  );
}
