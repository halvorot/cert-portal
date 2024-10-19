"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import CertificationCard from "./CertificationCard";
import { Center, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import fetchCertifications from "@/app/actions";
import { motion } from "framer-motion";
import H2 from "./H2";

interface Certification {
  id: number;
  name: string;
  exam_code: string;
  badge_image_url?: string;
  ratings: Rating[];
}

interface Rating {
  id: number;
  would_take_again: boolean;
}

const container = {
  visible: {
    transition: {
      staggerChildren: 0.04,
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

export default function InfiniteScrollCertifications({
  search,
  initialCertifications,
}: {
  search: string | undefined;
  initialCertifications: Certification[];
}) {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications,
  );
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [ref, inView] = useInView();
  const [isPending, startTransition] = useTransition();

  const loadMoreCertifications = useCallback(
    () =>
      startTransition(async () => {
        const nextPage = currentPage + 1;
        const { data, error } = await fetchCertifications({
          page: nextPage,
          search,
        });
        if (error) {
          console.log("Error occurred when fetching certifications. ", error);
          setIsError(true);
          return;
        }
        if (data && data.length > 0) {
          setCurrentPage(nextPage);
          setCertifications((prev) => [...prev, ...data]);
        }
      }),
    [currentPage, certifications],
  );

  useEffect(() => {
    if (inView && !isPending) {
      loadMoreCertifications();
    }
  }, [inView, loadMoreCertifications]);

  return (
    <Stack spacing={6}>
      {certifications && certifications.length > 0 ? (
        <motion.ul variants={container} initial="hidden" animate="visible">
          <SimpleGrid minChildWidth="18rem" spacing="20px">
            {certifications.map((row) => (
              <motion.li key={row.id} variants={item}>
                <CertificationCard certification={row} />
              </motion.li>
            ))}
          </SimpleGrid>
        </motion.ul>
      ) : (
        <div>
          <H2 text="No certifications found" />
        </div>
      )}
      {isError && (
        <p>
          Something went wrong when fetching certifications... Please try again
          later
        </p>
      )}

      <Center ref={ref}>
        <Spinner visibility={isPending ? "visible" : "hidden"} />
      </Center>
    </Stack>
  );
}
