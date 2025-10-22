import { useDispatch } from "react-redux";
import { removeProduct } from "../../features/products/productsSlice";
import { Product } from "../../types/product";

interface Props {
  product: Product;
  index: number;
  onEdit: (index: number) => void;
}

export default function ProductCard({ product, index, onEdit }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-4 shadow-lg relative group max-w-[500px] text-right">
      <div className=" top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(index)}
          className="text-yellow-400 hover:text-yellow-300"
        >
          ✏️
        </button>
        <button
          onClick={() => dispatch(removeProduct(index))}
          className="text-red-500 hover:text-red-400"
        >
          ✖
        </button>
      </div>
      <p className="font-bold">
        نام محصول: <span className="font-normal">{product.name}</span>
      </p>
      <p className="font-bold">
        تاریخ:{" "}
        <span className="font-normal">{product.date || "بدون تاریخ"}</span>
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
  );
}
