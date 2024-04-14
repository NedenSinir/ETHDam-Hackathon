import { PrivateKeyProviderConnector, FusionSDK, Web3Like } from "@1inch/fusion-sdk"
import Web3 from 'web3';
import getCurrentOrders from "./getCurrentOrders";
const rpc = {5:"https://ethereum-goerli.publicnode.com",10200:"https://1rpc.io/gnosis	",421613:"https://endpoints.omniatech.io/v1/arbitrum/goerli/public",420:"https://endpoints.omniatech.io/v1/op/goerli/public",280:"https://testnet.era.zksync.dev",84531:"https://endpoints.omniatech.io/v1/base/goerli/public	",80001:"https://endpoints.omniatech.io/v1/matic/mumbai/public",4002:"https://fantom.api.onfinality.io/public",1442:"https://rpc.public.zkevm-test.net",59140:"https://rpc.goerli.linea.build",44787:"https://alfajores-forno.celo-testnet.org",245022940:"https://testnet.neonevm.org",534351:"https://sepolia-rpc.scroll.io"}




const makerPrivateKey = '0x123....'
const makerAddress = '0x123....'

const placeOrder = async (order: any) => {

    const blockchainProvider = new PrivateKeyProviderConnector(
        makerPrivateKey,
        new Web3(rpc[5]) as Web3Like,
    )
    
    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: 1,
        blockchainProvider
    })
    
    
   const orderInfo = await sdk.placeOrder({
        fromTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
        toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
        amount: '50000000000000000', // 0.05 ETH
        walletAddress: makerAddress,
        // fee is an optional field
        fee: {
            takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
            takingFeeReceiver: '0x0000000000000000000000000000000000000000' //  fee receiver address
        }
    })
    orderInfo.signature
}

function scheduleAsyncTask() {
    const delayInMilliseconds =  60 * 1000;

    // Schedule the async task with a delay
    setTimeout(async () => {
        const currOrders = await getCurrentOrders()
        if (!currOrders) throw new Error("get curr order undefined");
        
        const asyncTasks = currOrders.map(async (order:any) => {
           await placeOrder(order)
        });
    
        const results = await Promise.all(asyncTasks);
    
        console.log("All tasks completed:", results);

        // Reschedule the task for the next execution
        scheduleAsyncTask();
    }, delayInMilliseconds);
}

try {
    scheduleAsyncTask();
    
} catch (error) {
    console.log(error);
    
    
}