import { readUserSession } from "@/utils/authUtils";
import { Flex, SlideFade } from "@chakra-ui/react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Readonly<{ email: string }>;
}) {
  const { data } = await readUserSession();
  const email = searchParams?.email;

  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <SlideFade in={true} offsetY={"20px"}>
        <ForgotPasswordForm
          preFilledEmail={email ?? data.session?.user.email}
        />
      </SlideFade>
    </Flex>
  );
}
