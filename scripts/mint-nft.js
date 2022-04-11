require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xC1d0dCF961f2cdbb12505F78F56eb4435Eb44903";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  // The nonce specification is used to keep track of the number of transactions sent from your address
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  // The transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 2999999987,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmYmBWnp5WKst3pWwaXCwz88ckg6XuQE8RYKm2TWEqecBW"
);
