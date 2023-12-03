import { createSupabaseClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
) {
  "use server";

  const origin = headers().get("origin");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not sign up: " + error.message);
  }

  if (data && data.user) {
    // Check if the user got created
    if (!data.user.identities || data.user.identities?.length <= 0) {
      // failed, the email address is taken
      return redirect(
        `/login?message=Could not sign up: User with email ${data.user.email} already exists`,
      );
    }
  }

  return redirect("/login?message=Check email to continue sign in process");
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  "use server";

  const supabase = createSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(
      "/login?message=Could not authenticate user: " + error.message,
    );
  }

  return redirect("/");
}

export async function signOut() {
  "use server";

  const supabase = createSupabaseClient();

  await supabase.auth.signOut();

  return redirect("/");
};

export async function readUserSession() {
  "use server";

  const supabase = createSupabaseClient();
  return supabase.auth.getSession();
}
