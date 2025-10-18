import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Kiumad Dashboard",
  description: "مدیریت محصولات",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="ltr">
      <body className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

