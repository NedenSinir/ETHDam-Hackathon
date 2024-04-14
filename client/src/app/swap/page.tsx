"use client"
import DepositBox from '@/components/DepositBox';
import SecretBox from '@/components/SecretBox';
import SecretKeyGenerator from '@/components/SecretKeyGenerator';
import SwapBox from '@/components/SwapBox';
import WithdrawBox from '@/components/WithdrawBox';
import { Flex, HStack, Spacer, VStack, Text, Box, Center } from '@chakra-ui/react'


export default function Home() {
  return (
    <VStack>
      <HStack alignItems={"flex-start"}>
        <VStack>
        <Text fontSize={"4rem"} className="logoFont">Deposit</Text>
        <VStack>
          <DepositBox />
          <SecretBox></SecretBox>
        </VStack>
        </VStack>
        <VStack>
          <Text fontSize={"4rem"} className="logoFont">Swap</Text>
          <SwapBox/>
        </VStack>
        <VStack>
        <Text fontSize={"4rem"} className="logoFont">Withdraw</Text>
          <WithdrawBox />
        </VStack>
      </HStack>
    </VStack>
  )
}