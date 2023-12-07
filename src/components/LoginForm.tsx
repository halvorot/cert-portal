"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
  Button,
  Divider,
  Container,
  Text,
  Box,
  Input,
  ButtonGroup,
  VisuallyHidden,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { BsGoogle } from "react-icons/bs";
import { useState, useTransition } from "react";
import {
  signInWithEmailAndPassword,
  signInWithProvider,
  signUpWithEmailAndPassword,
} from "@/lib/authUtils";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formMessage, setFormMessage] = useState<string | undefined>(undefined);
  const [signInIsPending, startSignInTransition] = useTransition();
  const [signUpIsPending, startSignUpTransition] = useTransition();

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const signInError = await signInWithEmailAndPassword(email, password);
    setFormMessage(signInError);
  };

  const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const signUpError = await signUpWithEmailAndPassword(email, password);
    if (signUpError) {
      setFormMessage(signUpError);
    } else {
      setFormMessage("Check your email to continue the sign in process");
    }
  };

  const signInProvider = async (provider: Provider) => {
    const errorMessage = await signInWithProvider(provider);
    if (errorMessage) {
      setFormMessage(errorMessage);
    }
  };

  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack spacing="3">
        <Stack textAlign="center">
          <Heading mb="1rem">Log in to your account</Heading>
          {isSignUp ? (
            <Text color="fg.muted">
              Already have an account?{" "}
              <Text
                onClick={() => setIsSignUp(false)}
                as="u"
                _hover={{
                  cursor: "pointer",
                }}
              >
                Sign in
              </Text>
            </Text>
          ) : (
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Text
                onClick={() => setIsSignUp(true)}
                as="u"
                _hover={{
                  cursor: "pointer",
                }}
              >
                Sign up
              </Text>
            </Text>
          )}
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form>
            <Stack spacing="6">
              <Button
                type="submit"
                formAction={() => signInProvider("google")}
                leftIcon={<BsGoogle />}
              >
                <Text fontSize="sm">Sign in with Google</Text>
              </Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with email
                </Text>
                <Divider />
              </HStack>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" name="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              <Button
                type="submit"
                formAction={(formData) =>
                  startSignInTransition(() => signIn(formData))
                }
                hidden={isSignUp}
                isLoading={signInIsPending}
              >
                Sign in
              </Button>
              <Button
                type="submit"
                formAction={(formData) =>
                  startSignUpTransition(() => signUp(formData))
                }
                hidden={!isSignUp}
                isLoading={signUpIsPending}
              >
                Sign up
              </Button>
              {formMessage && <Text>{formMessage}</Text>}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
