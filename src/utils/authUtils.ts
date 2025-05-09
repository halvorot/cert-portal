"use server";

import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
) {
  const origin = headers().get("origin");

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

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error.message);
    return redirect(`/login?message=${error.message}`);
  } else {
    return redirect(data.url);
  }
}

export async function sendResetPasswordLink(email: string) {
  const origin = headers().get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/resetpassword`,
  });

  if (error) {
    console.log(error.message);
    return `Could send link to reset password: ${error.message}`;
  } else {
    return redirect(
      `/login?messageColor=green&message=${
        "Link to reset password was sent to: " +
        email +
        ". Make sure to check your spam folder"
      }`,
    );
  }
}

export async function updateUser(newPassord: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassord,
  });
  if (error) {
    console.log(error.message);
    return `Could not reset password: ${error.message}`;
  } else {
    return redirect("/login");
  }
}

export async function signOut() {
  await supabase.auth.signOut();

  redirect("/");
}

export async function readUserSession() {
  return supabase.auth.getSession();
}
