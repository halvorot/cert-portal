"use client"
import { deleteCertification } from "@/utils/databaseUtils";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsTrash3 } from "react-icons/bs";

export default function DeleteCertificationButton({
  certification_id,
}: {
  certification_id: number;
}) {
  return (
    <Tooltip label="Delete certification" placement="top">
      <Button
        onClick={() => deleteCertification(certification_id)}
        aria-label="Delete certification"
        leftIcon={<BsTrash3 />}
        variant="ghost"
        textColor="red"
      >
        Delete certification
      </Button>
    </Tooltip>
  );
}
