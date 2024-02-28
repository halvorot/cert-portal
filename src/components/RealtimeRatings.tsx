"use client";
import { RatingType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import { createSupabaseClient } from "@/utils/supabase/client";
import { Card, CardBody, Stack, Center, Icon, Text } from "@chakra-ui/react";
import { BsEmojiFrown } from "react-icons/bs";
import AddRatingModal from "./AddRatingModal";
import { motion } from "framer-motion";

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

export default function RealtimeRatings({
  serverRatings,
  certificationId,
}: {
  serverRatings: RatingType[];
  certificationId: number;
}) {
  const [ratings, setRatings] = useState(serverRatings);
  const supabase = createSupabaseClient();

  useEffect(() => {
    setRatings(serverRatings);
  }, [serverRatings]);

  useEffect(() => {
    const insertChannel = supabase
      .channel("realtime ratings insert")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ratings",
        },
        (payload) => {
          setRatings((ratings) => {
            return [...ratings, payload.new as RatingType];
          });
        },
      )
      .subscribe();

    const deleteChannel = supabase
      .channel("realtime ratings delete")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "ratings",
        },
        (payload) => {
          setRatings(
            [...ratings].filter((rating) => rating.id !== payload.old.id),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(insertChannel);
      supabase.removeChannel(deleteChannel);
    };
  }, [supabase, setRatings, ratings]);

  return ratings.length > 0 ? (
    <motion.ul
      className="grid grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      variants={container} initial="hidden" animate="visible"
    >
      {ratings.map((rating) => (
        <motion.li key={rating.id} variants={item}>
          <RatingCard rating={rating} />
        </motion.li>
      ))}
    </motion.ul>
  ) : (
    <Center>
      <Card width="100%" maxWidth="24rem">
        <CardBody>
          <Stack justifyContent="center" alignItems="center">
            <Icon as={BsEmojiFrown} boxSize={6} />
            <Text mb="1rem">No ratings yet</Text>
            <AddRatingModal
              certificationId={certificationId}
              withIcon={false}
            />
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}
