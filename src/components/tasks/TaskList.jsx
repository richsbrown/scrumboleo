import React from 'react'
import './taskList.css'
import { Link } from 'react-router-dom';
import TaskSummary from './TaskSummary';
import { TiDelete } from 'react-icons/ti';
import { db } from '../../config/firebaseConfig'; 
import { collection, 
  addDoc, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  query, 
  where, 
  getDoc, 
  update, 
  FieldValue,
  deleteDoc
} from "firebase/firestore";

const TaskList = (props) => {

  const tasks = props.tasks
  const uid = props.uid;
  const getTasks = props.getTasks

  // console.log('tasks', tasks)
  //console.log('uid', uid)

  // async function handleClick(e){
  //   let taskId = await e.target.getAttribute('taskidkey')
  //   console.log('taskList handleClick', 'taskId', taskId, 'uid', uid)
  //   const docRef = doc(db, 'tasks', taskId)
  //   deleteDoc(docRef)
  //   .then(() => {
  //     getTasks()
  //   })
  // }

  // PROMISE HANDLE DELETE CLICK
  function handleClick(e){
    
    const getTaskID = new Promise((res, rej) => {  
      let taskId = e.target.getAttribute('taskidkey')
      if(taskId){
        res(taskId)
        // console.log('taskList handleClick', 'taskId', taskId, 'uid', uid)
      }
    })
    
    getTaskID
    .then((taskId) => {
      const docRef = doc(db, 'tasks', taskId)
      deleteDoc(docRef)
    })
    .then(() => {
      getTasks()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleChange(e){
    const {id, value} = e.target;
    if (!value) return
    const taskId = e.target.getAttribute('taskidkey')
    const docRef = doc(db, 'tasks', taskId)
    updateDoc(docRef, {phase: value})
    .then(() => {
      getTasks()
    })
  }

return (
<div className='phase'>
    <div className='taskListTitle'>{props.title}</div>
    <div className="taskList">
        {tasks && tasks.map((task) => (
          <div className="taskCard" key={task.id}>

            <div className="taskCardHeader">
                {/* <button taskidkey={task.id}
                onClick={handleClick}
                className='deleteButton'
                ></button> */}
                <TiDelete
                taskidkey={task.id}
                onClick={handleClick}
                className='deleteButton'
                title='Delete Task'
                /> 
            </div>

                <Link to={'/task/' + task.id } key={task.id}>
                    <TaskSummary task={task} uid={uid}/>
                </Link>

              <div className="taskCardFooter">
                {/* <p className='phase_icon'>Phase</p> */}
                <select
                  className='phase_select' 
                  name="phase"
                  value='' 
                  id="phase"
                  taskidkey={task.id}
                  onChange={handleChange}
                  title='Change Phase'
                >
                  <optgroup label="Change Phase" className="opt_group" />
                  <option value=""></option>
                  <option value="planning">Planning</option>
                  <option value="wip">Work In Progress</option>
                  <option value="complete">Completed</option>
              </select>
              </div>

          </div>
          ))}
    </div>
</div>
  )}

  export default TaskList;