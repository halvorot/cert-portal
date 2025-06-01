import { readUserSession } from "@/utils/authUtils";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <ForgotPasswordForm
          preFilledEmail={email ?? data.session?.user.email}
        />
      </motion.div>
    </Flex>
  );
}
