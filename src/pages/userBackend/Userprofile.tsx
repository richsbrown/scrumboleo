import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserProfile, getUserProfile, deleteUserAccount } from '../../features/auth/authSlice';
import { deleteAllTasks, getAllTasks } from '../../features/tasks/taskSlice';
import { VscEdit } from 'react-icons/vsc';
import Navbar3 from '../../components/Navbar3'
import DeleteModal from '../../components/DeleteModal';
import './userprofile.css'

function Userprofile() {

    const user = useAppSelector((state) => state.auth.user)
    const userProfile = useAppSelector((state) => state.auth.userProfile)
    const projectId = userProfile?.projectId
    const tasks = useAppSelector((state) => state.task.tasks)
    const dispatch = useAppDispatch()

    const [edit, setEdit] = useState<boolean>(false)
    const [firstName, setFirstName] = useState(userProfile?.firstName)
    const [lastName, setLastName] = useState(userProfile?.lastName)
    const [email, setEmail] = useState(userProfile?.email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [deleteAllModal, setDeleteAllModal] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
      document.title = 'User Profile'
    },[])

    const handleEditClick = () => {
      setFirstName(userProfile?.firstName)
      setLastName(userProfile?.lastName)
      setEmail(userProfile?.email)
      setNewPassword('')
      setConfirmNewPassword('')
      setEdit(!edit)
    }

    const handleUpdateUserInfo = async (e: any) => {
        e.preventDefault()
        if(firstName === userProfile?.firstName && 
          lastName === userProfile?.lastName && 
          email === userProfile?.email &&
          !newPassword){
          handleEditClick()
          alert('No Changes Entered')
          return 
        }
        if(!email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)){
          return alert('Invalid Email. Email should follow example@email.com format')
        }
        if(newPassword && newPassword.length < 6){
          return alert('Password should be 6 or more characters')
        }
        if(newPassword !== confirmNewPassword){
          return alert('New Password & Confirm New Password do not match')
        }
       await dispatch(updateUserProfile({user, firstName, lastName, email, newPassword}))
       await dispatch(getUserProfile(user!))
       handleEditClick()
       alert('User Info Updated Successfully')
    }

    const toggleDeleteModal = () => {
      setDeleteAllModal(!deleteAllModal)
    }

    const handleDeleteUser = async () => {
      await dispatch(deleteAllTasks(tasks))
      await dispatch(deleteAllTasks(tasks))
      await dispatch(getAllTasks(projectId!))
      await dispatch(deleteUserAccount(user))
      alert('Account Deleted Successfully')
      navigate('/')
      
      // delete all user tasks by passing tasks array
      // reset taskSlice to initialState
      // delete user document in users collection passing userId
      // delete user credentials from authentication db
      // reset authSice to initialState
      // navigate('/') if necessary
    }

    return (
        <div className='container-userProfile'>
            <Navbar3 />
            <div className='sub-container-userProfile'>
              <div className='userProfile-header'>
                <span className='title-userProfile'>Account Details</span>
              <div className='userProfile-header-buttons'>
                <VscEdit size={30} className='edit-button' title='Edit Account Details' onClick={handleEditClick}/>
              </div>
              </div>
                <form className='form-userProfile'>
                  
                  <div className='input-label'><span>Firstname:</span></div>
                  {edit ? <input id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  : <p>{userProfile?.firstName}</p>}

                  <div className='input-label'><span>Lastname:</span></div>
                  {edit ? <input id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  : <p>{userProfile?.lastName}</p>}

                  <div className='input-label'><span>Email:</span></div>
                  {edit ? <input id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                  : <p>{userProfile?.email}</p>}

                  {edit ? <div className='input-label'><span> New Password:</span></div>
                  : <div className='input-label'><span>Password:</span></div>}
                  {edit ? <input id='password' type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  : <p>* * * * * * *</p>}

                  {edit && 
                  <>
                    <div className='input-label'><span>Confirm New Password:</span></div>
                    <input id='confirmPassword' type='password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                  </>
                  }
                                
                  <button
                  type='submit'
                  style={{visibility: edit ? 'visible' : 'hidden'}} className='button' onClick={handleUpdateUserInfo}>Save</button>
                
                </form>
                { deleteAllModal &&
                  <DeleteModal className='delete-userAccount-modal' text='Delete User Account' toggleFunction={toggleDeleteModal} deleteFunction={handleDeleteUser} />
                }
                <button className='delete-userAccount-btn' onClick={toggleDeleteModal} title='Delete User Account'>Delete Account</button>
            </div>
            
        </div>
      )
}

export default Userprofile