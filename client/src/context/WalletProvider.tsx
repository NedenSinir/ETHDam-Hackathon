"use client"
import React from 'react';
import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";


const WalletProvider = ({ children }: any) => {
    const url = typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000';

    return (
            <MetaMaskUIProvider
                debug={true}
                sdkOptions={{
                    dappMetadata: {
                        name: "Example React Dapp",
                        url: url,
                    },
                    infuraAPIKey: process.env.INFURA_API_KEY,
                }}
            >
                {children}
            </MetaMaskUIProvider>
    );
};

export default WalletProvider;