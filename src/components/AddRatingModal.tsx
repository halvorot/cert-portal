"use client";
import { MAX_SCORE } from "@/js/constants";
import React, { useState } from "react";
import { BsPlusCircle, BsX } from "react-icons/bs";
import Modal from "react-modal";

export default function AddRatingModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className="flex flex-col items-center text-sm gap-1 text-light bg-primary rounded-md px-4 py-2">
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
        <div className="flex w-full flex-col items-center justify-center">
          <form className="flex w-full max-w-md flex-col justify-center gap-2 text-light">
            <label className="text-md">Overall Score (0-{MAX_SCORE})</label>
            <input
              type="number"
              min={0}
              max={MAX_SCORE}
              className="mb-6 rounded-md border px-4 py-2 text-dark"
              name="overall"
              placeholder="Overall score..."
            />
            <label className="text-md">Difficulty (0-{MAX_SCORE})</label>
            <input
              type="number"
              min={0}
              max={MAX_SCORE}
              className="mb-6 rounded-md border px-4 py-2 text-dark"
              name="difficulty"
              placeholder="Difficulty..."
            />
            <label className="text-md">Usefulness (0-{MAX_SCORE})</label>
            <input
              type="number"
              min={0}
              max={MAX_SCORE}
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
              className="w-5 h-5 mb-5"
              name="would-take-again"
            />
            <label  className="text-md">Would take again?</label>
            </div>
            <button
              type="submit"
              className="mb-2 rounded-md border border-light/20 bg-dark-accent/50 px-4 py-2 text-light hover:bg-dark-accent/20"
            >
              Add rating
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
