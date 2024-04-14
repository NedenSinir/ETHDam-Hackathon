// Import necessary modules and packages
import dotenv from "dotenv";
import {
  OrderBookApi,
  OrderCreation,
  OrderKind,
  OrderQuoteSideKindBuy,
  OrderQuoteSideKindSell,
  OrderSigningUtils,
  SigningResult,
  SupportedChainId,
  UnsignedOrder,
} from '@cowprotocol/cow-sdk';
import getCurrentOrders from "./getCurrentOrders";
import { ethers } from "ethers";

// Load environment variables from a .env file
dotenv.config();

// Define RPC endpoints for various Ethereum networks
const rpc = {
  5: "https://ethereum-goerli.publicnode.com",
  10200: "https://1rpc.io/gnosis",
  // ... (other network endpoints)
};

// Define decimal values for specific tokens
const decimals = {
  "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6": 18,
  "0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532": 18,
  // ... (other token decimals)
};

// Define destination mediators for specific chain IDs
const destionation_mediators = {
  10200: "0x35b97f170f439f4C411fAA9076B38A6Bd0BF2247",
  5: "0xe0b65016aB2E1a98853C1f6F7b6462F7c962Ec9D",
  // ... (other destination mediators)
};

// Define Ethereum wallet and provider using ethers.js
async function putOrder(dborder: DbOrder) {
  const wallet = new ethers.Wallet(process.env.PRIV_KEY!);
  const account = wallet.address;
  const targetChainId = dborder.chain_id;
  //@ts-ignore not compatible dict keys but they are correct for sure
  const provider = new ethers.providers.JsonRpcProvider(rpc[dborder.order.sourceChainId]);

  // Define token addresses for specific chains
  const tokens = {
    // ... (define tokens for different chain IDs)
  };

  const goerlySDai = "0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C";
  const goerlyDai = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844";

  // Get signer from the provider
  const signer = provider.getSigner();

  // Get buy and sell tokens based on chain IDs
  //@ts-ignore not compatible dict keys but they are correct for sure
  const buyToken = tokens[targetChainId];
  //@ts-ignore not compatible dict keys but they are correct for sure
  const sellToken = tokens[dborder.order.sourceChainId];

  // Get decimal value for the sell token
  //@ts-ignore not compatible dict keys but they are correct for sure
  const selectedDecimal = decimals[sellToken];

  // Define a quote request for the order
  const quoteRequest = {
    sellToken: sellToken,
    buyToken: buyToken,
    from: account,
    receiver: account,
    buyAmountAfterFee: dborder.order.minDestinationTokenAmount.toString(),
    kind: OrderQuoteSideKindBuy.BUY,
  };

  // Initialize OrderBookApi and get a quote for the order
  const orderBookApi = new OrderBookApi({ chainId: targetChainId });
  const { quote } = await orderBookApi.getQuote(quoteRequest);

  // Define an unsigned order using the obtained quote
  const unsignedOrder: UnsignedOrder = {
    receiver: dborder.order.destinationAddress,
    sellToken: sellToken,
    buyToken: buyToken,
    sellAmount: quote.sellAmount,
    buyAmount: quote.buyAmount,
    validTo: dborder.order.expirationTimestamp,
    appData: quote.appData,
    kind: quote.kind,
    feeAmount: quote.feeAmount,
    partiallyFillable: false,
  };

  // Sign the order using OrderSigningUtils
  const orderSigningResult = await OrderSigningUtils.signOrder(unsignedOrder, targetChainId, signer);

  // Define order creation parameters
  const orderCreation: OrderCreation = {
    sellToken: sellToken,
    buyToken: buyToken,
    sellAmount: quote.sellAmount,
    buyAmount: quote.buyAmount,
    validTo: dborder.order.expirationTimestamp,
    feeAmount: quote.feeAmount,
    partiallyFillable: false,
    //@ts-ignore not compatible enum but it is correct for sure
    signingScheme: orderSigningResult.signingScheme,
    signature: orderSigningResult.signature,
  };

  // Convert JSON to bytes for hooks
  function jsonToBytes(json: Record<string, any>): string {
    const jsonString = JSON.stringify(json);
    const bytes = ethers.utils.toUtf8Bytes(jsonString);
    return ethers.utils.hexlify(bytes);
  }

  // Initialize destination mediator contract
  const DestionationMediator = new ethers.Contract(
    //@ts-ignore not compatible dict keys but they are correct for sure
    destionation_mediators[dborder.chain_id],
    [
      "function depositFunds(bytes memory _json, bytes memory _signature) external",
      "function broadcast(bytes32 _jsonHash) external payable",
    ],
    provider,
  );

  // Initialize token contract
  const Token = new ethers.Contract(
    dborder.order.destinationTokenAddress,
    ["function approve(address spender, uint256 value) external returns (bool)"],
    provider,
  );

  // Initialize DAI token contract
  const daiTokenContract = new ethers.Contract(
    "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
    ["function approve(address spender, uint256 value) external returns (bool)"],
    provider,
  );
  const chainToOracle = {
    11155111: {"ETHUSD": "0x90430C5b8045a1E2A0Fc4e959542a0c75b576439"},
    1442: {"ETHUSD":"0x90430C5b8045a1E2A0Fc4e959542a0c75b576439"},
    100: {"ETHUSD": "0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660"},
    }
    const stopLossChronicleContract = new ethers.Contract(
        //@ts-ignore not compatible dict keys but they are correct for sure
        chainToOracle[order.chain_id]["ETHUSD"],
        [
          `
          function getTradeableOrder(address, address, bytes32, bytes calldata staticInput, bytes calldata) public view;
         `
        ],
        provider,
    );
    
  // Initialize poolSparkContract contract
  const poolSparkContract = new ethers.Contract(
    goerlySDai,
    ["function deposit(uint256 assets, address receiver) external"],
    provider,
  );

  const stopLossChronicleHooks = {
        //@ts-ignore just field bypass for dict object keys
    target: chainToOracle[order.chain_id]["ETHUSD"],
    callData: stopLossChronicleContract.interface.encodeFunctionData("getTradeableOrder", [
    dborder.order.sourceTokenAddress,
    dborder.order.destinationTokenAddress,
    dborder.sign,
    ])
}
  // Define hooks for token approval and order completion
  const approveSDaiHook = {
    target: goerlyDai,
    callData: daiTokenContract.interface.encodeFunctionData("approve", [goerlySDai, dborder.order.minDestinationTokenAmount]),
  };

  const depositDaiHook = {
    target: goerlySDai,
    callData: poolSparkContract.interface.encodeFunctionData("deposit", [dborder.order.minDestinationTokenAmount, wallet.address]),
  };

  const approveHook = {
    target: dborder.order.destinationTokenAddress,
    //@ts-ignore not compatible dict keys but they are correct for sure
    callData: Token.interface.encodeFunctionData("approve", [destionation_mediators[dborder.chain_id], dborder.order.minDestinationTokenAmount]),
  };

  const completeOrderHook = {
    target: DestionationMediator.address,
    callData: DestionationMediator.interface.encodeFunctionData("depositFunds", [
      jsonToBytes(dborder.order),
      dborder.sign,
    ]),
    gasLimit: "228533",
  };

  // Add hooks to appData field in orderCreation
  orderCreation.appData = JSON.stringify({
    metadata: {
      hooks: {
        pre: [],
        post: [approveSDaiHook, depositDaiHook,stopLossChronicleHooks, approveHook, completeOrderHook],
      },
    },
  });

  // Send the order to the OrderBookApi and get the order ID
  const orderId = await orderBookApi.sendOrder(orderCreation);

  // Retrieve the order details using the order ID
  const order = await orderBookApi.getOrder(orderId);

  // Log results
  console.log('Results: ', { orderId, order });
}

// Schedule asynchronous tasks to execute at regular intervals
function scheduleAsyncTask() {
  const delayInMilliseconds = 10 * 1000;

  // Schedule the async task with a delay
  setTimeout(async () => {
    // Get current orders
    const currOrders = await getCurrentOrders();

    // Throw an error if current orders are undefined
    if (!currOrders) throw new Error("get curr order undefined");

    // Map over current orders and execute putOrder for each order
    const asyncTasks = currOrders.map(async (order) => {
      await putOrder(order);
    });

    // Wait for all async tasks to complete
    const results = await Promise.all(asyncTasks);

    // Log completion of all tasks
    console.log("All tasks completed:", results);

    // Reschedule the task for the next execution
    scheduleAsyncTask();
  }, delayInMilliseconds);
}

// Try-catch block to handle errors and start scheduling the async task
try {
  scheduleAsyncTask();
} catch (error) {
  console.log(error);
}