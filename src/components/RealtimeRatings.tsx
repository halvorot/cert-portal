"use client";
import { RatingType } from "@/lib/types";
import React, { useEffect } from "react";
import RatingCard from "./RatingCard";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Stack,
  Center,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsEmojiFrown } from "react-icons/bs";

export default function RealtimeRatings({
  ratings,
}: {
  ratings: RatingType[];
}) {
  const supabase = createSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime ratings")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ratings",
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

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
