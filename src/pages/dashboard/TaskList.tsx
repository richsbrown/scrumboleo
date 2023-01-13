import React, { useEffect, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './taskList.css'
import { getAllTasks, deleteTask, updatePhase } from '../../features/tasks/taskSlice'
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import TaskSummary from './TaskSummary';

type PropsType = {
    tasks: any 
    title: string
    getTasks: () => void
}

function TaskList(props: PropsType) {

const {tasks, title, getTasks} = props
const dispatch = useAppDispatch()
const navigate = useNavigate()
const [renderComponent, setRenderComponent] = useState(false)

async function handleDeleteTask (taskId: string) {
  await dispatch(deleteTask(taskId))
  await dispatch(deleteTask(taskId))
  getTasks()
  setRenderComponent(!renderComponent)
}

async function handleChangePhase (e: any) {
  e.preventDefault()
  const {id, value} = e.target
  await dispatch(updatePhase({id, phase: value}))
  await dispatch(updatePhase({id, phase: value}))
  await getTasks()
  setRenderComponent(!renderComponent)
}

  return (
    <div className='phase'>
    <div className='taskListTitle' title={title}>{title}</div>
    <div className="taskList">
        {tasks && tasks.map((task: any) => (
          <div className="taskCard" key={task.id} title={task.task.title}>
            <div className="taskCardHeader">
                <TiDelete
                values={task.id}
                onClick={() => handleDeleteTask(task.id)}
                className='deleteButton'
                title='Delete Task'
                /> 
            </div>  
            <Link to={'/task/' + task.id } key={task.id}>
              <TaskSummary task={task} />
            </Link>
            <div className="taskCardFooter">
                <select
                  className='phase_select' 
                  name="phase"
                  value='' 
                  id={task.id}
                  onChange={handleChangePhase}
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
  )
}

export default React.memo(TaskList)