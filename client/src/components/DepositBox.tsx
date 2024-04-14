import React, { use, useState } from "react";
import { Box, Button, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import SelectToken from "./SelectToken";
import AmountInput from "./AmountInput";
import ButtonState from "./ButtonState";
import { BiTransfer } from "react-icons/bi";
import SelectAmount from "./SelectAmount";
import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui";

const numberToBase64 = (number: number): string => {
          const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          let result = "";
          while (number > 0) {
            result = base64Chars[number % 64] + result;
            number = Math.floor(number / 64);
          }
          return result;
        };

        const base64Value = numberToBase64(42); // Example usage
const DepositBox = () => {
  const [inputType, setInputType] = useState(true);
  const {connected,provider,account} = useSDK();
  const [token, setToken] = useState("");
  const [hash, setHash] = useState("");
  const handleTokenChange = (event) => {
    setToken(event.target.value);
    console.log(event.target.value);
  };

  

  const sendTx  = async () => {
    
    if(!provider) return;
    let result = await provider.request({
      method: 'eth_sendTransaction',
      params: [
      {
        from: account,
        to: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
        value: `0x${(parseFloat(amount)* 10**18).toString(16)}`,
        
        gasLimit: '0x5208',
        gasPrice: '0x2540be400',
        type: '0x0',
      },
      ],
      

      
    });
  
    //@ts-ignore
  setHash(result);
if(!result) result = "ranodm_hash";
    
  const msg = `0x${Buffer.from(result.toString(), "utf8").toString("hex")}`;
  const sign = await provider // Or window.ethereum if you don't support EIP-6963.
      .request({
          method: "personal_sign",
          params: [msg, account],
      });
  
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
      maxW={"25vw"}
    >
      <Flex  flex="3" alignItems="center" mb="4">
        {inputType ? <AmountInput amount={amount} handleAmountChange={handleAmountChange} /> : <SelectAmount amount={amount} setAmount={setAmount} />}
        <Spacer minW="2" />
        <SelectToken token={token} handleTokenChange={handleTokenChange} />
        
      </Flex >
      <HStack>
        <Button
        isDisabled = {!connected}  bg="primary" 
        borderColor="black" // Sets the border color
        borderWidth="1px" // Sets the border width
        borderStyle="solid" mr={2}
        onClick={sendTx}
        > 
          
        Deposit
        </Button>
        
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
      


      </HStack>
      <HStack>
        
      </HStack>

    </Flex >
  );
};

export default DepositBox;
