import React from 'react';
import airportImg from '../assets/airport.jpg';

function SuccessPayment() {
  return (
    <div className='paymentCompleted-wrapper'>
      <div className='paymentCompleted'>
        <img className='paymentCompleted-img' src={airportImg} alt='airport' />
        <h2 className="paymentCompleted-header">PAYMENT COMPLETED</h2>
        <p className="paymentCompleted-text">Thank you for ordering.</p>
        <p className="paymentCompleted-text">Have a safe flight!</p>
      </div>
    </div>
  );
}

export default SuccessPayment;
