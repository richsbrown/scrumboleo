import './App.css';
// Libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

// Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/navbar/Navbar';
import Homepage from './components/home/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import CreateTask from './components/tasks/CreateTask';
import TaskDetails from './components/tasks/TaskDetails';
import UserProfile from './components/userBackend/UserProfile';


function App(props) {

  const { auth, getUserProfile } = props
  console.log('auth at appJS', auth)

 const [, updateState] = useState();
 const forceUpdate = useCallback(() => updateState({}), []);

//  useEffect(() => {
//   getUserProfile()
//  },[])
 

  return (
  <BrowserRouter>
    <div className="App">
      <div className="appName">
        <Navbar />
        <Routes>
          {auth ? <Route path='/' element={<Dashboard forceUpdate={forceUpdate}/>} />
          : <Route path='/' element={<Homepage />} />}
          
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />

          {auth ? <Route path='/task/:id' element={<TaskDetails/>}/>
          : <Route path='/task/:id' element={<Homepage/>}/>}
          
          {auth ? <Route path='/createtask' element={<CreateTask/>}/>
          : <Route path='/createtask' element={<Homepage/>}/>}
          
          {auth ? <Route path='/profile' element={<UserProfile/>}/>
          : <Route path='/profile' element={<Homepage/>}/>}

        </Routes>
        {/* <div className='copyright_section'>
          <span className='copyright'> Ⓒ Scrumboleo 2022</span>
        </div> */}
      </div>
    </div>
  </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  console.log('state at App.js', state)
  return {
    auth: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch({ type: 'GET_USER_PROFILE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
