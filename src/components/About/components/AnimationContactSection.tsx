"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { animationMap } from "../constants/framerMotion";
import { AnimationContactSectionProps } from "../Types/type";

export default function AnimationContactSection({
  children,
  type = "fade",
  className,
}: AnimationContactSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const variants = animationMap[type];

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
