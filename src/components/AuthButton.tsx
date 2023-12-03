import { signOut } from "@/lib/authUtils";
import { createSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsPerson } from "react-icons/bs";

export default async function AuthButton() {
  const supabase = createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      Hello, {user.email}!
      <form action={signOut}>
        <button className="rounded-md bg-light-accent/10 px-4 py-2 font-semibold no-underline hover:bg-light-accent/20">
          Logout
        </button>
      </form>
    </div>
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
