"use client";
import { RatingType } from "@/js/types";
import React, { useState } from "react";
import RatingsBar from "./RatingBar";
import { MAX_SCORE, MIN_SCORE } from "@/js/constants";
import { BsPatchCheckFill, BsXOctagonFill } from "react-icons/bs";
import { Card, CardBody, HStack, Icon, Stack, Text } from "@chakra-ui/react";

export default function RatingCard({ rating }: { rating: RatingType }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardBody>
        <Stack>
          <RatingsBar
            label="Overall score"
            score={rating.overall}
            minScore={MIN_SCORE}
            maxScore={MAX_SCORE}
            variant="slim"
          />
          <RatingsBar
            label="Difficulty"
            score={rating.difficulty}
            minScore={MIN_SCORE}
            maxScore={MAX_SCORE}
            variant="slim"
          />
          <RatingsBar
            label="Usefulness"
            score={rating.usefulness}
            minScore={MIN_SCORE}
            maxScore={MAX_SCORE}
            variant="slim"
          />
          <HStack>
            <Text>Would take again?</Text>
            {rating.would_take_again ? (
              <div className="flex items-center gap-1 text-success">
                <Icon as={BsPatchCheckFill} /> <Text>Yes</Text>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-error">
                <Icon as={BsXOctagonFill} /> <Text>No</Text>
              </div>
            )}
          </HStack>
          {rating.comment && (
            <>
              <Text fontSize="sm" noOfLines={!isExpanded ? 3 : Infinity}>
                {rating.comment}
              </Text>
              <Text fontSize="sm" onClick={() => setIsExpanded(!isExpanded)} as='u'>
                Show {isExpanded ? "less" : "more"}
              </Text>
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
