import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default async function ResetPassword() {
  const { data } = await readUserSession();

  if (!data.session) {
    const message =
      "Could access reset password page, make sure you are using an authorized link";
    redirect(`/login?message=${message}`);
  }

  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <ResetPasswordForm email={data.session.user.email ?? "UNKNOWN"} />
      </motion.div>
    </Flex>
  );
}
