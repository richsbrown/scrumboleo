import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signUpWithEmail } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './signIn.css';

const SignUp = (props) => {

  const { auth, authError, resetAuthError } = props;
  const navigate = useNavigate();
  if(auth) navigate("/");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {
      resetAuthError()
    }, 4000)
  }, [authError])

  const canSubmit = firstName && lastName && email && password ? true : false

  function handleSubmit(event){
    event.preventDefault();
    if(!firstName || !lastName || !email || !password){
      alert('All Fields Are Required')
      return
    }
    props.signUpWithEmail({firstName, lastName, email, password})
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if(auth) navigate("/");
  },[auth])

  return (
    <div className='container'>
      <form
      className='form' 
      onSubmit={handleSubmit}
      >
        <h5 className="title">Sign Up</h5>

        <div className="input-field">
          <input 
          type='text' 
          id='firstName'
          placeholder='first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <input 
          type='text' 
          id='lastName'
          placeholder='last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <input 
          type='email' 
          id='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <input 
          type='password' 
          id='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <button disabled={!canSubmit}>
            Sign Up
          </button>
          <div className='errorMsg_container'>
          { authError !== null && authError !== 'login failed' ? <p className='error_msg'>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpWithEmail: (newUser) => dispatch(signUpWithEmail(newUser)),
    resetAuthError: () => dispatch({ type: 'RESET_AUTH_ERROR' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);