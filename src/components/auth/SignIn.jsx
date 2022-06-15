import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signInWithEmail } from '../../store/actions/authActions'
import { useNavigate } from 'react-router-dom';
import './signIn.css';

const SignIn = (props) => {
  
  const { auth, authError, resetAuthError } = props;
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const input = {email, password}

  useEffect(() => {
   if(authError){
     setTimeout(() => {
      resetAuthError()
    }, 4000)
  }
  }, [authError])


  function handleSubmit (event){
    event.preventDefault();
    if(!email || !password){
      alert('All Fields Are Required')
      return
    }
    //console.log(input);
    props.signInWithEmail({email, password})
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if(auth) navigate("/");
  },[auth])

  return (
    <div className='container'>
   <form
      className='white' 
      onSubmit={handleSubmit}
      >
        <h5 className="title">Login</h5>

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
          <button>
            Login
          </button>
          <div className='errorMsg_container'>
          { authError === 'login failed' ? <p className='error_msg'>Invalid credentials, try again.</p> : null }
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
    signInWithEmail: (credentials) => dispatch(signInWithEmail(credentials)),
    resetAuthError: () => dispatch({ type: 'RESET_AUTH_ERROR' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
