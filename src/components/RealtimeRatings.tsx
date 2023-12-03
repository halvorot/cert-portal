"use client";
import { RatingType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import { createSupabaseClient } from "@/utils/supabase/client";
import { Card, CardBody, Stack, Center, Icon, Text } from "@chakra-ui/react";
import { BsEmojiFrown } from "react-icons/bs";

export default function RealtimeRatings({
  serverRatings,
}: {
  serverRatings: RatingType[];
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
    <ul
      role="list"
      className="grid grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {ratings.map((rating) => (
        <li key={rating.id}>
          <RatingCard rating={rating} />
        </li>
      ))}
    </ul>
  ) : (
    <Center>
      <Card width="100%" maxWidth="24rem">
        <CardBody>
          <Stack justifyContent="center" alignItems="center">
            <Icon as={BsEmojiFrown} boxSize={6} />
            <Text>No ratings yet</Text>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}
