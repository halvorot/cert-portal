import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  readUserSession,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signInWithEmailAndPassword(email, password);
  };

  const signUp = async (formData: FormData) => {
    "use server";

    

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signUpWithEmailAndPassword(email, password);
  };

  const {data} = await readUserSession();
  if (data.session) {
    return redirect("/")
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-light"
          action={signIn}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" placeholder="you@example.com" required />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </FormControl>
          <button className="my-2 rounded-md bg-primary px-4 py-2 text-light hover:bg-primary-accent">
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
