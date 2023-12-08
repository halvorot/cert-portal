"use client";
import CertificationCard from "./CertificationCard";
import { SimpleGrid } from "@chakra-ui/react";
import { CertificationType } from "@/utils/types";
import { motion } from "framer-motion";

export default function CertificationGrid({
  certifications,
}: {
  certifications: CertificationType[];
}) {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      <SimpleGrid minChildWidth="18rem" spacing="20px">
        {certifications.map((row) => (
          <motion.li key={row.id} variants={item}>
            <CertificationCard certification={row} />
          </motion.li>
        ))}
      </SimpleGrid>
    </motion.ul>
  );
}
