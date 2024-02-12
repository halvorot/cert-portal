import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Flex, SlideFade } from "@chakra-ui/react";

export default async function ResetPassword() {
  const { data } = await readUserSession();

  if (!data.session) {
    const message =
      "Could access reset password page, make sure you are using an authorized link";
    redirect(`/login?message=${message}`);
  }

  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <SlideFade in={true} offsetY={"20px"}>
        <ResetPasswordForm email={data.session.user.email ?? "UNKNOWN"} />
      </SlideFade>
    </Flex>
  );
}
