"use client";

import { useState } from "react";
import { Button, Input, Flex, Textarea, VStack, Text } from "@chakra-ui/react";
import { generateSecretKey } from "@/utils/secretKeyGenerator";

const SecretKeyGenerator = () => {
  const [secretKey, setSecretKey] = useState("");
  const [generated, setGenerated] = useState(false);
  const [sent, setSent] = useState(false);


  const handleGenerateKey = async () => {
    const newKey =await generateSecretKey();
    console.log(newKey.privateKey);
    
    setSecretKey(newKey.privateKey);
    setGenerated(true);
    setSent(false); // Reset sent state when generating a new key
  };


  const handleChange = (event) => {
    setSecretKey(event.target.value);
    if (event.target.value === "") {
      
      setGenerated(false);
    }
  };

  return (
    <VStack  >
      <Button borderWidth={"1px"} borderColor={"black"} onClick={handleGenerateKey} isDisabled={generated || !!secretKey}>
        Generate Secret Key
      </Button>
      {generated?
      (<>
      <Textarea
       defaultValue={0}
       borderColor="black"
       value={secretKey}
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
       minW="150">
         </Textarea>
      </>):(<><Textarea
        value={secretKey}
        placeholder="Put your secret key here or generate a new one."
        onChange={handleChange}
        isReadOnly={generated || sent}
        bg={sent ? "green.100" : undefined}
        defaultValue={0}
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
      /></>)
      
    }
    <Text>Copy and safely store your secret key!</Text>
   
    </VStack>
  );
};

export default SecretKeyGenerator;
