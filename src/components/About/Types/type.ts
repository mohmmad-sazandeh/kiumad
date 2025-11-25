import { MotionProps } from "framer-motion";
import { ReactNode } from "react";

export interface AnimationHeaderProps {
  children: ReactNode;
  className?: string;
  motionProps?: MotionProps;
  inViewOptions?: { once?: boolean; amount?: number };
}

export type AnimationType = "fade" | "stagger" | "item";

export interface AnimationFeaturesProps {
  children: ReactNode;
  type?: AnimationType;
  className?: string;
  inViewOptions?: { once?: boolean; amount?: number };
  motionProps?: MotionProps;
}

export interface AnimationContactSectionProps {
  children: ReactNode;
  type?: AnimationType;
  className?: string;
}
