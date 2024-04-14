import React from 'react';
import { RadioGroup, Stack, Radio, Divider } from '@chakra-ui/react';

const SelectAmount = ({ amount, setAmount }) => {
  return (
    <RadioGroup onChange={setAmount} value={amount}>
      <Stack direction='row' spacing={6}>
        <Stack direction='column' alignItems='center'>
          <Radio value='0.1' />
          <span style={{ textAlign: 'center' }}>0.1 WETH</span>
        </Stack>
        <Divider orientation="vertical" />
        <Stack direction='column' alignItems='center'>
          <Radio value='1' />
          <span style={{ textAlign: 'center' }}>1 WETH</span>
        </Stack>
        <Divider orientation="vertical" />
        <Stack direction='column' alignItems='center'>
          <Radio value='10' />
          <span style={{ textAlign: 'center' }}>10 WETH</span>
        </Stack>
        <Divider orientation="vertical" />
        <Stack direction='column' alignItems='center'>
          <Radio value='100' />
          <span style={{ textAlign: 'center' }}>100 WETH</span>
        </Stack>
      </Stack>
    </RadioGroup>
  );
};

export default SelectAmount;