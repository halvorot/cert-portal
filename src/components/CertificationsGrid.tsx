"use client"
import CertificationCard from "./CertificationCard";
import { SimpleGrid } from "@chakra-ui/react";
import { CertificationType } from "@/utils/types";

export default function CertificationGrid({
  certifications,
}: {
  certifications: CertificationType[];
}) {
  return (
    <SimpleGrid minChildWidth="18rem" spacing="20px">
      {certifications.map((row) => (
        <CertificationCard key={row.id} certification={row} />
      ))}
    </SimpleGrid>
  );
}
