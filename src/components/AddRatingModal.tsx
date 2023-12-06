"use client";
import { MAX_SCORE, MIN_SCORE } from "@/lib/constants";
import { createSupabaseClient } from "@/utils/supabase/client";
import { PostgrestError, User } from "@supabase/supabase-js";
import React, { useEffect, useState, useTransition } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useDisclosure,
  Textarea,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export default function AddRatingModal({
  certificationId,
  withIcon = true,
}: {
  certificationId: string;
  withIcon?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);
  const [addRatingError, setAddRatingError] = useState<PostgrestError | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser().catch(console.error);
  }, [supabase]);

  const addRating = async (formData: FormData) => {
    const rating = {
      overall: formData.get("overall"),
      difficulty: formData.get("difficulty"),
      usefulness: formData.get("usefulness"),
      comment: formData.get("comment"),
      would_take_again: formData.get("would-take-again") || false,
      certification: certificationId,
      user_id: user?.id,
    };

    const { error } = await supabase.from("ratings").insert(rating);

    if (error) {
      setAddRatingError(error);
      console.log(error.message);
      return;
    }
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex flex-col items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-light hover:bg-primary-accent"
      >
        {withIcon && <BsPlusCircle className="h-8 w-8" />}
        Add Rating
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setAddRatingError(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a rating!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {user ? (
              <form
                action={(formData) =>
                  startTransition(() => addRating(formData))
                }
              >
                <Stack spacing="1rem">
                  <FormControl>
                    <FormLabel>
                      Overall score ({MIN_SCORE}-{MAX_SCORE})
                    </FormLabel>
                    <Slider
                      name="overall"
                      aria-label="Overall score"
                      defaultValue={3}
                      min={MIN_SCORE}
                      max={MAX_SCORE}
                      step={1}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={5} />
                    </Slider>
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Difficulty ({MIN_SCORE}-{MAX_SCORE})
                    </FormLabel>
                    <Slider
                      name="difficulty"
                      aria-label="Difficulty"
                      defaultValue={3}
                      min={MIN_SCORE}
                      max={MAX_SCORE}
                      step={1}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={5} />
                    </Slider>
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Usefulness ({MIN_SCORE}-{MAX_SCORE})
                    </FormLabel>
                    <Slider
                      name="usefulness"
                      aria-label="Usefulness"
                      defaultValue={3}
                      min={MIN_SCORE}
                      max={MAX_SCORE}
                      step={1}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={5} />
                    </Slider>
                  </FormControl>
                  <Stack>
                    <Text>Comment</Text>
                    <Textarea
                      name="comment"
                      placeholder="Write your comment about the certification..."
                    />
                  </Stack>
                  <Checkbox name="would-take-again" defaultChecked size="lg">
                    Would take again?
                  </Checkbox>
                  <Button type="submit" isLoading={isPending}>
                    Add rating
                  </Button>
                  {addRatingError && (
                    <Text color="red">
                      An error occurred trying to add rating:{" "}
                      {addRatingError.message}
                    </Text>
                  )}
                </Stack>
              </form>
            ) : (
              <Stack alignItems="center" spacing="2rem">
                <Text>You have to be logged in to add a rating</Text>
                <Link
                  href="/login"
                  className="mb-2 rounded-lg bg-primary px-4 py-2 text-center font-medium text-light transition hover:bg-primary-accent focus:outline-none focus:ring-4 focus:ring-primary-accent/80"
                >
                  Login
                </Link>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
