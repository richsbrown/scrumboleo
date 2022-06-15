import React from 'react'
import { connect } from 'react-redux';
import { auth, db } from '../../config/firebaseConfig'; 
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { VscEdit } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
import { CircularProgress } from '@mui/material';
import './userProfile.css';

const UserProfile = (props) => {

  //const { 
    //getUserProfile,
    //userProfile,
  //} = props;

  const [edit, setEdit] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [updateUserProfile, setUpdateUserProfile] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');


  const usersID = new Promise((res, rej) => {
    let uid = '';
     onAuthStateChanged(auth, (data) => {      
      if(data){
         uid = data.uid
         res(uid)
        } else {
          rej('no uid')
        }
      })
    })

    async function getUserProfile(){
    usersID
    .then((uid) => {
      return getDoc(doc(db, 'users', uid))
    })
    .then((response) => {
      setUserProfile(response.data())
    })
    .catch((err) => {
      console.log(err)
    })
    }


  useEffect(() => {
    getUserProfile()
  }, [props])


  useEffect(() => {
    setUpdateUserProfile(userProfile)
  }, [userProfile])

  function handleChange(e){
    const {id, value} = e.target;
     
    setUpdateUserProfile( prevInput => {
      return {
      ...prevInput, [id]: value
    }})
  }

  function handleEditClick(){
    setEdit(!edit)
    setUpdateUserProfile(userProfile)
    setNewPassword('')
    setNewPassword2('')
  }

  function handleSubmit(event){
    event.preventDefault();

    if(userProfile.firstName == updateUserProfile.firstName && 
      userProfile.lastName == updateUserProfile.lastName && 
      userProfile.email == updateUserProfile.email &&
      !newPassword){
        handleEditClick()
      }

    if(!updateUserProfile.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)){
      return alert('Invalid Email. Email should follow example@email.com format')
    }

    if(newPassword && newPassword.length < 6){
      return alert('Password should be 6 or more characters')
    }

    if(newPassword !== newPassword2){
      return alert('Change Password & Confirm Password do not match')
    }

    usersID
    .then((uid) => {
      const docRef = doc(db, 'users', uid)
      updateDoc(docRef, {
      firstName: updateUserProfile.firstName,
      lastName: updateUserProfile.lastName,
      initials: updateUserProfile.firstName[0] + updateUserProfile.lastName[0],
      email: updateUserProfile.email
    })})
    .then(() => {
      updateEmail(auth.currentUser, updateUserProfile.email)
    })
    .then(() => {
      if(newPassword){
        const user = auth.currentUser
        updatePassword(user, newPassword)
      } else {
        return
      }
    })
    .then(() => {
      setNewPassword('')
      setNewPassword2('')
    })
    .then(() =>  getUserProfile())
    .then(() => setUpdateUserProfile(userProfile))
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      { userProfile ? 
        <div className="userProfile_area">
          <div className="userProfile_container">
            <div className="userProfile_header">
            <VscEdit className='edit_btn' title='Edit Profile' onClick={handleEditClick}/>
            </div>
            <h4 className="userProfile_title">User Profile</h4>

          <form onSubmit={handleSubmit}>
            <div className="userProfile_body">

              {/* FIRSTNAME */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Firstname: </span>
              <span className="taskDetails_title">{userProfile.firstName}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Firstname: </span>
              <input
                id='firstName' 
                type='text'
                className='form_input' 
                value={updateUserProfile.firstName}
                onChange={handleChange}
                />
            </div>
            }

              {/* LASTNAME */}
              { !edit ? 
            <div className='styled_row'>
              <span className="heading">Lastname: </span>
              <span className="taskDetails_title">{userProfile.lastName}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Lastname: </span>
              <input
                id='lastName' 
                type='text'
                className='form_input' 
                value={updateUserProfile.lastName}
                onChange={handleChange}
                />
            </div>
            }

            {/* EMAIL */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Email: </span>
              <span className="taskDetails_title">{userProfile.email}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Email: </span>
              <input
                id='email' 
                type='text'
                className='form_input' 
                value={updateUserProfile.email}
                onChange={handleChange}
                />
            </div>
            }

            {/* PASSWORD */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Password: </span>
              <span className="taskDetails_title">*******</span>
            </div>
            : 
            <div className="passwordInput_container">
            <div className='styled_row'>
              <span className="heading">Change Password: </span>
                  <input
                    id='password' 
                    type='password'
                    className='form_input' 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    />
            </div>
            <div className='styled_row'>
                  <span className="heading">Confirm Password: </span>
                  <input
                    id='password2' 
                    type='password'
                    className='form_input' 
                    value={newPassword2}
                    onChange={e => setNewPassword2(e.target.value)}
                    />
                    
                </div>
            </div>
            }            

            </div>
            {edit && 
            <div className="form_footer">
              <button className='save_button'>Save</button>
            </div>
            }
          </form>


          </div>
        </div>
        :
        <div className="circleP_Container"> 
            <CircularProgress 
                        style={{color: 'darkgrey', marginTop: '200px'}}
                        size={250}
                        thickness={1}
            />
        </div>
      
      }
      </div>
  )
}

const mapStateToProps = (state) => {
  //console.log('dashboard state', state)
  return {
    userProfile: state.firebase.userProfile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch({ type: 'GET_USER_PROFILE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
