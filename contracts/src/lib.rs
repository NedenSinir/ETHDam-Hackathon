//! A minimal hello world smart contract.
extern crate alloc;

use std::collections::hash_map::DefaultHasher;
use alloy_core::{primitives::hex, primitives::Address};
use std::fs::read_to_string;
use std::hash::{Hash, Hasher};
use alloy_core::primitives::{Bytes, ChainId, U256};
use oasis_contract_sdk as sdk;
use oasis_contract_sdk_storage::cell::{ConfidentialCell, PublicCell};
use oasis_contract_sdk_storage::map::ConfidentialMap;
use crate::Error::BadRequest;
use heapless::spsc::{Queue};

/// All possible errors that can be returned by the contract.
///
/// Each error is a triplet of (module, code, message) which allows it to be both easily
/// human readable and also identifyable programmatically.
#[derive(Debug, thiserror::Error, sdk::Error)]
pub enum Error {
    #[error("bad request")]
    #[sdk_error(code = 1)]
    BadRequest,
}

/// All possible requests that the contract can handle.
///
/// This includes both calls and queries.
#[derive(Clone, Debug, cbor::Encode, cbor::Decode)]
pub enum Request {
    #[cbor(rename = "deposit")]
    Deposit { signed_tx: Bytes, secret: Bytes },

    #[cbor(rename = "swap")]
    Swap { who: String }, //TODO: use the right data format

    #[cbor(rename = "withdraw")]
    Withdraw { who: String }, //TODO: use the right data format
}

/// All possible responses that the contract can return.
///
/// This includes both calls and queries.
#[derive(Clone, Debug, Eq, PartialEq, cbor::Encode, cbor::Decode)]
pub enum Response {
    #[cbor(rename = "Success")]
    Susccessfull,

    #[cbor(rename = "empty")]
    Empty,
}

/// The contract type.
pub struct AnonCow;

const PUBLIC_KEY: PublicCell<Address> = PublicCell::new(b"0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5");

const WETH: PublicCell<Address> = PublicCell::new(b"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");

const SECRET_KEY: ConfidentialCell<Bytes> = ConfidentialCell::new(b"0x1f9090aaE28b8a3dCeaDf281B0F12828e676c3261515135118966698dffa5655c");

const DRPC_API_KEY: ConfidentialCell<String> = ConfidentialCell::new(b"Ak9bHUcCkExjh1z5Bsp_BiaF-EcY-e8R7pUingOF84-p");

const HEX_TO_ADDRESS_MAP: ConfidentialMap<Bytes, ConfidentialMap<Address, alloy_core::primitives::U256>> = ConfidentialMap::new(&[]);

// Create a queue that can hold up to 31 elements of type Bytes
type MyQueue = Queue<Bytes, 32>;
const my_queue_withdrawals: MyQueue = MyQueue::new();

const my_queue_swaps: MyQueue = MyQueue::new();


impl AnonCow {

    /// Increment the counter and return the previous value.
    async fn deposit<C: sdk::Context>(ctx: &mut C, signature: String, tx_hash: bytes, public_key: bytes, secret: bytes) {
        //Verify the signature
        // Hashing strings
        let mut hasher = DefaultHasher::new();
        let text = str::from_utf8(tx_hash) + str::from_utf8(public_key) + str::from_utf8(secret);
        text.hash(&mut hasher);
        let signed_hash = hasher.finish();
        if signed_hash != signature {
            BadRequest
        }
        //Call dRPC
        let response = reqwest::get("https://lb.drpc.org/ogrpc?network=ethereum&dkey=" + DRPC_API_KEY).await?;
        //
        // Check if the request was successful (status code 200)
        if !response.status().is_success() {
            // Read the response body as a string
            BadRequest
        }
        let body = response.text().await?;
        let additional_balance = body.amount;


        let total_balance = additional_balance;
        // Accessing the values
        if let Some(inner_map) = HEX_TO_ADDRESS_MAP.get(ConfidentialCell::new("balance"), secret) {
            if let Some(value) = inner_map.get(ConfidentialCell::new("balance"), WETH) {
                total_balance += value;
                inner_map.insert(ConfidentialCell::new("balance"), WETH, total_balance);
            }
            else {
                // Inserting some values
                let mut inner_map = ConfidentialMap::new("new_balance");
                inner_map.insert(ConfidentialCell::new(&[]), WETH, total_balance);
                HEX_TO_ADDRESS_MAP.insert(ConfidentialCell::new("balance"), secret.to_string(), inner_map);
            }
        }
    }

    fn swap<C: sdk::Context>(ctx: &mut C, signature: String, token_out: U256, token_in: U256, chain_id: ChainId, secret: Bytes) {
        //Verify the signature
        let mut hasher = DefaultHasher::new();
        let text = str::from_utf8(token_out) + str::from_utf8(token_in) + str::from_utf8(chain_id) + str::from_utf8(secret);
        text.hash(&mut hasher);
        let signed_hash = hasher.finish();
        if signed_hash != signature {
            BadRequest
        }
        //store and publish the intent
        my_queue_swaps.enqueue(text).unwrap()
    }



    fn withdraw<C: sdk::Context>(ctx: &mut C, signature: String, addresses: Vec<Bytes>, token_out: Bytes, chain_id: u16, secret: Bytes) {
        //Verify the signature
        let mut hasher = DefaultHasher::new();
        let text = str::from_utf8(token_out) + str::from_utf8(addresses) + str::from_utf8(chain_id) + str::from_utf8(secret);
        text.hash(&mut hasher);
        let signed_hash = hasher.finish();
        if signed_hash != signature {
            BadRequest
        }
        //add it to the queue
        my_queue_withdrawals.enqueue(text).unwrap();
    }

    async fn update() {
        // Iterate over the queue and make HTTP calls
        while let Some(element) = my_queue_withdrawals.dequeue() {
            // Perform HTTP call for each element
            let response = reqwest::get(format!("https://api.example.com/{}", element)).await?;

            // Check if the request was successful (status code 200)
            if response.status().is_success() {
                // Read the response body as a string
                let body = response.text().await?;
                println!("Response for element {}: {}", element, body);
            } else {
                println!("Request for element {} failed with status code: {}", element, response.status());
            }
        }
    }
}

// Implementation of the sdk::Contract trait is required in order for the type to be a contract.
impl sdk::Contract for AnonCow {
    type Request = Request;
    type Response = Response;
    type Error = Error;

    fn call<C: sdk::Context>(ctx: &mut C, request: Request) -> Result<Response, Error> {
        // This method is called for each contracts.Call call. It is supposed to handle the request
        // and return a response.
        match request {
            Request::Deposit { signed_tx, secret } => {
                // Increment the counter and retrieve the previous value.
                let counter = Self::increment_counter(ctx);

                // Return the greeting as a response.
                Ok(Response::Susccessfull {})
            }
            _ => Err(Error::BadRequest),
        }
    }

    fn query<C: sdk::Context>(_ctx: &mut C, _request: Request) -> Result<Response, Error> {
        // This method is called for each contracts.Query query. It is supposed to handle the
        // request and return a response.
        Err(Error::BadRequest)
    }
}

// Create the required Wasm exports required for the contract to be runnable.
sdk::create_contract!(HelloWorld);