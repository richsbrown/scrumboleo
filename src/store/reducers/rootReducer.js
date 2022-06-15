import { combineReducers } from "redux";
import authReducer from "./authReducer";
//import taskReducer from "./projectReducer";
//import firestoreReducer from "./firestoreReducer";
import firebaseReducer from "./firebaseReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    //task: taskReducer,
    //database: databaseReducer,
    firebase: firebaseReducer
});

export default rootReducer;