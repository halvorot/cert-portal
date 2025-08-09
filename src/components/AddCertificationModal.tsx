"use client";
import React, { useEffect, useState, useTransition } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { BsPlusCircle } from "react-icons/bs";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { readUserSession } from "@/utils/authUtils";
import { User } from "@supabase/supabase-js";
import { addCertification, Certification } from "@/utils/databaseUtils";
import slugify from "slugify";
import { CERTIFICATION_BADGES_BUCKET_URL } from "@/utils/constants";
import { supabase } from "@/utils/supabase/client";

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
  }, [readUserSession, setUser]);

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
      user_id: user.id,
    };

    if ((formData.get("badge_image") as File).size > 0) {
      const filePath = user.id + "/badge-" + slugify(certification.name);
      const { data, error } = await supabase.storage
        .from("certification-badges")
        .upload(filePath, formData.get("badge_image") as File);

      if (error) {
        setErrorMessage(error.message);
        return;
      }
      certification.badge_image_url =
        CERTIFICATION_BADGES_BUCKET_URL + "/" + data.path;
    }

    const errorMessage = await addCertification(certification);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    onClose();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ marginBottom: "2rem" }}
    >
      <Center>
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
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input id="name" name="name" placeholder="Name" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Exam Code</FormLabel>
                      <Input
                        id="exam_code"
                        name="exam_code"
                        placeholder="Exam Code"
                      />
                    </FormControl>
                    <FormControl isRequired>
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
                        minRows={6}
                        as={ResizeTextarea}
                      />
                    </Stack>
                    <FormControl>
                      <FormLabel>Badge image</FormLabel>
                      <Input id="badge_image" name="badge_image" type="file" />
                    </FormControl>
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
    </motion.div>
  );
}
