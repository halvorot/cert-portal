"use client";
import { MAX_SCORE } from "@/js/constants";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import PrimaryButton from "./PrimaryButton";

export default function AddRatingModal({
  certification_id,
}: {
  certification_id: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();
  }, []);

  const addRating = async (formData: FormData) => {
    const rating = {
      overall: formData.get("overall"),
      difficulty: formData.get("difficulty"),
      usefulness: formData.get("usefulness"),
      comment: formData.get("comment"),
      would_take_again: formData.get("would-take-again") || false,
      certification: certification_id,
      user_id: user?.id,
    };
    console.log(rating);
    const supabase = createClient();
    const { data, error } = await supabase.from("ratings").insert(rating);
    if (error) {
      setError(error);
      console.log(error.message);
      return error;
    }
    onClose();
    return data;
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex flex-col items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-light"
      >
        <BsPlusCircle className="h-8 w-8" />
        Add Rating
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor={"black"}>Add a rating!</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody>
            {user && !error ? (
              <div className="flex w-full flex-col items-center justify-center text-dark">
                <form className="flex w-full max-w-md flex-col justify-center gap-2">
                  <label className="text-md">
                    Overall Score (0-{MAX_SCORE})
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={MAX_SCORE}
                    required
                    className="mb-6 rounded-md border px-4 py-2 text-dark"
                    name="overall"
                    placeholder="Overall score..."
                  />
                  <label className="text-md">Difficulty (0-{MAX_SCORE})</label>
                  <input
                    type="number"
                    min={0}
                    max={MAX_SCORE}
                    required
                    className="mb-6 rounded-md border px-4 py-2 text-dark"
                    name="difficulty"
                    placeholder="Difficulty..."
                  />
                  <label className="text-md">Usefulness (0-{MAX_SCORE})</label>
                  <input
                    type="number"
                    min={0}
                    max={MAX_SCORE}
                    required
                    className="mb-6 rounded-md border px-4 py-2 text-dark"
                    name="usefulness"
                    placeholder="Usefulness..."
                  />
                  <label className="text-md">Comment</label>
                  <textarea
                    rows={4}
                    className="mb-6 rounded-md border px-4 py-2 text-dark"
                    name="comment"
                    placeholder="Write your comment about the certification..."
                  />
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mb-5 h-5 w-5 checked:accent-primary"
                      name="would-take-again"
                    />
                    <label className="text-md">Would take again?</label>
                  </div>
                  <button
                    type="submit"
                    formAction={addRating}
                    className="mb-2 rounded-lg bg-primary px-4 py-2 text-center font-medium text-light transition hover:bg-primary-accent focus:outline-none focus:ring-4 focus:ring-primary-accent/80"
                  >
                    Add rating
                  </button>
                </form>
              </div>
            ) : error ? (
              <p>An error occurred trying to add rating: {error.message}</p>
            ) : (
              <div className="flex flex-col items-center gap-5 text-dark">
                <p>You have to be logged in to add a rating</p>
                <Link
                  href="/login"
                  className="mb-2 rounded-lg bg-primary px-4 py-2 text-center font-medium text-light transition hover:bg-primary-accent focus:outline-none focus:ring-4 focus:ring-primary-accent/80"
                >
                  Login
                </Link>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
