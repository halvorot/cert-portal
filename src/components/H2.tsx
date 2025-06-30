import { motion } from "framer-motion";

interface Props {
  text: string;
  classes?: string;
}

export default function H2({ text, classes }: Props) {
  return (
    <motion.h2
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`mb-12 text-center text-2xl font-light md:text-3xl ${classes}`}
    >
      {text}
    </motion.h2>
  );
}
