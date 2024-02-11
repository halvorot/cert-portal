import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Flex, Text, SlideFade } from "@chakra-ui/react";
import { createSupabaseClient } from "@/utils/supabase/client";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string };
}) {

  if (searchParams.code) {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);
    if (error) {
      return redirect(`/login?message=${error.message}`);
    }
  }
  const { data } = await readUserSession();

  if (!data.session) {
    const message = "Could not reset password, make sure you are using the correct link";
    redirect(`/login?message=${message}`)
  }

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
