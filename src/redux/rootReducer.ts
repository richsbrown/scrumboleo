import { combineReducers } from "redux";
import cakeReducer from '../features/cake/cakeSlice';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    cake: cakeReducer
});

export default rootReducer;
