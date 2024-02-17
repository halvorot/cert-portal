"use client";
import { deleteCertification } from "@/utils/databaseUtils";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Toast, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsTrash3 } from "react-icons/bs";

export default function DeleteCertificationButton({
  certification_id,
}: {
  certification_id: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleDeleteCertification = async (certificationId: number) => {
    const error = await deleteCertification(certification_id);
    error ? (
      toast({
        title: 'An error occurred',
        description: "Could not delete certification. " + error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    ) : (
      toast({
        title: 'Certification deleted',
        description: "The certification was deleted successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    )
    onClose();
  }

  return (
    <>
      <Tooltip label="Delete certification" placement="top">
        <Button
          onClick={onOpen}
          aria-label="Delete certification"
          leftIcon={<BsTrash3 />}
          textColor="red"
        >
          Delete certification
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Certification
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteCertification(certification_id)}
                ml={3}
                textColor="red"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
