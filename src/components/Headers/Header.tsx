"use client";

import Link from "next/link";
import { links } from "./constants/navLinks";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="pt-6 px-6 font-sans">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl px-6 py-4 shadow-lg border border-gray-700">
        <nav className="flex gap-6 text-gray-700 rtl">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 transition-colors duration-200
                  ${
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-white hover:text-blue-400"
                  }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            📦 KIUMAD
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            مدیریت کالاها و ورود بارهای جدید به انبار
          </p>
        </div>
      </div>
    </div>
  );
}
