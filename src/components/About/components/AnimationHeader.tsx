"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, MotionProps } from "framer-motion";
import { fadeInVariant } from "../constants/framerMotion";
import { AnimationHeaderProps } from "../Types/type";

export default function AnimationHeader({
  children,
  className,
  motionProps,
  inViewOptions,
}: AnimationHeaderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { once = true, amount = 0.3 } = inViewOptions ?? {};
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
