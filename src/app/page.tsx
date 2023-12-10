import Certifications from "@/components/Certifications";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default async function Index() {
  return (
    <div className="">
      <H1
        preText="Welcome to"
        gradientText="CertPortal"
        animate
      />
      <H2 text="Browse certifications to find the best one for you" />
      <div className="flex flex-col justify-center text-center">
        <Suspense fallback="Loading certifications...">
          <Certifications />
        </Suspense>
      </div>
    </div>
  );
}
