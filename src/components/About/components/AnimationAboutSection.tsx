"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { fadeInUpVariant } from "../constants/framerMotion";

export default function AnimationAboutSection({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
