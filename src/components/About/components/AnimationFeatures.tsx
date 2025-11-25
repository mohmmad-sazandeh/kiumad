"use client";

import { useRef } from "react";
import { motion, useInView, MotionProps } from "framer-motion";
import { animationMap } from "../constants/framerMotion";
import { AnimationFeaturesProps } from "../Types/type";

export default function AnimationFeatures({
  children,
  type = "fade",
  className,
  inViewOptions,
  motionProps,
}: AnimationFeaturesProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { once = true, amount = 0.2 } = inViewOptions ?? {};
  const inView = useInView(ref, { once, amount });

  const variants = animationMap[type];

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
