import React, { useState } from 'react';
import { ReactComponent as DigitalWalletPayment } from '../assets/digital-wallet-payment.svg';
import { ReactComponent as MetaMask } from '../assets/metamask.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

function ConnectWalletModal({ closeModal, flightTicketPrice, origin, destination, departureTime, arrivalTime, airline}) {
  const history = useHistory();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    /* TODO will be clear
    try {
      const response = await axios.post('/payment', {
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
    */
    connectMetamask();
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
    const Address = "0xCB558F4Da13bBa82F4675B00e0613D368b82C4B7";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract( ABI, Address);
    // setTicketPrices();
    // console.log(window.contract);
  }

  // testing purposes only
  // read contract
  // const readContract = async () => {
  //   // call is used for read data
  //   const data = await window.contract.methods.count().call();
  //   console.log('count: ', data);
  // }

  // TODO: write smart contract for the project :)

    // Set ticket prices in your flight ticket contract
    const setTicketPrices = async () => {
      console.log(flightTicketPrice);
      try {
        // Replace 'setTicketPrices' with the actual function in your smart contract to set ticket prices
        const receipt = await window.contract.methods.ticketPrice(flightTicketPrice).send({ from: walletAddress });

        console.log('Transaction hash:', receipt.transactionHash);

        if (receipt.status) {
          console.log('Ticket prices set successfully!');
        } else {
          console.error('Setting ticket prices failed');
        }
      } catch (error) {
        console.error('Error setting ticket prices:', error);
      }
    };

  const interactWContract = async () => {
    await connectContract();
    try {
      setLoading(true);
      const receipt = await window.contract.methods.increment().send({ from: walletAddress });

      console.log('Transaction hash:', receipt.transactionHash);

      if (receipt.status) {
        console.log('Transaction successful!');
        setLoading(false);
        try {
          const response = await axios.post('/payment', {
            // your request payload/data
            flightInformations: `FlightCompany: ${airline}\n
                    From: ${origin}\n
                    To: ${destination}\n
                    Arrival Time: ${departureTime}\n
                    Destination Time: ${arrivalTime}`

          });

          console.log('Response from server:', response.data);
        } catch (error) {
          console.error('Error sending request:', error);
        }
        history.push('/paymentCompleted');
        window.location.reload();
      } else {
        console.error('Transaction failed');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending transaction:', error);
    }
    // await readContract();
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
                <button className='continue-btn' onClick={interactWContract} disabled={isLoading}>
                  {isLoading ? (
                    <ReactLoading type={'bubbles'} color={'#fff'} height={20} width={20} />
                  ) : (
                    'CONTINUE TO BUY'
                  )}
                </button>
                <button className='disconnect-btn' onClick={disconnectMetamask}>disconnect wallet</button>
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
