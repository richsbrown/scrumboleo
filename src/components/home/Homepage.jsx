import React from 'react';
import './homepage.css';
import zenCoder from '../../assets/zenCoder.jpeg';
import addTask from '../../assets/addTask.png';
import dashboard from '../../assets/dashboard.png'
import deleteTasks from '../../assets/deleteAll.png'
import maracasMan from '../../assets/maracasMan.svg'
import maracas from '../../assets/maracas.svg'

const Homepage = () => {
  return (
    <div>
    <div className='homepage_banner'>
    {/* <img src={maracas} alt='maracas'/> */}
    <img src={zenCoder} alt='zen coder'/>
    {/* <div className='slogan'>Go Agile</div> */}
    {/* <button className='btn'>Sign In / Sign Up</button>     */}
    </div>
    <div>
    <div className="howTo">
    {/* <span className='howTo_Title'>How to Scrumboleo</span> */}
    <p className='howTo_copy'>
      Add some SCRUM to your development process. 
    </p>
    
    <div className="howTo_Pics">
        <div className="howTo_container">
          <span className='howToTitle'>
            Add all of your project's tasks to your dashboard.
          </span>
          <img src={addTask} alt='add task screenshot'/>
        </div>
        <div className="howTo_container">
          <span className='howToTitle'>
            Move tasks between the phases of the dashboard.
          </span>
          <img src={dashboard} alt='dashboard screenshot'/>
        </div>
        <div className="howTo_container">
          <span className='howToTitle'>
            Delete all tasks once your project is complete.
          </span>
          <img src={deleteTasks} alt='delete all tasks screenshot'/>
        </div>
    </div>

    <span className='copyright'> Ⓒ Scrumboleo 2022</span>
    </div>
    </div>
    </div>
  )
}

export default Homepage
