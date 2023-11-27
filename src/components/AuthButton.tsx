import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="absolute right-8 top-8">
      {user ? (
        <div className="flex items-center gap-4">
          Hello, {user.email}!
          <form action={signOut}>
            <button className="rounded-md bg-dark-accent px-4 py-2 text-light no-underline hover:bg-light-accent/20">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex rounded-md bg-dark-accent px-4 py-2 text-light no-underline hover:bg-light-accent/20"
        >
          Login
        </Link>
      )}
    </div>
  );
}
