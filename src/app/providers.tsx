"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  ColorModeScript,
  Theme,
  ThemeConfig,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0em",
  xs: "30em",
  sm: "40em",
  md: "48em",
  lg: "64em",
  xl: "80em",
  "2xl": "96em",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ breakpoints, config });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
