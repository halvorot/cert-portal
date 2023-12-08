import { readUserSession } from "@/utils/authUtils";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import LogoutButton from "./LogoutButton";
import { Button } from "@chakra-ui/react";

export default async function AuthButton() {
  const { data } = await readUserSession();

  return data.session ? (
    <LogoutButton email={data.session.user.email} />
  ) : (
    <Link href="/login">
      <Button leftIcon={<BsPerson />}>Login</Button>
    </Link>
  );
}
