import { removeProduct } from "@/store/features/products/productsSlice";
import { PropsProductCard } from "../types/type";
import { useAppDispatch } from "@/hooks/useRedux";

export default function ProductCard({
  product,
  index,
  onEdit,
}: PropsProductCard) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-5 shadow-lg relative max-w-[360px] min-h-[220px] w-full flex flex-col justify-between text-right">
      <div>
        <p className="font-bold">
          نام محصول: <span className="font-normal">{product.name}</span>
        </p>
        <p className="font-bold">
          تاریخ: <span className="font-normal">{product.date || "بدون تاریخ"}</span>
        </p>
        <p className="font-bold">
          تعداد: <span className="font-normal">{product.quantity}</span>
        </p>
        <p className="font-bold">
          قیمت: <span className="font-normal">{product.price} ریال</span>
        </p>

        {product.features.length > 0 && (
          <div className="mt-2">
            <p className="font-bold text-sm mb-1">ویژگی‌ها:</p>
            <ul className="text-sm list-disc pr-4 text-gray-300">
              {product.features.map((f, fi) => (
                <li key={fi}>
                  {f.key}: {f.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.description && (
          <p className="mt-2 text-sm text-gray-400">{product.description}</p>
        )}
      </div>

      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => onEdit(index)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
        >
          ویرایش
        </button>
        <button
          onClick={() => dispatch(removeProduct(index))}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
        >
          حذف
        </button>
      </div>
    </div>
  );
}
