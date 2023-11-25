import CertificationGrid from "@/components/CertificationsGrid";
import H1 from "@/components/H1";
import Link from "next/link";
import { Suspense } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function Page() {
  return (
    <>
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20"
      >
        <BsArrowLeft className="w-4" />
        Back
      </Link>
      <div className="text-center">
        <H1 preText="The sea of " gradientText="Certifications" />
        <Suspense fallback="Loading certifications...">
          <CertificationGrid />
        </Suspense>
      </div>
    </>
  );
}
