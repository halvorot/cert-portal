"use client";
import { RatingType } from "@/utils/types";
import RatingsBar from "./RatingBar";
import { MAX_SCORE, MIN_SCORE } from "@/utils/constants";
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
  useToast,
} from "@chakra-ui/react";
import { useLayoutEffect, useState, useTransition } from "react";
import { deleteRating } from "@/utils/databaseUtils";
import { supabase } from "@/utils/supabase/client";

export default function RatingCard({ rating }: { rating: RatingType }) {
  const [isExpanded, setIsExpanded] = useBoolean();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  useLayoutEffect(() => {
    const getUserFromSupabase = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id);
    };

    getUserFromSupabase().catch(console.error);
  }, [supabase]);

  const handleDeleteRating = async (ratingId: number) => {
    const error = await deleteRating(ratingId);
    error
      ? toast({
          title: "An error occurred",
          description: "Could not delete rating. " + error,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      : toast({
          title: "Rating deleted",
          description: "The rating was deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
            label="Easiness"
            score={rating.easiness}
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
          <HStack
            justifyContent={rating.comment ? "space-between" : "end"}
            alignItems="end"
          >
            {rating.comment && (
              <div>
                <Text
                  fontSize="sm"
                  noOfLines={!isExpanded ? 3 : Infinity}
                  whiteSpace={"pre-wrap"}
                >
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
              </div>
            )}
            {userId && rating.user_id === userId && (
              <Flex justifyContent="end">
                <Tooltip label="Delete rating" placement="auto" float="right">
                  <IconButton
                    onClick={() =>
                      startTransition(() => handleDeleteRating(rating.id))
                    }
                    isLoading={isPending}
                    aria-label="Delete rating"
                    icon={<BsTrash3 />}
                    fontSize="1rem"
                  />
                </Tooltip>
              </Flex>
            )}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
