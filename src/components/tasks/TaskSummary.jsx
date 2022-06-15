import React from 'react'
import './taskList.css'

const TaskSummary = (props) => {

  const task = props.task
  const uid = props.uid

  //console.log('taskSummaryUID', uid)

  function handleChange(e){
    const {id, value} = e.target;
    const taskId = e.target.getAttribute('taskIdKey')
    console.log(id, value)
    console.log(taskId)
  //  
  //
    //console.log(whereArrayContains('tasks', taskId))
    // .updateDoc(doc(db, 'users', uid), {
    // arrayUnion({phase: value})
    // })
  //

  //let test = collection(db, "users").whereArrayContains('tasks', 'planning')
  //.arrayUnion({phase: value})

  //let test2 = doc(db, 'users', uid).Query.whereArrayContains('tasks', taskId)
    //console.log(test)

}

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