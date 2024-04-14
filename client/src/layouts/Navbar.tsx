"use client";
import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useState } from "react";
import {Image} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      
      w="100%"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack w={"100%"} gap={"5rem"} justifyContent={"space-between"} marginTop ={"5rem"}>
        <HStack spacing={"1rem"}>
        <Image width={95} alt="image" src="./output.png"></Image>
        <Heading><Text textColor={"black"} fontSize={"8rem"} pl={"0.5rem"} className="logoFont">CoConyM </Text></Heading>
        <Image width={95} alt="image" src="./output.png"></Image>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Navbar;
