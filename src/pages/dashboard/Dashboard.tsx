import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllTasks } from '../../features/tasks/taskSlice'
import { CircularProgress } from '@mui/material';
import './dashboard.css'

import NavbarDashboard from '../../components/NavbarDashboard'
import DashboardHeader from './DashboardHeader'
import IntroMessage from './IntroMessage'
import TaskList from './TaskList';

function Dashboard() {
 
  const projectId = useAppSelector((state) => state.auth.userProfile?.projectId)
  const planningTasks = useAppSelector((state) => state.task.planning)
  const wipTasks = useAppSelector((state) => state.task.wip)
  const completeTasks = useAppSelector((state) => state.task.complete)
  const loading = useAppSelector((state) => state.task.loading)
  const numberOfTasks = useAppSelector((state => state.task.numberOfTasks))
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    document.title = 'Dashboard'
  },[])
  
  async function getTasks () {
    try{
      await dispatch(getAllTasks(projectId!))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => { 
    getTasks()
  }, [])

  return (
      <div className='container-dashboard'>
          <NavbarDashboard />
          <DashboardHeader />
        {(function(){
        if(loading){
          return <CircularProgress 
                  style={{color: 'darkgrey', marginTop: '100px'}}
                  size={250}
                  thickness={1}
                />
        }
        else if(numberOfTasks == 0){
          return <IntroMessage />
        } 
        else if(numberOfTasks > 0){
          return <div className='container-taskLists'>
            <TaskList tasks={planningTasks} title={'Planning'} getTasks={getTasks} />
            <TaskList tasks={wipTasks} title={'Work In Progress'} getTasks={getTasks} />
            <TaskList tasks={completeTasks} title={'Completed'} getTasks={getTasks} />
                </div> 
        }
        })()}  
      </div>
  )
}

export default React.memo(Dashboard)