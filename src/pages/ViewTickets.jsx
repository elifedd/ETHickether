import React, { useState } from 'react';
import ConnectWalletModal from '../components/ConnectWalletModal';
import Navbar from '../components/Navbar';

function calculateFlightDuration(departureTime, arrivalTime) {

  const departure = new Date(`2023-01-01 ${departureTime}`);
  const arrival = new Date(`2023-01-01 ${arrivalTime}`);
  const timeDifference = arrival - departure;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}

function Flight({ number, origin, destination, departureTime, arrivalTime }) {
  
  const duration = calculateFlightDuration(departureTime, arrivalTime);

  return (
    <div>
      <h3>Flight Number: {number}</h3>
      <p>Origin: {origin}</p>
      <p>Destination: {destination}</p>
      <p>Departure Time: {departureTime}</p>
      <p>Arrival Time: {arrivalTime}</p>
      <p>Duration: {duration.hours} hours and {duration.minutes} minutes</p>
      <hr />
    </div>
  );
}

function ViewTickets() {
  const [openModal, setOpenModal] = useState(false);
  
  const flights = [
    { number: "FL001", origin: "New York", destination: "Los Angeles", departureTime: "08:00 AM", arrivalTime: "12:00 PM" },
    { number: "FL002", origin: "Chicago", destination: "Miami", departureTime: "10:30 AM", arrivalTime: "02:45 PM" },
    { number: "FL003", origin: "San Francisco", destination: "Seattle", departureTime: "01:15 PM", arrivalTime: "03:30 PM" }
  ];

  return (
    <div>
       <Navbar />
      <div className='fligts-container'>
        <div className='flight'>
          {flights.map((flight, index) => (
            <Flight key={index} {...flight} />
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Connect Wallet
      </button>
      {openModal && <ConnectWalletModal closeModal={setOpenModal}/>}
    </div>
  );
}

export default ViewTickets;
