"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import CertificationCard from "./CertificationCard";
import { Center, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import fetchCertifications from "@/app/actions";
import { motion } from "framer-motion";
import { PostgrestError } from "@supabase/supabase-js";

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

export default function InfiniteScrollCertifications({
  initialCertifications,
}: {
  initialCertifications: Certification[];
}) {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications,
  );
  const [error, setError] = useState<PostgrestError | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ref, inView] = useInView();
  const [isPending, startTransition] = useTransition();

  const loadMoreCertifications = useCallback(
    () =>
      startTransition(async () => {
        const nextPage = currentPage + 1;
        console.log("loading page" + nextPage);
        const { data, error } = await fetchCertifications(nextPage);
        if (error) {
          setError(error);
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
    <Stack>
      <motion.ul variants={container} initial="hidden" animate="visible">
        <SimpleGrid minChildWidth="18rem" spacing="20px">
          {certifications.map((row) => (
            <motion.li key={row.id} variants={item}>
              <CertificationCard certification={row} />
            </motion.li>
          ))}
        </SimpleGrid>
      </motion.ul>
      {error && (
        <>
          <p>{error.message}</p>
          <p>{error.details}</p>
        </>
      )}

      <Center ref={ref}>{isPending && <Spinner />}</Center>
    </Stack>
  );
}
