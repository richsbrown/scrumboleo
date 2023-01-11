import React from 'react'
import './taskList.css'

type PropsTypes = {
    task: any
}

function TaskSummary(props: PropsTypes) {

    const { task } = props

  return (
    <div>
        <div className="taskCardBody">
          <div className='taskTitle'>{task.task.title}</div>
          <div className="taskOwnerHours">
            <span className="taskOwner">{task.task.owner}</span>
            <span className="taskHours"> ({task.task.hours} {task.task.hours > 1 || task.task.hours < 0.5 ? 'hours' : 'hour'})</span>
          </div>
        </div>
      </div>
  )
}

export default React.memo(TaskSummary)