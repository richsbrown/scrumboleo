import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { signInWithEmail, resetError } from '../../features/auth/authSlice'

import Navbar3 from '../../components/Navbar3'
import './auth.css'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const user = useAppSelector((state) => state.auth.user)
    const error = useAppSelector((state) => state.auth.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
      document.title = 'Sign In'
    },[])

    const canSubmit = email && password ? true : false

    const handleSubmit = (e: any) => {
      e.preventDefault()
      if(!email || !password){
        alert('All Fields Are Required')
        return
      }
      dispatch(signInWithEmail({email, password}))
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
            <span className='title'>Sign In</span>
            <form className='auth-form' onSubmit={handleSubmit}>
                <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <button disabled={!canSubmit} className='button'>Submit</button>
                <span 
                className='error-msg'
                style={{visibility: !error ? 'hidden' : 'visible'}}
                >'Sign In failed, please try again'</span>
            </form>
         </div>

    </div>
  )
}

export default React.memo(SignIn)