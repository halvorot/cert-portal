"use client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { BsHouse } from "react-icons/bs";

export default function HomeButton() {
  return (
    <Button as="a" href="/" leftIcon={<BsHouse />}>
      Home
    </Button>
  );
}
