import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="group absolute left-8 top-8 flex items-center rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20"
    >
      <BsArrowLeft className="w-4" />
      Back
    </Link>
  );
}
