"use client";
import { RatingType } from "@/lib/types";
import RatingsBar from "./RatingBar";
import { MAX_SCORE, MIN_SCORE } from "@/lib/constants";
import { BsPatchCheckFill, BsTrash3, BsXOctagonFill } from "react-icons/bs";
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useBoolean,
} from "@chakra-ui/react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useLayoutEffect, useState } from "react";

export default function RatingCard({ rating }: { rating: RatingType }) {
  const [isExpanded, setIsExpanded] = useBoolean();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const supabase = createSupabaseClient();

  useLayoutEffect(() => {
    const getUserFromSupabase = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id);
    };

    getUserFromSupabase().catch(console.error);
  }, [supabase]);

  const deleteRating = async (idToDelete: number) => {
    await supabase.from("ratings").delete().match({ id: idToDelete });
  };

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
              <Text
                fontSize="sm"
                onClick={setIsExpanded.toggle}
                as="u"
                _hover={{
                  cursor: "pointer",
                }}
              >
                Show {isExpanded ? "less" : "more"}
              </Text>
            </>
          )}
          {userId && rating.user_id === userId && (
            <Flex justifyContent="end">
              <Tooltip label="Delete rating" placement="auto" float="right">
                <IconButton
                  onClick={() => deleteRating(rating.id)}
                  aria-label="Delete rating"
                  icon={<BsTrash3 />}
                  variant="ghost"
                  fontSize="1rem"
                />
              </Tooltip>
            </Flex>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
