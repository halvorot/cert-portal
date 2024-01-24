"use client";
import React, { useEffect, useState, useTransition } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Input,
  SlideFade,
  Center,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { readUserSession } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import { Certification, addCertification } from "@/utils/databaseUtils";

export default function AddCertificationModal({
  withIcon = true,
}: {
  withIcon?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await readUserSession();
      setUser(session?.user);
    };

    checkUser().catch(console.error);
  }, [readUserSession]);

  const handleAddCertification = async (formData: FormData) => {
    if (!user) {
      setErrorMessage(
        "Could not find user. Make sure you are logged in correctly.",
      );
      return;
    }

    const certification: Certification = {
      exam_code: formData.get("exam_code") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      badge_image_url: formData.get("image_url") as string,
      user_id: user.id
    };

    const errorMessage = await addCertification(certification);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    onClose();
  };

  return (
    <SlideFade in={true} offsetY={"20px"}>
      <Center marginBottom="2rem">
        <button
          onClick={onOpen}
          className="flex flex-col items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm text-light hover:bg-primary-accent"
        >
          {withIcon && <BsPlusCircle width="2rem" height="2rem" />}
          Add Certification
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => {
            setErrorMessage(undefined);
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a certification!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {user ? (
                <form
                  action={(formData) =>
                    startTransition(() => handleAddCertification(formData))
                  }
                >
                  <Stack spacing="1rem">
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input id="name" name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Exam Code</FormLabel>
                      <Input
                        id="exam_code"
                        name="exam_code"
                        placeholder="Exam Code"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>URL</FormLabel>
                      <Input
                        id="url"
                        name="url"
                        placeholder="e.g. https://learn.microsoft.com/..."
                      />
                    </FormControl>
                    <Stack>
                      <Text>Description</Text>
                      <Textarea
                        name="description"
                        placeholder="Write a description of the certification in Markdown formatting..."
                      />
                    </Stack>
                    <Button type="submit" isLoading={isPending}>
                      Add certification
                    </Button>
                    {errorMessage && (
                      <Text color="red">
                        An error occurred trying to add certification:{" "}
                        {errorMessage}
                      </Text>
                    )}
                  </Stack>
                </form>
              ) : (
                <Stack alignItems="center" spacing="2rem">
                  <Text>You have to be logged in to add a certification</Text>
                  <Link
                    href="/login"
                    className="mb-2 rounded-lg bg-primary px-4 py-2 text-center font-medium text-light transition hover:bg-primary-accent focus:outline-none focus:ring-4 focus:ring-primary-accent/80"
                  >
                    Login
                  </Link>
                </Stack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    </SlideFade>
  );
}
