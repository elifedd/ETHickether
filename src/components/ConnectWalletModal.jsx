import React from 'react';
import { ReactComponent as DigitalWalletPayment } from '../assets/digital-wallet-payment.svg';
import { ReactComponent as MetaMask } from '../assets/metamask.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
import axios from 'axios';

function ConnectWalletModal({ closeModal }) {
  const handleButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/deneme', {
        // your request payload/data
        key1: 10,
        key2: 20,
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button className='modalContainer-closeBtn'
          onClick={() => closeModal(false)}
        >
          <CloseIcon />
        </button >
        <div className='modalContainer-left'>
          <h2 className='modalContainer-left__title'>Connect your wallet</h2>
          <p className='modalContainer-left__subtitle'>Select the network that you want to connect below</p>
          <div className='modalContainer-left__container'>
            <h3 className='modalContainer-left__container--title'>Choose Wallet</h3>
            <button className='modalContainer-left__container--btn' onClick={handleButtonClick}>
              <MetaMask />
              <span>MetaMask</span>
            </button>
          </div>
        </div>
        <div className='modalContainer-right'>
          <DigitalWalletPayment />
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal;
