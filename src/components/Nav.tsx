import React from "react";
import HomeButton from "./HomeButton";
import AuthButton from "./AuthButton";

export default function Nav() {
  return (
    <nav className="flex flex-col-reverse items-center justify-between p-5 sm:flex-row gap-5">
      <HomeButton />
      <AuthButton />
    </nav>
  );
}
