import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from '@firebase/auth';
import { doc, setDoc  } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const signInWithEmail = (credentials) => {
return (dispatch, getState) => {
signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
    ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' })
    }).then(() => {
        dispatch({ type: 'GET_USER_DATA'})
    }).then(() => {
        dispatch({ type: 'GET_USER_PROFILE'})
    }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err })
    })
    }
}

export const logOut = () => {
    return(dispatch, getState) => {
        signOut(auth).then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGOUT_ERROR', err })
        })
    }
}

export const signUpWithEmail = (newUser) => {
    return(dispatch, getState) => {
        createUserWithEmailAndPassword(
            auth,
            newUser.email,
            newUser.password
        ).then((response) => {
            return setDoc(doc(db, 'users', response.user.uid), {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                email: newUser.email,
                //tasks: [],
                technologies: [],
                projectTitle: 'Add a project title -->',
                projectId: uuidv4()
        })
        }) .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).then(() => {
            dispatch({ type: 'GET_USER_DATA' })
        }).then(() => {
            dispatch({ type: 'GET_USER_PROFILE'})
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
        
        
        // .then(() => {
        //     console.log(auth.getCurrentUser)
        //     auth.getCurrentUser.sendEmailVerification();
        //     auth.signOut();
        //     alert("Email sent");
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
}