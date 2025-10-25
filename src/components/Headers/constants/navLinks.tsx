import { BadgeQuestionMark, PackageCheck, PlusCircle } from "lucide-react";

export const links = [
  {
    href: "/test1",
    label: "تست ",
    icon: <BadgeQuestionMark className="w-4 h-4" />,
  },
  {
    href: "/test2",
    label: "تست",
    icon: <BadgeQuestionMark className="w-4 h-4" />,
  },
  {
    href: "/warehouse",
    label: "انبار",
    icon: <PackageCheck className="w-4 h-4" />,
  },
  {
    href: "/",
    label: "اضافه کردن",
    icon: <PlusCircle className="w-4 h-4" />,
  },
];
