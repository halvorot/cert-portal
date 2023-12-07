"use client";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/lib/authUtils";
import { useTransition } from "react";

export default function LoginForm({ errorMessage }: { errorMessage: string }) {
  const [signInIsPending, startSignInTransition] = useTransition();
  const [signUpIsPending, startSignUpTransition] = useTransition();

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signInWithEmailAndPassword(email, password);
  };

  const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signUpWithEmailAndPassword(email, password);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-light"
          action={(formData) => startSignInTransition(() => signIn(formData))}
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
          <Button
            type="submit"
            isLoading={signInIsPending}
            className="my-2 rounded-md bg-primary px-4 py-2 text-light hover:bg-primary-accent"
          >
            Sign In
          </Button>
          <Button
            type="submit"
            formAction={(formData) => startSignUpTransition(() => signUp(formData))}
            isLoading={signUpIsPending}
            className="mb-2 rounded-md border border-light/20 bg-dark-accent/50 px-4 py-2 text-light hover:bg-dark-accent/20"
          >
            Sign Up
          </Button>
          {errorMessage && (
            <p className="mt-4 p-4 text-center text-light">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
