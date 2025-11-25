import AnimationHeader from "./AnimationHeader";
import { Info } from "lucide-react";
import { MotionItem } from "@/components/common/motion/Motion";

export default function Header() {
  return (
    <AnimationHeader className="text-center flex flex-col gap-4 items-center">
      <MotionItem
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/30 border border-white/20"
      >
        <Info className="w-12 h-12 text-white drop-shadow-lg" />
      </MotionItem>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
        درباره ما
      </h1>

      <p className="text-gray-300/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
        مدیریت هوشمند کالاها و انبار با سرعت، دقت و سادگی
      </p>
    </AnimationHeader>
  );
}
