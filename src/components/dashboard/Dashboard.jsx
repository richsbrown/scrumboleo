import React from 'react'
import './dashboard.css';
import { connect } from 'react-redux';
import { auth, db } from '../../config/firebaseConfig'; 
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useReducer, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import TaskList from '../tasks/TaskList';
import { VscEdit } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import { CircularProgress } from '@mui/material';

const Dashboard = (props) => {

  const { 
    getUserProfile,
    userProfile,
    userFromState
  } = props;
  
  const [tasks, setTasks] = useState([]);
  const [planningTasks, setPlanningTasks] = useState([]);
  const [wipTasks, setWipTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [userInfo, setUserInfo] = useState('')
  const [projectTitle, setProjectTitle] = useState();
  const [edit, setEdit] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(10000);
  const [deleteAllModal, setDeleteAllModal] = useState(false);


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

  async function getTasks(){
    
    //** PROMISE VERSION **//
    
    let getDB = async (projectId) => {
      await getUserProfile()
      const pID = projectId
      const docRef = collection(db, 'tasks');
      const q = query(docRef, where('projectId', '==', pID))
      const querySnapshot = getDocs(q);
      return querySnapshot
    }
 
    usersID
    .then((uid) => {
      return getDoc(doc(db, 'users', uid))
    })
    .then((response) => {
      return response.data().projectId
    })
    .then((projectId) => {
      return getDB(projectId)
    })
    .then((querySnapshot) => {
      let items = []
      querySnapshot.forEach((doc) => {
        items.push({id: doc.id, doc: doc.data()});
      })
       return items
    })
    .then((items) => {
      setTasks(items)
      setNumberOfTasks(items.length)
    })
    .catch((err) => {
      console.log(err)
    })
  }

    function filterTasks(tasks, phase){
      return tasks.filter(task => task.doc.phase == phase)
    }

  useEffect(() => {
    setUser(auth.currentUser)
  }, [])
  
  useEffect(() => {
    getTasks()
  },[props]);


  useEffect( () => {
    Promise.all([setPlanningTasks(filterTasks(tasks, 'planning')),
    setWipTasks(filterTasks(tasks, 'wip')),
    setCompleteTasks(filterTasks(tasks, 'complete')),
  ])
  },[tasks, props])



  // TOTAL HOURS LOGIC
  async function getTotalHours(){
   
    const tasksForHours = new Promise((res, rej) => {
      res(tasks)
      return tasks
    })
    
    tasksForHours
    .then((tasks) => {
      let totalHours = 0;
      tasks = tasks.filter((task) => {
        return task.doc.phase !== 'complete'
      })
    tasks.forEach((task) => {
      totalHours = Number(totalHours) + Number(task.doc.hours)
    })
    return totalHours
    })
    .then((totalHours) => {
      setTotalHours(totalHours)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  useEffect(() => {
    getTotalHours()
  }, [props, tasks])


  async function getProjectTitle(){

    usersID
    .then((uid) => {
      return getDoc(doc(db, 'users', uid))
    })
    .then((response) => {
      setUserInfo(response.data())
      return response.data()
    })
    .then((data) => {
      setProjectTitle(data.projectTitle)
    })
  }

  useEffect(() => {
    getProjectTitle()
  },[props]);

  function handleEditClick(){
    setEdit(!edit)
  }

  function handleOpenDeleteAll(){
    setDeleteAllModal(!deleteAllModal)
  }

  function handleDeleteAllTasks(){
    tasks.forEach((task) => {
      const docRef = doc(db, 'tasks', task.id)
      deleteDoc(docRef)
    })
    getTasks()
    setDeleteAllModal(!deleteAllModal)
  }

  function handleSubmit(event){
    event.preventDefault();
    const uid = user.uid
    const docRef = doc(db, 'users', uid)
    updateDoc(docRef, {
      projectTitle: projectTitle
    })
    .then(() => getProjectTitle())
    .then(() => handleEditClick())
  }
  
  return (
  <div>

  <div className="dashboard_header">
    <div className="project_title">
      <form onSubmit={handleSubmit}>
       {edit ? <input className='title_input_dashboard'
        type="text"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        /> : <span title='Project Title'>{projectTitle}</span>}
        {edit && <button className='save_button'>save</button>}
      </form>
      <VscEdit className='edit_button' title='Edit Project Title' onClick={handleEditClick}/>
    </div>
    <span className="total_task_hours" title='Total Estimated Hours Left'>{totalHours} {totalHours > 1 || totalHours < 0.5 ? 'hours' : 'hour'}</span>
    <NavLink className='addTask_button' to='/createTask'>+ Add Task</NavLink>
    <GrPowerReset className="reset_button" title='Delete All Tasks' onClick={handleOpenDeleteAll}/>
    </div>
   
    { deleteAllModal &&
      <div className="deleteAll_modal">
      <p>Delete All Tasks</p>
      <div className="modal_buttons">
        <button className="modal_button" onClick={handleOpenDeleteAll}>Cancel</button>
        <button className="modal_button" onClick={handleDeleteAllTasks}>Delete All</button>
      </div>
    </div>
    }

   {(function(){
   if(numberOfTasks === 0){
    return <div className="msgArea">
            <div className="msgContainer">
            <p>Click 
              {<NavLink className='addTask_button_mini' to='/createTask'>+ Add Task</NavLink>}
             , to add your first task.</p>
            </div>
          </div>  
   } 
   else if(tasks.length > 0){
   return <div className='dashboard_container'>
            <TaskList tasks={planningTasks} title={'Planning'} uid={user?.uid} getTasks={getTasks}/>
            <TaskList tasks={wipTasks} title={'WIPS'} uid={user?.uid} getTasks={getTasks}/>
            <TaskList tasks={completeTasks} title={'Completed'} uid={user?.uid} getTasks={getTasks}/>
          </div> 
   } else {
    return <div className="circleP_Container"> 
    <CircularProgress 
    style={{color: 'darkgrey', marginTop: '100px'}}
                        size={250}
                        thickness={1}
    />
    </div>
   }
  })()}

  </div>
  )
}

const mapStateToProps = (state) => {
  //console.log('dashboard state', state)
  return {
    uid: state.firebase.user?.uid,
    projectId: state.firebase.userProfile?.projectId,
    userProfile: state.firebase.userProfile,
    userFromState: state.firebase.user,
    auth: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch({ type: 'GET_USER_PROFILE' })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);