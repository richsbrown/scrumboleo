import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserProfile, updateProjectTitle } from '../../features/auth/authSlice'
import { deleteAllTasks, getAllTasks } from '../../features/tasks/taskSlice'
import { VscEdit } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import DeleteModal from '../../components/DeleteModal';
import './dashboardHeader.css'

function DashboardHeader() {
    
    const user = useAppSelector((state) => state.auth.user)
    const userProfile = useAppSelector((state) => state.auth.userProfile)
    const hours = useAppSelector((state) => state.task.totalHours)
    const tasks = useAppSelector((state) => state.task.tasks)
    const projectId = userProfile?.projectId
    const dispatch = useAppDispatch()
  
    const [projectTitle, setProjectTitle] = useState<any>(userProfile?.projectTitle)
    const [edit, setEdit] = useState<boolean>(false)
    const [deleteAllModal, setDeleteAllModal] = useState<boolean>(false)
    
    const navigate = useNavigate()

    const getUser = () => {
        dispatch(getUserProfile(user!))
      }

    const toggleDeleteModal = () => {
        setDeleteAllModal(!deleteAllModal)
    }

    const handledeleteAllTasks = async () => {
        await dispatch(deleteAllTasks(tasks))
        await dispatch(deleteAllTasks(tasks))
        await dispatch(getAllTasks(projectId!))
        dispatch(getAllTasks(projectId!))
        setDeleteAllModal(!deleteAllModal)  
    }

    const handleUpdateProjectTitle = async (e: any) => {
        e.preventDefault()
        await dispatch(updateProjectTitle({projectTitle, id: user}))
        await dispatch(updateProjectTitle({projectTitle, id: user}))
        await dispatch(getUserProfile(user!))
        await dispatch(getUserProfile(user!))
        setEdit(!edit)
    }

  return (
    <div className='container-dashboard-header'>
        <div className='sub-container-dashboard-header'>
            <div className="project-title-container">
            <form className='project-title-form'>
            {edit && 
                <>
                <input className='title-input-dashboard' type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} /> 
                <button className='save-button' onClick={handleUpdateProjectTitle}>Save</button>
                </>
            }
            </form>
            {!edit && <span className='projectTitle' title='Project Title'>{projectTitle}</span>}
            <VscEdit size={30} className='edit-button' title='Edit Project Title' onClick={() => setEdit(!edit)}/>
            </div>
            <div className='hours-container' title='Total Estimated Hours Left'>
                <span className='hours-number'>{hours}</span>
                <span className='hours-text'>
                {hours > 1 || hours < 0.5 ? 'hours' : 'hour'}
                </span>
            </div>
        </div>
        <div className='sub-container-dashboard-header'>
            <button onClick={() => navigate('/addtask')} className='addTask-button' title='Add a Task'>+ Add Task</button>
            <GrPowerReset size={40} className="reset_button" title='Delete All Tasks' onClick={() => setDeleteAllModal(!deleteAllModal)}/>
        </div>
        { deleteAllModal &&
            <DeleteModal className='delete-allTasks-modal' text='Delete All Tasks' toggleFunction={toggleDeleteModal} deleteFunction={handledeleteAllTasks} />
        }
    </div>
  )
}

export default React.memo(DashboardHeader)