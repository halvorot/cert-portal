"use client";

import { MAX_SCORE, MIN_SCORE } from "@/utils/constants";
import React, { useEffect, useState, useTransition } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { BsPlusCircle } from "react-icons/bs";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { readUserSession } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import { addRating, Rating } from "@/utils/databaseUtils";

export default function AddRatingModal({
  certificationId,
  withIcon = true,
}: Readonly<{
  certificationId: number;
  withIcon?: boolean;
}>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await readUserSession();
      setUser(session?.user);
    };

    checkUser().catch(console.error);
  }, [readUserSession]);

  const handleAddRating = async (formData: FormData) => {
    if (!user) {
      setErrorMessage(
        "Could not find user. Make sure you are logged in correctly.",
      );
      return;
    }

    const rating: Rating = {
      overall: Number(formData.get("overall")),
      easiness: Number(formData.get("easiness")),
      usefulness: Number(formData.get("usefulness")),
      comment: formData.get("comment") as string,
      would_take_again: Boolean(formData.get("would-take-again")),
      certification: certificationId,
      user_id: user?.id,
    };

    const errorMessage = await addRating(rating);

    if (errorMessage) {
      setErrorMessage(errorMessage);
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
          setErrorMessage(undefined);
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
                  startTransition(() => handleAddRating(formData))
                }
              >
                <Stack spacing="1rem">
                  <FormControl>
                    <FormLabel>Overall score</FormLabel>
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
                    <FormLabel>Easiness</FormLabel>
                    <Slider
                      name="easiness"
                      aria-label="Easiness"
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
                    <FormLabel>Usefulness</FormLabel>
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
                      minRows={6}
                      as={ResizeTextarea}
                    />
                  </Stack>
                  <Checkbox name="would-take-again" defaultChecked size="lg">
                    Would take again?
                  </Checkbox>
                  <Button type="submit" isLoading={isPending}>
                    Add rating
                  </Button>
                  {errorMessage && (
                    <Text color="red">
                      An error occurred trying to add rating: {errorMessage}
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
