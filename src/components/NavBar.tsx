import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../features/auth/authSlice'
import threeDotsMenu from '../assets/threeDotsMenu.svg'
import { MdArrowBackIosNew } from 'react-icons/md';

type PropsType = {
  text: string
}


function NavBar({ text }: PropsType) {

  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='nav-container'>
        <MdArrowBackIosNew className='backArrow' size={20} onClick={() => navigate('/')} />
        <span className='scrumboleo-text-navbar' onClick={() => navigate('/')}>{text}</span>
        {user && <img className='main-menu' onClick={handleLogout} src={threeDotsMenu} alt='menu'/>}
    </div>
  )
}

export default NavBar
