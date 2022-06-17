import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import maracas from '../../assets/maracas.svg'
import './navbar.css';

const Navbar = (props) => {

  const { auth, userProfile } = props;

  return (
    <div>
      <div className='navbar'>
      <div className='navbar_title'>
      <NavLink to='/'>SCRUMBOLEO
         <img src={maracas} style={{height: 30, width: 30}} alt={'maracas'}/>
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
    userProfile: state.firebase.userProfile
  }
}

export default connect(mapStateToProps)(Navbar)