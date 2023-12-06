import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsHouse } from "react-icons/bs";

export default function HomeButton() {
  return (
    <Link href="/">
      <Button leftIcon={<BsHouse />}>
        Home
      </Button>
    </Link>
  );
}
