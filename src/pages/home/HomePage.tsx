import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetError } from '../../features/auth/authSlice'
import './homePage.css'
import maracas from '../../assets/maracas.svg'

function HomePage() {

  const error = useAppSelector((state) => state.auth.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetError())
  }, [error])

  useEffect(() => {
    document.title = 'Scrumboleo'
  },[])

  return (
    <div className='container'>
        <div className='sub-container-logo'>
            <img className='scrumboleoMaracas' src={maracas} alt='maracas'/>
            <span className='scrumboleoText' role='contentinfo'>Scrumboleo</span>
        </div>
        <div className='sub-container-buttons'>
            <button className='button' onClick={() => navigate('/signin')}>Sign In</button>
            <button className='button' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    </div>
  )
}

export default HomePage