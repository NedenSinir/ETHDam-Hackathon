"use client";

import {
  Flex,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  SliderMark,
  Input,
  IconButton,
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InitialFocus from "./CustomTransaction";
import { SettingsIcon } from "@chakra-ui/icons";

function SliderMarkExample() {
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  // Mapping slider values to time intervals
  const timeIntervals = [
    { value: 25, label: "Hours" },
    { value: 50, label: "Days" },
    { value: 75, label: "Weeks" },
  ];

  const getIncrementalValue = (sliderValue: number) => {
    // Calculating incremental value based on the slider position
    if (sliderValue <= 25) {
      return Math.floor((sliderValue / 26) * 62).toString() + " Minutes";
    } else if (sliderValue <= 50) {
      return Math.floor(((sliderValue - 24) / 26) * 23).toString() + " Hours";
    } else if (sliderValue <= 75) {
      return Math.floor(((sliderValue - 46) / 26) * 6).toString() + " Days";
    } else {
      return (sliderValue - 75).toString() + " Weeks";
    }
  };

  return (
    <Box p={4} pt={6}>
      <Slider aria-label="slider-ex-6" onChange={(val) => setSliderValue(val)}>
        {timeIntervals.map((interval, index) => (
          <SliderMark key={index} value={interval.value} {...labelStyles}>
            {interval.label}
          </SliderMark>
        ))}
        <SliderMark
          value={33}
          textAlign="center"
          bg="white"
          color="black"
          mt="-10"
          ml="-5"
          w="40"
        >
          {getIncrementalValue(sliderValue)}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}


const WithdrawItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [amount, setAmount] = useState(0);

  return (
    <InputGroup width="100%">
      <Input placeholder="Address" />
      <InputRightElement width="4.5rem">
        <>
          <IconButton
            onClick={onOpen}
            h="1.75rem"
            size="sm"
            aria-label="Settings"
            icon={<SettingsIcon />}
          />
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update your settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input ref={initialRef} placeholder="WETH" value={amount} onChange={(e) => { setAmount(parseFloat(e.target.value)) }} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Delay</FormLabel>
                  {/* Replace the Input component with SliderMarkExample */}
                  <SliderMarkExample />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </InputRightElement>
    </InputGroup>
  );
};

export default WithdrawItem;
