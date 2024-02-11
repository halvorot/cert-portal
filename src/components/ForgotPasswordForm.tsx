"use client";

import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Divider,
  Container,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { sendResetPasswordLink } from "@/utils/authUtils";

export default function ForgotPasswordForm({ preFilledEmail }: { preFilledEmail: string | undefined }) {
  const [formMessage, setFormMessage] = useState<string | undefined>();
  const [sendResetPasswordIsPending, startSendResetPasswordTransition] =
    useTransition();

  const sendResetPasswordEmail = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const error = await sendResetPasswordLink(email);
    setFormMessage(error);
  };

  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack spacing="3">
        <Stack textAlign="center">
          <Heading mb="1rem">Send reset password link</Heading>
        </Stack>
        <Box
          py={{ base: "0", sm: "5" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" name="email" type="email" defaultValue={preFilledEmail}/>
              </FormControl>
              <Button
                type="submit"
                formAction={(formData) =>
                  startSendResetPasswordTransition(() =>
                    sendResetPasswordEmail(formData),
                  )
                }
                isLoading={sendResetPasswordIsPending}
              >
                Send reset password link
              </Button>
              {formMessage && <Text textAlign="center">{formMessage}</Text>}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
