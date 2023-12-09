"use client";
import { animate, motion } from "framer-motion";

interface Props {
  preText: string;
  gradientText: string;
}

export default function H1({ preText, gradientText }: Props) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="my-16 hyphens-auto break-words text-center text-5xl font-bold leading-tight md:text-6xl"
    >
      {preText + " "}
      <span className="bg-gradient-to-r from-primary from-10% to-secondary-accent bg-clip-text text-transparent">
        {gradientText}
      </span>
    </motion.h1>
  );
}
