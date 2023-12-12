import React from 'react';
import { ReactComponent as Airplane } from '../assets/airplane.svg';
import { ReactComponent as Basket } from '../assets/basket.svg';

function Navbar() {
  return (
    <nav className='navbar'>
      <Airplane className='navbar-logo' />
      <Basket className='navbar-basket'/>
    </nav>
  )
}

export default Navbar;
