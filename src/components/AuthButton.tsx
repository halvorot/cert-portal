import { signOut } from "@/lib/authUtils";
import { createSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {

  const supabase = createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      Hello, {user.email}!
      <form action={signOut}>
        <button className="rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="flex rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20"
    >
      Login
    </Link>
  );
}
