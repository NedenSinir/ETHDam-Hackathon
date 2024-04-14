// pages/page.tsx
import React, { useState } from "react";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useSDK } from "@metamask/sdk-react-ui";
import { exec } from "child_process";

const ButtonState = (amount, token) => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

 
  const connect = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const executeSwap = (amount, token) => { };

  return (
    <div>
      {!connected ? (
        <Button
          bg="primary"
          onClick={connect}
          borderColor="black" // Sets the border color
          borderWidth="1px" // Sets the border width
          borderStyle="solid"
        >
          Connect Wallet
        </Button>
      ) : (
        <Flex direction={"column"} align="center">
          <Button
            bg="primary"
            borderColor="black" // Sets the border color
            borderWidth="1px" // Sets the border width
            borderStyle="solid"
            onClick={executeSwap(amount, token)}
          >
            Swap
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default ButtonState;
