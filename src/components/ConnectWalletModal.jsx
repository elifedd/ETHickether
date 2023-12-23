import React, { useState } from 'react';
import { ReactComponent as DigitalWalletPayment } from '../assets/digital-wallet-payment.svg';
import { ReactComponent as MetaMask } from '../assets/metamask.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
import axios from 'axios';
import Web3 from 'web3';

function ConnectWalletModal({ closeModal }) {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const handleButtonClick = async () => {
    connectMetamask();

    try {
      const response = await axios.post('/api/deneme', {
        // your request payload/data
        key1: 10,
        key2: 20,
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  async function connectMetamask() {
    if (window.ethereum) {
      try {
        // Request access to the user's accounts
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        // Use the current MetaMask selected/active wallet address
        const walletAddress = accounts.length > 0 ? accounts[0] : undefined;

        if (walletAddress) {
          setWalletConnected(true);
          setWalletAddress(walletAddress);
          console.log(`Wallet: ${walletAddress}`);
        } else {
          console.error('No wallet address available.');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log("No wallet");
    }
  }

  // connect contract
  const connectContract = async () => {
    const ABI = [
      {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "count",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const Address = "0xBa9Da481Ce20cD4c8E7391b28927E53CaF25C9Bc";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract( ABI, Address);
    console.log(window.contract);
  }

  // read contract
  const readContract = async () => {
    // call is used for read data
    const data = await window.contract.methods.count().call();
    console.log('count: ', data);
  }

  // TODO: write smart contract for the project :)

  const interactWContract = async () => {
    await window.contract.methods.increment().send({ from: walletAddress });
  }

  async function disconnectMetamask() {
    try {
      // Clear the wallet connection state
      setWalletConnected(false);
      setWalletAddress(null);
  
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button className='modalContainer-closeBtn'
          onClick={() => closeModal(false)}
        >
          <CloseIcon />
        </button >
        <div className='modalContainer-left'>
          {isWalletConnected ? ( 
            <div className='wallet-card-container'>
                <div className='wallet-card'>
                  <div className="wallet">
                    <h2 className="wallet-header">Your Wallet</h2>
                    <div className="wallet-account">
                      <div className="wallet-account__img"></div>
                      <div className="wallet-account__text">
                        <p>{walletAddress}</p>
                        <span>Sepholia Account</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className='disconnect-btn' onClick={disconnectMetamask}>disconnect wallet</button>
                {/* TODO: these are not will be buttons will be called from the related functions */}
                {/* this is for testing purposes only */}
                <button onClick={connectContract}>CONNECT TO CONTRACT</button>
                <button onClick={interactWContract}>INCREMENT</button>
                <button onClick={readContract}>GET DATA FROM CONTRACT</button>
              </div>
              
            ) : (
              <>
                <h2 className='modalContainer-left__title'>Connect your wallet</h2><p className='modalContainer-left__subtitle'>Select the network that you want to connect below</p><div className='modalContainer-left__container'>
                <h3 className='modalContainer-left__container--title'>Choose Wallet</h3>
                <button className='modalContainer-left__container--btn' onClick={handleButtonClick}>
                  <MetaMask />
                  <span>MetaMask</span>
                </button>
                </div>
              </>
          )}
        </div>
        <div className='modalContainer-right'>
          <DigitalWalletPayment />
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal;
