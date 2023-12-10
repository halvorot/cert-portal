import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { Slide, SlideFade } from "@chakra-ui/react";

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
      <SlideFade in={true} offsetY={"20px"}>
        <LoginForm message={searchParams?.message} />
      </SlideFade>
    </div>
  );
}
