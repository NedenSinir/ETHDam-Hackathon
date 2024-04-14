import React from 'react'; 
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
 
interface TransactionConfirmedProps { 
 
} 
 
const TransactionConfirmed: React.FC<TransactionConfirmedProps> = () => { 
    return ( 
        <Alert status='success'>
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your transaction has been completed.</AlertDescription>
        </Alert>
    ); 
}

export default TransactionConfirmed;