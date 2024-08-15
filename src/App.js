import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from "react";
// import { Contract, providers } from "ethers";

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  // state for keeping track of current connected account.
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
        setIsWalletInstalled(true);
    }
}, []);

  async function connectWallet(e) {
    e.preventDefault();

    // try {
    //   // A Web3Provider wraps a standard Web3 provider, which is
    //   // what MetaMask injects as window.ethereum into each page
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);

    //   // MetaMask requires requesting permission to connect users accounts
    //   const res = await provider.send("eth_requestAccounts", []);

    //   debugger;

    //   // The MetaMask plugin also allows signing transactions to
    //   // send ether and pay to change state within the blockchain.
    //   // For this, you need the account signer...
    //   const signer = provider.getSigner()

    //   debugger;
    // } catch(err) {
    //   console.error(err);
    //   alert("Something went wrong");
    // }

    window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          setAccount(accounts[0]);
        })
        .catch((err) => {
          console.error(err);
          alert("Something went wrong");
        });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {account === null ? (
          <div className="App">
          {
            isWalletInstalled ? (
              <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
              <p>Install Metamask wallet</p>
            )
          }

        </div>
        ) : (
          <div>
            <p><b>Connected as:</b> {account}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
