import {
  readUserSession,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/lib/authUtils";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <div className="flex w-full items-center justify-center">
      <LoginForm message={searchParams?.message} />
    </div>
  );
}
