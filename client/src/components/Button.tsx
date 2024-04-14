import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

const ButtonMid = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <Button onClick={handleClick}>ButtonMid</Button>
    </div>
  );
};

export default ButtonMid;
