import { db } from '../../config/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore";

export const createTask = (task) => {
   
    return (dispatch, getState) => {
        
        //const profile = getState().firebase.userProfile
        const authorId = getState().firebase.user.uid
        const projectId = getState().firebase.userProfile.projectId
        
        addDoc(collection(db, 'tasks'), {
                ...task, 
                projectId: projectId,
                authorId: authorId,
                createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', task })
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
    }
}