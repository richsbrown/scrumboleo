import React from 'react'
import { useNavigate } from 'react-router-dom'

function IntroMessage() {
const navigate = useNavigate()
  return (
    <div className="container-msg">
    <p>Click 
    <button onClick={() => navigate('/addtask')} className='addTask-button-mini'>+ Add Task</button>
    , to add your first task.</p>
  </div> 
  )
}

export default React.memo(IntroMessage)