"use client";
import { RatingType } from "@/lib/types";
import React from "react";
import { BsChatRightQuote } from "react-icons/bs";
import RatingsBar from "./RatingBar";
import { getAverage, getWouldTakeAgainPercentage } from "@/lib/utils";
import { MAX_SCORE, MIN_SCORE } from "@/lib/constants";
import {
  Card,
  CardBody,
  Text,
  Progress,
  Stack,
  HStack,
  Icon,
} from "@chakra-ui/react";

export default function RatingsSummaryCard({
  ratings,
}: {
  ratings: RatingType[];
}) {
  const averageOverallScore = 3;
  // ratings.reduce((total, next) => total + next.overall, 0) / ratings.length;

  const wouldTakeAgainPercentage = getWouldTakeAgainPercentage(ratings);

  return (
    <Card width="100%" maxWidth="24rem">
      <CardBody>
        {ratings.length > 0 ? (
          <Stack spacing={5}>
            <HStack align="center" spacing="0.6rem">
              <Text fontSize="3xl">{averageOverallScore.toFixed(1)}</Text>
              <Progress
                width="100%"
                value={averageOverallScore}
                max={MAX_SCORE}
                min={MIN_SCORE}
                rounded="md"
              />
              <HStack align="center" spacing="0.4rem">
                <Icon as={BsChatRightQuote} />
                <Text fontSize="lg">{ratings.length}</Text>
              </HStack>
            </HStack>
            <RatingsBar
              label="Usefulness"
              score={getAverage(ratings.map((rating) => rating.usefulness))}
              minScore={MIN_SCORE}
              maxScore={MAX_SCORE}
            />
            <RatingsBar
              label="Difficulty"
              score={getAverage(ratings.map((rating) => rating.difficulty))}
              minScore={MIN_SCORE}
              maxScore={MAX_SCORE}
            />
            <Text
              fontSize="lg"
              colorScheme="green"
              textAlign="center"
              color={
                wouldTakeAgainPercentage && wouldTakeAgainPercentage < 50
                  ? "#dc2626"
                  : "#16a34a"
              }
              fontWeight="bold"
            >
              {ratings.length > 0 &&
                wouldTakeAgainPercentage &&
                (wouldTakeAgainPercentage < 50
                  ? (100 - wouldTakeAgainPercentage).toFixed(0) +
                    "% would NOT take again!"
                  : wouldTakeAgainPercentage.toFixed(0) +
                    "% would take again!")}
            </Text>
          </Stack>
        ) : (
          <Text fontSize="lg" textAlign="center">
            No ratings yet
          </Text>
        )}
      </CardBody>
    </Card>
  );
}
