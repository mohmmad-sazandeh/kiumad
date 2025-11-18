"use client";

import React, { useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;             
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  width = "w-[400px]",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
      dir="rtl"
    >
      <div
        className={`bg-white text-gray-900 rounded-2xl shadow-lg p-5 relative animate-scaleUp ${width}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
