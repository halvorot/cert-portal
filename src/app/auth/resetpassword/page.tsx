import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Flex, Text, SlideFade } from "@chakra-ui/react";

export default async function ResetPassword() {
  const { data } = await readUserSession();

  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <SlideFade in={true} offsetY={"20px"}>
        {data.session?.user.email ? (
          <ResetPasswordForm email={data.session.user.email} />
        ) : (
          <Text>
            Cannot reset password, make sure you're using the correct link
          </Text>
        )}
      </SlideFade>
    </Flex>
  );
}
