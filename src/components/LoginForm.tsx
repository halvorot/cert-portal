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
  Center,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useState, useTransition } from "react";
import {
  signInWithEmailAndPassword,
  signInWithProvider,
  signUpWithEmailAndPassword,
} from "@/utils/authUtils";
import { Provider } from "@supabase/supabase-js";

export default function LoginForm({ message }: { message: string }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formMessage, setFormMessage] = useState<string | undefined>(message);
  const [signInIsPending, startSignInTransition] = useTransition();
  const [signUpIsPending, startSignUpTransition] = useTransition();
  const [signInGoogleIsPending, startSignInGoogleTransition] = useTransition();
  const [signInGithubIsPending, startSignInGithubTransition] = useTransition();

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

  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack spacing="3">
        <Stack textAlign="center">
          <Heading mb="1rem">Log in to your account</Heading>
        </Stack>
        <Box
          py={{ base: "0", sm: "5" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form>
              <Stack spacing={2}>
                <Button
                  type="submit"
                  formAction={() =>
                    startSignInGoogleTransition(() => signInWithProvider("google"))
                  }
                  isLoading={signInGoogleIsPending}
                  leftIcon={<BsGoogle />}
                  py="1.5rem"
                >
                  <Text fontSize="sm">
                    Sign {isSignUp ? "up" : "in"} with Google
                  </Text>
                </Button>
                <Button
                  type="submit"
                  formAction={() =>
                    startSignInGithubTransition(() => signInWithProvider("github"))
                  }
                  isLoading={signInGithubIsPending}
                  leftIcon={<BsGithub />}
                  py="1.5rem"
                >
                  <Text fontSize="sm">
                    Sign {isSignUp ? "up" : "in"} with GitHub
                  </Text>
                </Button>
              </Stack>
            </form>
            <HStack>
              <Divider />
              <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                or continue with email
              </Text>
              <Divider />
            </HStack>
            <form>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" name="email" type="email" />
                </FormControl>
                <PasswordField />
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
                {formMessage && <Text textAlign="center">{formMessage}</Text>}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
