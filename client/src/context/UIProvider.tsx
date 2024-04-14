"use client";
import { ChakraProvider } from "@chakra-ui/provider";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    'text': '#221304',
    'background': '#fef8f3',
    'primary': '#e8892f',
    'secondary': '#c7f184',
    'accent': '#80ec54',
   },
});

export const UIProvider = ({ children }: any) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default theme;
