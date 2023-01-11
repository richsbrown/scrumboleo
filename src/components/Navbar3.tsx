import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../features/auth/authSlice'
import threeDotsMenu from '../assets/threeDotsMenu.svg'
import { MdArrowBackIosNew } from 'react-icons/md';

function Navbar3() {

  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='nav3-container'>
        <MdArrowBackIosNew className='backArrow' title='Navigate to Dashboard' size={20} onClick={() => navigate('/')} />
    </div>
  )
}

export default Navbar3