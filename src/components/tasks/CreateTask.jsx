import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../store/actions/taskActions';
import { useNavigate } from 'react-router-dom';
import './createTask.css';

const CreateTask = (props) => {

  // const { auth } = props
  // if(!auth) navigate("/");

  //const [title, setTitle] = useState('');
  //const [content, setContent] = useState('');
  //const input = {title, content}

  const navigate = useNavigate();

  const [task, setTask] = useState({
    title:'',
    owner: '',
    details:'',
    phase: 'planning',
    hours: 0
  })

  function handleSubmit(event){
    event.preventDefault();
    props.createTask(task)
    console.log(task)
    //setTitle('')
    //setContent('')
    setTask({title:'', owner:'', details:'', phase: 'planning', hours: 0})
    navigate("/");
  }

  function handleChange(e){
    const {id, value} = e.target;
     
    setTask( prevInput => {
      return {
      ...prevInput, [id]: value
    }})
  }

  return (
  <div className="createTask_area">
    <div className='createTask_container'>
    
      <div className="createTask_header">
        <h5>Add a Task</h5>
      </div>

      <form
      className='white' 
      onSubmit={handleSubmit}
      >

        {/* TITLE */}
        <div className='styled_row'>
          <span className="heading">Title: </span>
          <input
            id='title' 
            type='text'
            className='title_input' 
            value={task.title}
            onChange={handleChange}
            />
        </div>

        {/* OWNER */}
        <div className='styled_row'>
          <span className="heading">Owner: </span>
          <input
            id='owner'
            type='text'
            className='owner_input'
            value={task.owner}
            onChange={handleChange}
            />
        </div>

        {/* DETAILS */}
        <div className='styled_row_details'>
          <span className="heading">Details: </span>
          <textarea
          id='details'
          className='details_input'
          value={task.details}
          onChange={handleChange}
          />
        </div>

        {/* PHASE */}
        <div className='styled_row'>
            <span className="heading">Phase: </span>
            <select 
            name="phase" 
            id="phase"
            className='phase_input'
            value={task.phase}
            onChange={handleChange}
            >
              <option value="">Select Phase</option>
              <option value="planning">Planning</option>
              <option value="wip">Work In Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>

        {/* HOURS */}
        <div className='styled_row'>
          <span className="heading">Estimated time:  </span>
          <input 
          className='hours_input'
          type='number'
          step='0.5'
          min='0'
          id='hours'
          value={task.hours}
          onChange={handleChange}
          />
          <span className="hours_input_text"> {task.hours > 1 || task.hours < 0.5 ? 'hours' : 'hour'}</span>
        </div>


        <div className="form_footer">
          <button className="save_button">
            + Add
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

// createPoject is now an action on the props, 
// which will call the action creator createProject, 
// and then dispatch and pass the project data to it
// dispatch is used to make sure the action does not get called from just anywhere
const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (task) => dispatch(createTask(task))
  }
}

const mapStateToProps = (state) => {
  return {
    //authError: state.auth.authError,
    auth: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
