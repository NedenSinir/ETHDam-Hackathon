import React, { useState } from "react"; // Import React
import { Input } from "@chakra-ui/react";

const AmountInput = ({ amount, handleAmountChange }) => {
  // Define a component named AmountInput

  return (
    <Input
      defaultValue={0}
      min={0}
      value={amount}
      borderColor="black"
      borderWidth="1px"
      _placeholder={{
        // Adding styles to the placeholder
        color: "black", // Sets the color of the placeholder text
        fontFamily: "Arial, sans-serif", // Changes the font family of the placeholder
        fontStyle: "italic", // Optionally, makes the placeholder text italic
      }}
      placeholder="Amount"
      boxShadow="hg" // Apply medium shadow predefined by Chakra UI
      _hover={{ boxShadow: "lg" }} // Larger shadow on hover
      _focus={{ boxShadow: "xl" }}
      onChange={handleAmountChange}
      minW="150"
    ></Input>
  );
};

export default AmountInput; // Export the component named AmountInput
