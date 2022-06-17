import { db } from '../../config/firebaseConfig'; 
import { collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export const createTask = (task) => {
   
    return (dispatch, getState, {}) => {
        
        const profile = getState().firebase.userProfile
        const authorId = getState().firebase.user.uid
        const projectId = getState().firebase.userProfile.projectId
        
        //make async call to database
        // updateDoc(doc(db, 'users', authorId), {
        //     tasks: arrayUnion({
        //         ...task, 
        //         id:uuidv4(), 
        //         projectId: projectId,
        //         authorId: authorId,
        //         createdAt: new Date()
        //     }), 
        // })
        
        addDoc(collection(db, 'tasks'), {
                ...task, 
                //id:uuidv4(), 
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