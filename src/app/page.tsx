import H1 from "@/components/H1";
import H2 from "@/components/H2";
import fetchCertifications from "./actions";
import InfiniteScrollCertifications from "@/components/InfiniteScrollCertifications";
import CertificationSearch from "@/components/CertificationSearch";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";
import AddCertificationModal from "@/components/AddCertificationModal";

export default async function Index({
  searchParams,
}: {
  searchParams?: { search: string };
}) {
  const { data: certifications, error } = await fetchCertifications({
    search: searchParams?.search,
  });

  return (
    <div>
      <H1 preText="Welcome to" gradientText="CertPortal" animate />
      <H2 text="Browse certifications to find the best one for you" />
      <AddCertificationModal withIcon={false} />
      <CertificationSearch />
      <Flex minHeight="60vh" flexDir="column" textAlign="center">
        <>
          {error ? (
            <>
              <H2 text="Could not get certifications" />
              <p>{error.message}</p>
              <p>{error.details}</p>
            </>
          ) : (
            <Suspense
              key={Math.random()}
              fallback="Loading certifications..."
            >
              <InfiniteScrollCertifications
                initialCertifications={certifications ?? []}
                search={searchParams?.search}
              />
            </Suspense>
          )}
        </>
      </Flex>
    </div>
  );
}
