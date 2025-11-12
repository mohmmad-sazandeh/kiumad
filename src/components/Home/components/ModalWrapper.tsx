"use client";

import ModalWrapper from "../../common/CommonModal";
import ProductForm from "./ProductForm";
import WarehouseForm from "./WarehouseForm";

interface CommonModalProps {
  type: "product" | "warehouse";
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  products?: any[];
  resetForm?: () => void;
  editingIndex?: number | null;
}

export default function CommonModal({
  type,
  isOpen,
  onClose,
  onSubmit,
  products,
  resetForm,
  editingIndex,
}: CommonModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      width={type === "product" ? "w-[450px]" : "w-[350px]"}
    >
      {type === "product" ? (
        <ProductForm
          onSubmit={onSubmit!}
          onClose={onClose}
          editingIndex={editingIndex ?? null} // 👈 این خط مشکل رو حل می‌کنه
        />
      ) : (
        <WarehouseForm
          onClose={onClose}
          products={products!}
          resetForm={resetForm!}
        />
      )}
    </ModalWrapper>
  );
}
