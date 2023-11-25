import CertificationGrid from "@/components/CertificationsGrid";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Suspense } from "react";

export default async function Index() {
  return (
    <div className="">
      <H1 preText="Welcome to" gradientText="CertPortal" />
      <div className="flex flex-col justify-center">
        <H2 text="Browse certifications to find the best one for you" />
        <Suspense fallback="Loading certifications...">
          <CertificationGrid />
        </Suspense>
      </div>
    </div>
  );
}
