import { readUserSession } from "@/lib/authUtils";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import LogoutButton from "./LogoutButton";

export default async function AuthButton() {

  const { data } = await readUserSession();

  return data.session ? (
    <LogoutButton email={data.session.user.email}/>
  ) : (
    <Link
      href="/login"
      className="flex items-center gap-2 rounded-md bg-light-accent/10 px-4 py-2 font-semibold no-underline hover:bg-light-accent/20"
    >
      <BsPerson className="h-5 w-5" />
      Login
    </Link>
  );
}
