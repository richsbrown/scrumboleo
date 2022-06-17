import React from 'react'
import './taskList.css'

const TaskSummary = (props) => {

  const task = props.task

  return (
      <div>
        <div className="taskCardBody">
          <div className='taskTitle'>{task.doc.title}</div>
          <div className="taskOwnerHours">
            <span className="taskOwner">{task.doc.owner}</span>
            <span className="taskHours"> ({task.doc.hours} {task.doc.hours > 1 || task.doc.hours < 0.5 ? 'hours' : 'hour'})</span>
          </div>
        </div>
      </div>
  )
}

export default TaskSummary