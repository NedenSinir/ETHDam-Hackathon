import React, { use, useState } from "react";
import { Box, Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import SelectToken from "./SelectToken";
import AmountInput from "./AmountInput";
import ButtonState from "./ButtonState";
import { BiTransfer } from "react-icons/bi";
import SelectAmount from "./SelectAmount";
import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui";
import SecretKeyGenerator from "./SecretKeyGenerator";


const SecretBox = () => {
  const [inputType, setInputType] = useState(true);
  const {connected} = useSDK();
  const [token, setToken] = useState("");
  const handleTokenChange = (event) => {
    setToken(event.target.value);
    console.log(event.target.value);
  };

  const [amount, setAmount] = useState("");
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  }
  return (
    <Flex
    className="outer-panel"
    shadow={5}
      direction="column"
      alignItems="center"
      margin="auto"
      border="1px solid #CBD5E0"
      borderRadius="md"
      minH={"200px"}
      p={4}
      maxHeight="300px"
      overflowY="auto"
      backgroundColor={"secondary"}
      borderColor="black"
      borderWidth="2px"
      w={"100%"}
    >

        
     <SecretKeyGenerator></SecretKeyGenerator>

    </Flex >
  );
};

export default SecretBox;
