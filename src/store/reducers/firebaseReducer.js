import { auth } from '../../config/firebaseConfig';
import { db } from '../../config/firebaseConfig'; 
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
//import { async } from '@firebase/util';

const initState = {
    user: null,
    userProfile: null
}

const firebaseReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_USER_DATA':
            console.log('get user data')
            state.user = auth.currentUser
            return {
                ...state
            }
        case 'GET_USER_PROFILE':
            console.log('get user profile')
            //const userRef = auth.currentUser
            const userData = getDoc(doc(db, 'users', state.user.uid))
            //console.log('userData', userData)
            userData
            .then((response) => {
                state.userProfile = response.data()
            }).catch((err) => console.log(err))            
            return state
        case 'LOGOUT_SUCCESS':
            console.log('logout success')
            //state.user = null
            //state.userProfile = null
            return {
                ...state,
                user: null,
                userProfile: null
            }
        default:
            return state;
    }
}

export default firebaseReducer