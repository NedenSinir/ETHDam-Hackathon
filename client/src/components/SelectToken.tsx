import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const SelectToken = ({ token, handleTokenChange }) => {
  return (
    <Select
      placeholder="Select a token"
      fontStyle={token ? "normal" : "italic"}
      fontFamily="Arial, sans-serif"
      color="black"
      value={token}
      onChange={handleTokenChange}
      mr={2}
      borderColor="black"
      borderWidth="1px"
      _hover={{ boxShadow: "lg" }} // Larger shadow on hover
      _focus={{ boxShadow: "xl" }}
    >
      <option value="WETH">WETH</option>
    </Select>
  );
};

export default SelectToken;
