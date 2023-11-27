import Link from "next/link";
import React from "react";
import { BsHouse } from "react-icons/bs";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20"
    >
      <BsHouse className="w-4" />
      Home
    </Link>
  );
}
