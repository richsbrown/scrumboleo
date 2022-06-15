import { auth } from "../../config/firebaseConfig"

const initState = {
    authError: null,
    user: null,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'login failed',
                user: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message,
                user: null
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            console.log(auth.currentUser)
            return {
                ...state,
                authError: null,
                user: true
            }
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null,
                user: true
            }
        case 'LOGOUT_SUCCESS':
            console.log('logout success')
            return {
                ...state,
                authError: null,
                user: null
            }
        case 'RESET_AUTH_ERROR':
            console.log('authError RESET')
            return {
                ...state,
                authError: null,
                user: null
            }
        default:
            return state;
    }
}

export default authReducer