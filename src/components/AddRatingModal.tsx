"use client";
import { MAX_SCORE } from "@/js/constants";
import { RatingType } from "@/js/types";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { BsPlusCircle, BsX } from "react-icons/bs";
import Modal from "react-modal";
import AuthButton from "./AuthButton";
import Link from "next/link";

Modal.setAppElement("#main");

export default function AddRatingModal({
  certification_id,
}: {
  certification_id: string;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

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
    closeModal();
    return data;
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex flex-col items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-light"
      >
        <BsPlusCircle className="h-8 w-8" />
        Add Rating
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(200,200,200, 0.3)",
          },
          content: {
            marginLeft: "clamp(5px, 5%, 100px)",
            marginRight: "clamp(5px, 5%, 100px)",
            marginTop: "clamp(5px,5%,20px)",
            marginBottom: "clamp(5px,5%,20px)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #262626",
            background: "#0a0a0a",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "0.5rem",
            padding: "20px",
          },
        }}
      >
        <button onClick={closeModal} className="absolute right-5 top-5">
          <BsX className="h-8 w-8" />
        </button>
        {user && !error ? (
          <div className="flex w-full flex-col items-center justify-center">
            <form className="flex w-full max-w-md flex-col justify-center gap-2 text-light">
              <label className="text-md">Overall Score (0-{MAX_SCORE})</label>
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
                className="mb-2 rounded-md border border-light/20 bg-dark-accent/50 px-4 py-2 text-light hover:bg-dark-accent/20"
              >
                Add rating
              </button>
            </form>
          </div>
        ) : error ? (
          <p>An error occurred trying to add rating: {error.message}</p>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <p>You have to be logged in to add a rating</p>
            <Link
                href="/login"
                className="rounded-md bg-dark-accent px-4 py-2 text-light no-underline hover:bg-light-accent/20"
              >
                Login
              </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
