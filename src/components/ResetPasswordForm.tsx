"use client";

import { Stack, Heading, Button, Container, Text, Box } from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { useState, useTransition } from "react";
import { updateUser } from "@/utils/authUtils";

export default function ResetPasswordForm({ email }: { email: string }) {
  const [formMessage, setFormMessage] = useState<string | undefined>();
  const [resetPasswordIsPending, startResetPasswordTransition] =
    useTransition();

  const resetPassword = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const signInError = await updateUser(password);
    setFormMessage(signInError);
  };

  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack spacing="3">
        <Stack textAlign="center">
          <Heading mb="1rem">Reset password for {email}</Heading>
        </Stack>
        <Box
          py={{ base: "0", sm: "5" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form>
            <Stack spacing="5">
              <PasswordField />
              <Button
                type="submit"
                formAction={(formData) =>
                  startResetPasswordTransition(() => resetPassword(formData))
                }
                isLoading={resetPasswordIsPending}
              >
                Reset password
              </Button>
              {formMessage && <Text textAlign="center">{formMessage}</Text>}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
