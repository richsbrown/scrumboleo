import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';
import { CgProfile } from 'react-icons/cg'


const SignedInLinks = (props) => {

  let { signOut } = props;
  
  return (
       <ul className='navbar_signedInLinks'>
       <li className='linkItem_singedIn'><NavLink to='/profile'><CgProfile className='profile_icon' title='Your Profile'/></NavLink></li>
       <li className='linkItem_signedIn'><a style={{cursor: "pointer"}} onClick={signOut}>Logout</a></li>
     </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.firebase.userProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
