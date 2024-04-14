"use client";
import { useState } from "react";
import { Input, Flex, Button, CloseButton } from "@chakra-ui/react";

interface Wallet {
  address: string;
  amount: string;
}

const WithdrawalBox = () => {
  const [wallets, setWallets] = useState<Wallet[]>([
    { address: "", amount: "" },
  ]);

  const handleInputChange = (
    index: number,
    key: keyof Wallet,
    value: string
  ) => {
    const newWallets = [...wallets];
    newWallets[index][key] = value;
    setWallets(newWallets);
  };

  const handleAddWallet = () => {
    setWallets([...wallets, { address: "", amount: "" }]);
  };

  const handleRemoveWallet = (index: number) => {
    if (index === 0) return; // Prevent removing the first address
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);
  };

  const handleWithdrawal = () => {
    // Handle withdrawal logic here
    console.log("Withdrawal initiated:", wallets);
    // You can perform your withdrawal logic here, like sending a request to an API
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      margin="auto"
      border="2px solid black"
      borderRadius="md"
      p={4}
      maxHeight="300px"
      overflowY="auto"
      bgGradient="linear(to-r, #5be3d5, secondary)"
    >
      {wallets.map((wallet, index) => (
        <Flex key={index} alignItems="center" mb={4}>
          <Flex flex="3" alignItems="center">
            <Input
              flex="1"
              placeholder="Enter Wallet Address"
              value={wallet.address}
              onChange={(e) =>
                handleInputChange(index, "address", e.target.value)
              }
              border="1px solid black"
              borderRadius="md"
              mr={2}
              bgColor="#3ae8d7"
              _placeholder={{
                // Adding styles to the placeholder
                color: "black", // Sets the color of the placeholder text
                fontFamily: "Arial, sans-serif", // Changes the font family of the placeholder
                fontStyle: "italic", // Optionally, makes the placeholder text italic
              }}
              _hover={{ boxShadow: "lg" }} // Larger shadow on hover
              _focus={{ boxShadow: "xl" }}
            />
          </Flex>
          <Flex flex="1" alignItems="center">
            <Input
              flex="1"
              type="number"
              placeholder="Amount"
              bgColor="#3ae8d7"
              value={wallet.amount}
              onChange={(e) =>
                handleInputChange(index, "amount", e.target.value)
              }
              _placeholder={{
                // Adding styles to the placeholder
                color: "black", // Sets the color of the placeholder text
                fontFamily: "Arial, sans-serif", // Changes the font family of the placeholder
                fontStyle: "italic", // Optionally, makes the placeholder text italic
              }}
              border="1px solid black"
              borderRadius="md"
              _hover={{ boxShadow: "lg" }} // Larger shadow on hover
              _focus={{ boxShadow: "xl" }}
            />
          </Flex>
          {index !== 0 && (
            <Flex alignItems="center" width="32px">
              <CloseButton
                size="sm"
                onClick={() => handleRemoveWallet(index)}
              />
            </Flex>
          )}
        </Flex>
      ))}
      <Flex>
        <Button
          bg="primary"
          onClick={handleWithdrawal}
          mr={2}
          border="1px solid black"
          borderRadius="md"
          color="black" // Sets the text color to black
        >
          Withdraw
        </Button>
        <Button
          bg="primary"
          onClick={handleAddWallet}
          border="1px solid black"
          borderRadius="md"
        >
          + Add Wallet
        </Button>
      </Flex>
    </Flex>
  );
};

export default WithdrawalBox;
