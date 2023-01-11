import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addTask, getAllTasks } from '../../features/tasks/taskSlice';
import Navbar3 from '../../components/Navbar3'
import './addTask.css'

function AddTask() {

  const projectId = useAppSelector((state) => state.auth.userProfile?.projectId)
  const authorId = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [task, setTask] = useState<any>({
    projectId,
    authorId,
    createdAt: new Date(),
    title:'',
    owner: '',
    details:'',
    phase: 'planning',
    hours: 0
  })

  useEffect(() => {
    document.title = 'Add a Task'
  },[])

  const canSubmit = task.title ? true : false

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if(!task.title){
      alert('Task Title is Required')
      return
    }
    await dispatch(addTask(task))
    await dispatch(getAllTasks(projectId!))
    setTask({title:'', owner:'', details:'', phase: 'planning', hours: 0})
    navigate('/')
  }

  function handleChange(e: any){
    const {id, value} = e.target;
    setTask( (prevInput: any) => {
      return {
      ...prevInput, [id]: value
    }})
  }

  return (
    <div className='container-addTask'>
        <Navbar3 />
        <div className='sub-container-addTask'>
            <span className='title'>New Task</span>
            <form className='form' onSubmit={handleSubmit}>
              <div className='input-label'><span>Title:</span></div>
              <input id='title' type='text' value={task.title} onChange={handleChange} />
              <div className='input-label'><span>Owner:</span></div>
              <input id='owner' type='text' value={task.owner} onChange={handleChange} />
              <div className='input-label'><span>Phase:</span></div>
              <select id="phase" name="phase" value={task.phase} onChange={handleChange}>
                <option value="">Select Phase</option>
                <option value="planning">Planning</option>
                <option value="wip">Work In Progress</option>
                <option value="complete">Completed</option>
              </select>
              <div className='input-label'><span>Hours:</span></div>
              <input id='hours' type='number' step='0.5' min='0' value={task.hours} onChange={handleChange} />
              <div className='input-label'><span>Details:</span></div>
              <textarea id='details' value={task.details} onChange={handleChange} />
              <button type='submit' disabled={!canSubmit} className='button'>+ Add</button>
            </form>
        </div>
        
    </div>
  )
}

export default AddTask