import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebaseConfig'; 
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscEdit } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
import { CircularProgress } from '@mui/material';
import './taskDetails.css';
import moment from 'moment'

const TaskDetails = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState('');
  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState();

  async function getTask(){
    const document = await getDoc(doc(db, "tasks", `${id}`));
    setTask({id: document.id, data: document.data()});
  }
  
  useEffect(() => {
    getTask();
  }, [])

  useEffect(() => {
    setUpdateTask(task.data)
  }, [task])

  function handleSubmit(event){
    event.preventDefault();
    const docRef = doc(db, 'tasks', id)
    updateDoc(docRef, {
      title: updateTask.title,
      owner: updateTask.owner,
      details: updateTask.details,
      phase: updateTask.phase,
      hours: updateTask.hours
    })
    .then(() => getTask())
    .then(() => handleEditClick())
    .catch((err) => console.log(err))
  }

  function handleChange(e){
    const {id, value} = e.target;
     
    setUpdateTask( prevInput => {
      return {
      ...prevInput, [id]: value
    }})
  }

  function handleEditClick(){
    setEdit(!edit)
  }

  function handleDeleteClick(){
    let taskId = id
    const docRef = doc(db, 'tasks', taskId)
    deleteDoc(docRef)
    .then(() => {
      console.log('delete')
      navigate('/')
    })
  }




  return (
    <div>
      { 
      
     task ?
     <div className="taskDetails_area">
      <div className="taskDetails_container">
        <div className="taskDetails_header">
          <VscEdit className='edit_button' title='Edit Task' onClick={handleEditClick}/>
          <TiDelete className='delete_buton' title='Delete Task' onClick={handleDeleteClick}/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="taskDetails_body">

            {/* TITLE */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Title: </span>
              <span className="taskDetails_title">{task.data.title}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Title: </span>
              <input
                id='title' 
                type='text'
                className='title_input' 
                value={updateTask.title}
                onChange={handleChange}
                />
            </div>
            }

            {/* OWNER */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Owner: </span>
              <span className="taskDetails_owner">{task.data.owner}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Owner: </span>
              <input
                id='owner'
                type='text'
                className='owner_input'
                value={updateTask.owner}
                onChange={handleChange}
                />
            </div>
            }

            {/* DETAILS */}
            { !edit ? 
            <div className='styled_row_details'>
              <span className="heading">Details: </span>
              <div className="details_container">
                <p className='taskDetails_details'>{task.data.details}</p>
              </div>
            </div>
            : 
            <div className='styled_row_details'>
              <span className="heading">Details: </span>
              <textarea
              id='details'
              className='details_input'
              value={updateTask.details}
              onChange={handleChange}
              />
            </div>
            }
            
            {/* PHASE */}
            { !edit ? 
            <div className='styled_row'>
              <span className="heading">Phase: </span>
              <span className="taskDetails_phase">{task.data.phase == 'wip' ? 'work in progress' : task.data.phase}</span>
            </div>
            :  
            <div className='styled_row'>
              <span className="heading">Phase: </span>
              <select 
              name="phase" 
              id="phase"
              className='phase_input'
              value={updateTask.phase}
              onChange={handleChange}
              >
                <option value="">Select Phase</option>
                <option value="planning">Planning</option>
                <option value="wip">Work In Progress</option>
                <option value="complete">Completed</option>
              </select>
            </div>
            }
            
            {/* HOURS */}
            {!edit ? 
            <div className='styled_row'>
              <span className="heading">Estimated time:  </span>
              <span className="taskDetails_hours">{task.data.hours} {task.data.hours > 1 || task.data.hours < 0.5 ? 'hours' : 'hour'}</span>
            </div>
            : 
            <div className='styled_row'>
              <span className="heading">Estimated time:  </span>
              <input 
              className='hours_input'
              type='number'
              step='0.5'
              min='0'
              id='hours'
              value={updateTask.hours}
              onChange={handleChange}
              />
              <span className="hours_input_text"> {updateTask.hours > 1 || updateTask.hours < 0.5 ? 'hours' : 'hour'}</span>
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

export default TaskDetails