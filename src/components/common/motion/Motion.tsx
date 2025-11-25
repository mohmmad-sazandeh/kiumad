"use client";

import { motion, useInView, MotionProps } from "framer-motion";
import { useRef } from "react";
import {
  MotionAnchorProps,
  MotionContainerProps,
  MotionDivProps,
  MotionItemProps,
} from "./Types/type";

export function MotionDiv({
  children,
  className,
  inViewOptions,
  ...motionProps
}: MotionDivProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { once = true, amount = 0.2 } = inViewOptions ?? {};
  const inView = useInView(ref, { once, amount });

  const animate =
    motionProps.animate !== undefined
      ? motionProps.animate
      : inView
      ? "visible"
      : "hidden";

  return (
    <motion.div
      ref={ref}
      className={className}
      {...motionProps}
      animate={animate}
    >
      {children}
    </motion.div>
  );
}

export function MotionAnchor({
  children,
  className,
  href,
  ...motionProps
}: MotionAnchorProps) {
  return (
    <motion.a href={href} className={className} {...motionProps}>
      {children}
    </motion.a>
  );
}

export function MotionContainer({
  children,
  className,
  inViewOptions,
  ...motionProps
}: MotionContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { once = true, amount = 0.2 } = inViewOptions ?? {};
  const inView = useInView(ref, { once, amount });
  const animate =
    motionProps.animate !== undefined
      ? motionProps.animate
      : inView
      ? "visible"
      : "hidden";

  return (
    <motion.div
      ref={ref}
      className={className}
      {...motionProps}
      animate={animate}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  ...motionProps
}: MotionItemProps) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
