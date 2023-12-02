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

export async function readUserSession() {
  const supabase = await createSupabaseClient();
  return supabase.auth.getSession();
}
