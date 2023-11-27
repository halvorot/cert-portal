import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HomeButton from "@/components/HomeButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user: " + error.message);
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect(
        "/login?message=Could not authenticate user: " + error.message,
      );
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-light"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-6 rounded-md border px-4 py-2 text-dark"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border px-4 py-2 text-dark"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="mb-2 rounded-md bg-primary px-4 py-2 text-light hover:bg-primary-accent">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="mb-2 rounded-md border border-light/20 bg-dark-accent/50 px-4 py-2 text-light hover:bg-dark-accent/20"
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 text-center text-light">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
