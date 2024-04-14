import React, { use, useState } from "react";
import { Box, Button, Flex, HStack, Input, Select, Spacer, Text, Textarea, VStack } from "@chakra-ui/react";
import SelectToken from "./SelectToken";
import AmountInput from "./AmountInput";
import ButtonState from "./ButtonState";
import { BiTransfer } from "react-icons/bi";
import SelectAmount from "./SelectAmount";
import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui";


const SwapBox = () => {
  const [inputType, setInputType] = useState(true);
  const { connected } = useSDK();
  const [token, setToken] = useState("");
  const [token2, setToken2] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [compeleted, setCompeleted] = useState(false);
  const handleTokenChange = (event) => {
    setToken(event.target.value);
    
  };
  const handleTokenChange2 = (event) => {
    setToken2(event.target.value);
    
  };

  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState("");
  
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  }
  const handleAmountChange2 = (event) => {
    setAmount2(event.target.value);
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
      overflowY="auto"
      backgroundColor={"secondary"}
      borderColor="black"
      borderWidth="2px"
      maxW={"25vw"}
    >
      <VStack flex="3" alignItems="center" mb="4">
        <VStack>

          <Text>  Chain Id</Text>
          <Input
           borderColor="black"
           borderWidth="1px"
           _placeholder={{
             // Adding styles to the placeholder
             color: "black", // Sets the color of the placeholder text
             fontFamily: "Arial, sans-serif", // Changes the font family of the placeholder
             fontStyle: "italic", // Optionally, makes the placeholder text italic
           }}
           boxShadow="hg" // Apply medium shadow predefined by Chakra UI
           _hover={{ boxShadow: "lg" }} // Larger shadow on hover
           _focus={{ boxShadow: "xl" }}
           onChange={()=>{}}

          placeholder='59141' />
        </VStack>
        <VStack>

          <Text> Amount In</Text>
          <HStack>

            {inputType ? <AmountInput amount={amount} handleAmountChange={handleAmountChange} /> : <SelectAmount amount={amount} setAmount={setAmount} />}
            <Spacer minW="2" />
            <SelectToken token={token} handleTokenChange={handleTokenChange} />
          </HStack>
        </VStack>

        <VStack>

          <Text> Amount Out</Text>
          <HStack>

            {true ? <AmountInput amount={amount2} handleAmountChange={handleAmountChange2} /> : (<></>)}
            <Spacer minW="2" />
            <Select
      placeholder="Select a token"
      fontStyle={token2 ? "normal" : "italic"}
      fontFamily="Arial, sans-serif"
      color="black"
      value={token2}
      onChange={handleTokenChange2}
      mr={2}
      borderColor="black"
      borderWidth="1px"
      _hover={{ boxShadow: "lg" }} // Larger shadow on hover
      _focus={{ boxShadow: "xl" }}
    >
      <option value="WETH">WETH</option>
      <option value="USDT">USDT</option>
    </Select>
          </HStack>
        </VStack>

      </VStack >
      <HStack>
        
        <Textarea
        
        
        value={secretKey} onChange={(e:any)=>{setSecretKey(e.target.value)}}
        placeholder="Enter your secret key here..."

      
       borderColor="black"
       borderWidth="1px"
       _placeholder={{
         // Adding styles to the placeholder
         color: "black", // Sets the color of the placeholder text
         fontFamily: "Arial, sans-serif", // Changes the font family of the placeholder
         fontStyle: "italic", // Optionally, makes the placeholder text italic
       }}
       boxShadow="hg" // Apply medium shadow predefined by Chakra UI
       _hover={{ boxShadow: "lg" }} // Larger shadow on hover
       _focus={{ boxShadow: "xl" }}
       minW="150"
        >

        </Textarea>



      </HStack>
      <Button mt="1rem" isDisabled = {secretKey == ""} bg="primary" 
          borderColor="black" // Sets the border color
          borderWidth="1px" // Sets the border width
          borderStyle="solid" mr={2}
          loadingText="Swapping..."
          isLoading={isLoading}
          onClick={async ()=>{
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 7000));
            setCompeleted(true);
            setIsLoading(false);
            console.log("Swap")}}
          >
          
          Swap
        </Button>
        <Text> {!compeleted?(<></>):(<>
        Your swap has been completed successfully.
        </>)}</Text>
    </Flex >
  );
};

export default SwapBox;
