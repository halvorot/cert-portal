"use client";
import { motion } from "framer-motion";

interface Props {
  preText: string;
  gradientText: string;
  animate?: boolean;
}

export default function H1({ preText, gradientText, animate = false }: Props) {
  return (
    <motion.h1
      initial={animate && { y: 20, opacity: 0 }}
      animate={
        animate && {
          y: 0,
          opacity: 1,
        }
      }
      className="my-16 hyphens-auto break-words text-center text-5xl font-bold leading-tight md:text-6xl"
    >
      {preText + " "}
      <span className="bg-gradient-to-r from-primary from-10% to-secondary-accent bg-clip-text text-transparent">
        {gradientText}
      </span>
    </motion.h1>
  );
}
