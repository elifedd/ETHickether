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

function formatPrice(priceInEth) {
  const numericPrice = parseFloat(priceInEth);
  const formattedPrice = numericPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 8 });
  const trimmedPrice = formattedPrice.replace(/(\.\d*?[1-9])0+$/g, '$1');

  return `${trimmedPrice} ETH`;
}


function Flight({ airline, logo, origin, destination, departureTime, arrivalTime, priceInEth }) {
  const duration = calculateFlightDuration(departureTime, arrivalTime);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='flight-card'>
      <img className='flight-card__logo' src={logo} alt={airline} />
      <div className='flight-info'>
        <p className='flight-info__time'>{departureTime}</p>
        <span className='flight-info__loc'>{origin}</span>
      </div>
      <div className='flight-duration'>
        <svg className='flight-duration__img' xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/></svg>
        <div className='flight-duration__shapes'>
          <div className='circle'></div>
          <div className='line'></div>
          <div className='circle circle-filled'></div>
        </div>
        <p className='flight-duration__val'>{duration.hours}h {duration.minutes}m</p>
      </div>
      <div className='flight-info'>
        <p className='flight-info__time'>{arrivalTime}</p>
        <span className="flight-info__loc">{destination}</span>
      </div>
      <div className='flight-action'>
        <p className='flight-action__price'>{formatPrice(priceInEth)}</p>
        <button
            className='flight-action__btn'
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            Buy Flight
          </button>
        {openModal && <ConnectWalletModal closeModal={() => setOpenModal(false)} flightTicketPrice={priceInEth} origin={origin} destination={destination} departureTime={departureTime} arrivalTime={arrivalTime} airline={airline} />}
      </div>
    </div>
  );
}

function ViewTickets() {
  const flights = [
    { number: "FL001", airline: "Delta Airlines", logo: "https://s3.amazonaws.com/static.beavercountyradio.com/wp-content/uploads/2020/01/30135727/Delta-Airlines-Logo.jpg", origin: "New York", destination: "Los Angeles", departureTime: "08:00 AM", arrivalTime: "12:00 PM", priceInEth: 0.0001 },
    { number: "FL002", airline: "United Airlines", logo: "https://logowik.com/content/uploads/images/united-airlines-old8802.logowik.com.webp", origin: "Chicago", destination: "Miami", departureTime: "10:30 AM", arrivalTime: "02:45 PM", priceInEth: 0.0002 },
    { number: "FL003", airline: "American Airlines", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtHGeBSudT56w7LzvO74me7EKobaUwQUrS9aokj6Stg&s", origin: "San Francisco", destination: "Seattle", departureTime: "01:15 PM", arrivalTime: "03:30 PM", priceInEth: 0.0004 }
  ];

  return (
    <div className='viewTickets'>
      <Navbar />
      <div className='flights-container'>
        {flights.map((flight, index) => (
          <Flight key={index} {...flight} />
        ))}
      </div>
    </div>
  );
}

export default ViewTickets;
