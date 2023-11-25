import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CertificationCard from "./CertificationCard";
import H2 from "./H2";
import { Suspense } from "react";

export default async function CertificationGrid() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select();

  return (
    <>
      {error ? (
        <>
          <H2 text="Could not get certifications" />
          <p>{error.message}</p>
        </>
      ) : (
        <ul role="list" className="grid grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-2">
          {certifications
            .sort((a, b) => {
              const nameA = a.name.toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .map((row) => (
              <li key={row.id}>
                <CertificationCard certification={row} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
