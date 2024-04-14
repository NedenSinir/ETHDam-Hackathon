import React from 'react'; 
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
 
interface ErrorTransactionProps { 
 
} 
 
const ErrorTransaction: React.FC<ErrorTransactionProps> = () => { 
    return ( 
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your transaction has failed.</AlertDescription>
        </Alert>
    ); 
}

export default ErrorTransaction;