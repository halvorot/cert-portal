import { readUserSession } from "@/utils/authUtils";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <LoginForm
          message={searchParams.message}
          messageColor={searchParams.messageColor}
        />
      </motion.div>
    </Flex>
  );
}
