import { Text, Flex } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Flex
      bg="secondary"
      w="100%"
      p={4}
      color="text"
      alignItems="center"
      justifyContent="center"
      border="000000"
      borderColor={"black"}
      borderTop="2px"
      borderStyle={"solid"}
    >
      <Text fontWeight={"bold"} >Made for ETHDam 2024 with ❤️</Text>
    </Flex>
  );
};

export default Footer;
