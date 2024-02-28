import H2 from "@/components/H2";
import { Flex, Skeleton } from "@chakra-ui/react";

export default async function Loading() {
  return (
    <>
      <Skeleton my="4rem" height="5rem" />

      <Flex
        marginBottom="3.5rem"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap="1.25rem"
      >
        <Skeleton width="100%" maxWidth="24rem" height="5rem" />
        <Skeleton width="6rem" height="5rem" />
      </Flex>

      <Skeleton>
        <H2 text="Ratings" />
      </Skeleton>
    </>
  );
}
