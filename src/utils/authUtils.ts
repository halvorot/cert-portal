"use server";

import { createSupabaseClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
) {
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
    return "Could not sign up: " + error.message;
  }

  if (data && data.user) {
    // Check if the user got created
    if (!data.user.identities || data.user.identities?.length <= 0) {
      // failed, the email address is taken
      return `Could not sign up: User with email ${data.user.email} already exists`;
    }
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  const supabase = createSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return "Could not authenticate user: " + error.message;
  }
}

export async function signInWithProvider(provider: Provider) {
  const origin = headers().get("origin");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return error.message;
  } else {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = createSupabaseClient();

  await supabase.auth.signOut();

  return redirect("/");
}

export async function readUserSession() {
  const supabase = createSupabaseClient();
  return supabase.auth.getSession();
}
