import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import maracas from '../../assets/maracas.svg'
import './navbar.css';

const Navbar = (props) => {

  const { auth } = props;

  return (
    <div>
      <div className='navbar'>
      <div className='navbar_title'>
      <NavLink className={'scrumboleo_title'} to='/'>SCRUMBOLEO
         <img className='maracas_logo' src={maracas} alt={'maracas'}/>
      </NavLink>
      </div>
      <div className='navbar_links'>
      { auth ? <SignedInLinks/> :
      <SignedOutLinks/> }
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
  }
}

export default connect(mapStateToProps)(Navbar)