import H2 from "@/components/H2";
import { Skeleton } from "@chakra-ui/react";

export default async function Loading() {
  return (
    <>
      <Skeleton my="4rem" height="5rem" />

      <div className="mb-14 flex flex-col items-center justify-center gap-5">
        <Skeleton width="100%" maxWidth="24rem" height="5rem" />
        <Skeleton width="6rem" height="5rem" />
      </div>
      <Skeleton>
        <H2 text="Ratings" />
      </Skeleton>
    </>
  );
}
