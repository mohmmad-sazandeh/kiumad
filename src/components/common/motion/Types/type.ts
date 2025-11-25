import { MotionProps } from "framer-motion";
import { ReactNode } from "react";

export type MotionDivProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  inViewOptions?: { once?: boolean; amount?: number };
};

export type MotionAnchorProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  href?: string;
};

export type MotionContainerProps = MotionDivProps & {
  children?: ReactNode;
};

export type MotionItemProps = MotionDivProps;
