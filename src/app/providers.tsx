"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem({
  ...defaultConfig,
  theme: {
    breakpoints: {
      xs: "30em",
      sm: "40em",
      md: "48em",
      lg: "64em",
      xl: "80em",
      "2xl": "96em",
    },
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  },
});

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}
