import { combineReducers } from "redux";
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
});

export default rootReducer;
