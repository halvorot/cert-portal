"use client";
import { signOut } from "@/utils/authUtils";
import { Button } from "@chakra-ui/react";
import React, { useTransition } from "react";

export default function LogoutButton({ email }: { email: string | undefined }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      {email}
      <Button isLoading={isPending} onClick={() => startTransition(signOut)}>
        Logout
      </Button>
    </div>
  );
}
