import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../features/auth/authSlice'
import { CgProfile } from 'react-icons/cg'
// import threeDotsMenu from '../assets/threeDotsMenu.svg'

function NavbarDashboard() {

  //const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='navDashboard-container'>
        <span className='scrumboleo-text-navbar' title='Scrumboleo'>Scrumboleo</span>
        <div className='navbar-btns'>
          {/* <img className='main-menu' onClick={handleLogout} src={threeDotsMenu} alt='menu'/> */}
          <CgProfile size={'20px'} className='profile-btn' title='User Profile' onClick={() => navigate('/userprofile')}/>
          <button className='logout-btn' title='Logout' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default NavbarDashboard