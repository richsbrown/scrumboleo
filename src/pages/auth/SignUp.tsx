import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { signUpWithEmail, resetError } from '../../features/auth/authSlice'

import Navbar3 from '../../components/Navbar3'
import './auth.css'

function SignUp() {

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const user = useAppSelector((state) => state.auth.user)
    const error = useAppSelector((state) => state.auth.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
      document.title = 'Sign Up'
    },[])
    
    const canSubmit = firstName && lastName && email && password ? true : false

    const handleSubmit = (e: any) => {
      e.preventDefault()
      if(!firstName || !lastName || !email || !password){
        alert('All Fields Are Required')
        return
      }

      firstName = firstName.trim()
      lastName = lastName.trim()
      email = email.trim()
      password = password.trim()

      dispatch(signUpWithEmail({firstName, lastName, email, password}))
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }

    useEffect(() => {
      if(user)navigate('/')
    }, [user])

    useEffect(() => {
      if(error){
      const timer = setTimeout(() => {
        dispatch(resetError())
      }, 4000)
      return () => clearTimeout(timer)
      }
    }, [error])

  return (
    <div className='container-auth'>
        <Navbar3 />
        <div className='sub-container-auth'>
          <span className='title'>Sign Up</span>
            <form className='auth-form' onSubmit={handleSubmit}>
              <input type='text' placeholder='first name' value={firstName} onChange={e => setFirstName(e.target.value)}></input>
              <input type='text' placeholder='last name' value={lastName} onChange={e => setLastName(e.target.value)}></input>
              <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}></input>
              <input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}></input>
              <button disabled={!canSubmit} className='button'>Submit</button>
              <span 
                className='error-msg'
                style={{visibility: !error ? 'hidden' : 'visible'}}
                >'Sign Up failed, please try again'</span>
            </form>
        </div>

    </div>
  )
}

export default SignUp