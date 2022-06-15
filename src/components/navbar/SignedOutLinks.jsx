import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';


const SignedOutLinks = () => {
  return (
  <ul className='navbar_signedOutLinks'>
    <li className='linkItem'><NavLink to='/signup'>Sign Up</NavLink></li>
    |
    <li className='linkItem'><NavLink to='/signin'>Login</NavLink></li>
  </ul>
  )
}

export default SignedOutLinks