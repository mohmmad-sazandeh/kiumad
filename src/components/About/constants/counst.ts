import {
  Package,
  QrCode,
  Database,
  Phone,
  MapPin,
  Mail,
  Zap,
} from "lucide-react";
export const features = [
  {
    icon: Package,
    title: "ثبت کالاها",
    description:
      "ثبت سریع و دقیق اطلاعات محصولات ورودی به انبار با امکان دسته‌بندی و برچسب‌گذاری",
  },
  {
    icon: QrCode,
    title: "تولید QR Code",
    description:
      "ایجاد خودکار بارکدهای QR برای هر محصول و دانلود آسان برای چاپ و برچسب‌گذاری",
  },
  {
    icon: Database,
    title: "مدیریت موجودی",
    description:
      "پیگیری لحظه‌ای موجودی انبار و دسترسی سریع به تاریخچه ورود و خروج کالاها",
  },
  {
    icon: Zap,
    title: "سرعت و کارایی",
    description:
      "رابط کاربری ساده و سریع برای ثبت و بازیابی اطلاعات در کمترین زمان ممکن",
  },
];

export const contacts = [
  {
    icon: Phone,
    label: "تلفن تماس",
    value: "09215282680",
    href: "tel:09215282680",
  },
  {
    icon: MapPin,
    label: "آدرس",
    value:
      "قزوین، جاده باراجین، پارک علم و فناوری، ساختمان صالحی، طبقه۴، واحد ۴۰۸",
    href: null,
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: "info@example.com",
    href: "mailto:info@example.com",
  },
];
