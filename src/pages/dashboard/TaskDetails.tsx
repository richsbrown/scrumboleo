import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllTasks, deleteTask, updateTask } from '../../features/tasks/taskSlice';
import Navbar3 from '../../components/Navbar3';
import { VscEdit } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
import './addTask.css'

function TaskDetails() {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const projectId = useAppSelector((state) => state.auth.userProfile?.projectId)
    let tasks = useAppSelector((state) => state.task.tasks)
    tasks = tasks.filter((task) => {return task.id === id})
    const task = tasks[0].task

    const [edit, setEdit] = useState<boolean>(false)
    const [taskDetails, setTaskDetails] = useState<any>({
        id: id,
        title: task.title,
        owner: task.owner,
        details: task.details,
        phase: task.phase,
        hours: task.hours
      })

      useEffect(() => {
        document.title = `Task Info: ${task.title}`
      },[])

    const canSubmit = 
    task.title !== taskDetails.title ||
    task.owner !== taskDetails.owner ||
    task.details !== taskDetails.details ||
    task.phase !== taskDetails.phase ||
    task.hours !== taskDetails.hours
    ? true : false
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(
        task.title === taskDetails.title &&
        task.owner === taskDetails.owner &&
        task.details === taskDetails.details &&
        task.phase === taskDetails.phase &&
        task.hours === taskDetails.hours
        ){
          alert('Nothing Changed')
          return
        }
        await dispatch(updateTask(taskDetails))
        dispatch(getAllTasks(projectId!))
        setEdit(!edit)
      }
    
      function handleChange(e: any){
        const {id, value} = e.target;
        setTaskDetails( (prevInput: any) => {
          return {
          ...prevInput, [id]: value
        }})
      }

      async function handleDeleteTask (taskId: string) {
        await dispatch(deleteTask(taskId))
        await dispatch(deleteTask(taskId))
        // await dispatch(getAllTasks(projectId!))
        // await dispatch(getAllTasks(projectId!))
        navigate('/')
      }
    
      return (
        <div className='container-addTask'>
            <Navbar3 />
            <div className='sub-container-addTask'>
              <div className='taskDetails-header'>
                <span className='title-taskDetails'>Task Info</span>
              <div className='taskDetails-header-buttons'>
                <VscEdit size={30} className='edit-button' title='Edit Task Details' onClick={() => setEdit(!edit)}/>
                <TiDelete values={id}
                onClick={() => handleDeleteTask(id!)}
                className='deleteButton' title='Delete Task' />
              </div>
              </div>
                <form className='form' onSubmit={handleSubmit}>
                  
                  <div className='input-label'><span>Title:</span></div>
                  {edit ? <input id='title' type='text' value={taskDetails.title} onChange={handleChange} />
                  : <p>{taskDetails.title}</p>}

                  <div className='input-label'><span>Owner:</span></div>
                  {edit ? <input id='owner' type='text' value={taskDetails.owner} onChange={handleChange} />
                  : <p>{taskDetails.owner}</p>}

                  <div className='input-label'><span>Phase:</span></div>
                  { edit ? <select id="phase" name="phase" value={taskDetails.phase} onChange={handleChange}>
                    <option value="">Select Phase</option>
                    <option value="planning">Planning</option>
                    <option value="wip">Work In Progress</option>
                    <option value="complete">Completed</option>
                  </select>
                  : <p>{taskDetails.phase === 'wip' ? 'Work In Progress' : taskDetails.phase}</p>}

                  <div className='input-label'><span>Hours:</span></div>
                  { edit ? <input id='hours' type='number' step='0.5' min='0' value={taskDetails.hours} onChange={handleChange} />
                  : <p>{taskDetails.hours}</p>}

                  <div className='input-label'><span>Details:</span></div>
                  { edit ? <textarea id='details' value={taskDetails.details} onChange={handleChange} />
                  : <p className='taskDetails'>{taskDetails.details}</p>}

                  <button
                  type='submit'
                  style={{visibility: edit ? 'visible' : 'hidden'}} disabled={!canSubmit} className='button'>Save</button>
                
                </form>
            </div>
            
        </div>
      )
}

export default TaskDetails