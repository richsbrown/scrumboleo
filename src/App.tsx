import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { useAppSelector } from './redux/hooks';
import './App.css';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import HomePage from './pages/home/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import AddTask from './pages/dashboard/AddTask';
import TaskDetails from './pages/dashboard/TaskDetails';
import Userprofile from './pages/userBackend/Userprofile';

function App() {

  const user = useAppSelector((state) => state.auth.user)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {user 
            ? <Route path='/' element={<Dashboard />} />
            : <Route path='/' element={<HomePage />} />
          }
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          {user && <Route path='/addtask' element={<AddTask />} />}
          {user && <Route path='/task/:id' element={<TaskDetails />} />}
          {user && <Route path='/userprofile' element={<Userprofile />} />}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
