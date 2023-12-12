import React, { useState } from 'react';
import ConnectWalletModal from '../components/ConnectWalletModal';

function Order() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='orderPage'>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Connect Wallet
        </button>
        {openModal && <ConnectWalletModal closeModal={setOpenModal}/>}
    </div>
  )
}

export default Order;