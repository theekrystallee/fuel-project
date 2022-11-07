import React, { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi__factory } from "./contracts";
// The address of the contract deployed the Fuel testnet
const CONTRACT_ID = "0xedc27cce6b5f0cb43766e7623c28f9511d9a526e0501603859bed30943b075b6";
//the private key from createWallet.js
const WALLET_SECRET = "0xbc3723e8c05d5e449f7cdc768b3d6e0254659b6236f6dc3f5604f6bf04bf7a13"
// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = new Wallet(WALLET_SECRET, "https://node-beta-1.fuel.network/graphql");
// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);

export default function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    }
    main();
  }, []);
  async function increment() {
    // a loading state
    setLoading(true);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.increment().txParams({gasPrice:1}).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } finally {
      setLoading(false);
    }
  }

  async function decrement() {
    // a loading state
    setLoading(true);
    // Creates a transactions to call the decrement function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.decrement().txParams({gasPrice:1}).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>
          First Fuel App ⛽
      </h1>
      <div className="App-header">
        <h1>
          Counter: {counter}
        </h1>
          <button className="button" disabled={loading} onClick={increment}>
            {loading ? "Loading..." : "Increment➕➕"}
          </button>
          <button className="button" disabled={loading} onClick={decrement}>
            {loading ? "Loading..." : "Decrement➖➖"}
          </button>
      </div>
    </div>
  );
}
