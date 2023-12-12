import React from 'react';
import SuccessPayment from '../components/SuccessPayment';
import Navbar from '../components/Navbar';

function PaymentCompleted() {
  return (
    <div className='paymentCompletedPage'>
      <Navbar />
      <SuccessPayment />
    </div>
  );
}

export default PaymentCompleted;
