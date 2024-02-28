import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { Flex, SlideFade } from "@chakra-ui/react";

export default async function Login({
  searchParams,
}: {
  searchParams: Readonly<{ message: string; messageColor: string }>;
}) {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <SlideFade in={true} offsetY={"20px"}>
        <LoginForm
          message={searchParams.message}
          messageColor={searchParams.messageColor}
        />
      </SlideFade>
    </Flex>
  );
}
