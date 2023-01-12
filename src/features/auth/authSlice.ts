import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, deleteUser } from '@firebase/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, where, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

type UserProfile = {
    email: string
    firstName: string
    lastName: string
    initials: string
    projectId: string
    projectTitle: string
    tasks?: []
    technologies?: []
}

type InitialState = {
    user: string | null
    userProfile: UserProfile | null
    error: string | null
    loading: boolean
}

type CredentialsSignIn = {
    email: string
    password: string
}

type CredentialsSignUp = {
    firstName: string
    lastName: string
    email: string
    password: string
}

type Response = {
    uid: string;
    userData: Promise<DocumentSnapshot<DocumentData>>;
}

type UserProfileData = {
    user: string | null
    firstName: string | undefined
    lastName: string | undefined
    email: string
    newPassword?: string
}

type ProjectTitleData = {
    user: string | null
    projectTitle: string | undefined
}

const initialState: InitialState = {
    user: null,
    userProfile: null,
    error: null,
    loading: false
}

export const signInWithEmail = createAsyncThunk('auth/signInWithEmail', (credentials: CredentialsSignIn) => {
    return signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
    )
    .then((userCredentials) => {
        const user = userCredentials.user;
        return user
    })
    .then((user) => {
        const uid = user.uid;
        const userData = getDoc(doc(db, 'users', uid))
        return {uid, userData}
    })
    .then(async (response: Response) => {
        const userProfile = (await response.userData).data()
        return {uid: response.uid, userProfile}
    })
    .catch((error) => {
        const errorMessage = error.message;
        return errorMessage
    })
})

export const signUpWithEmail = createAsyncThunk('auth/signUpWithEmail', (newUser: CredentialsSignUp) => {
    return createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
    ).then((userCredentials) => {
        const user = userCredentials.user;
            setDoc(doc(db, 'users', userCredentials.user.uid), {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            email: newUser.email,
            technologies: [],
            projectTitle: '+ Project Title',
            projectId: uuidv4()      
    })
            return user
    })
    .then((user) => {
        const uid = user.uid;
        const userData = getDoc(doc(db, 'users', uid))
        return {uid, userData}
    })
    .then(async (response: Response) => {
        const userProfile = (await response.userData).data()
        return {uid: response.uid, userProfile}
    })
    .catch((error) => {
        const errorMessage = error.message;
        return errorMessage
    })
})

export const logout = createAsyncThunk('auth/logout', () => {
    signOut(auth)
})

export const getUserProfile = createAsyncThunk ('auth/getUserProfile', (user: string) => {  
    return getDoc(doc(db, 'users', user))
        .then((response) => {
        const userProfile = (response).data()
        return userProfile
        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage
        })
})

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (data: UserProfileData) => {
    try{
        const docRef = doc(db, 'users', data.user!)
        await updateDoc(docRef, {
            firstName: data.firstName,
            lastName: data.lastName,
            initials: data.firstName && data.lastName ? data.firstName[0] + data.lastName[0] : undefined,
            email: data.email
        })
        await updateEmail(auth.currentUser!, data.email)
        if(data.newPassword && data.newPassword.length >= 6){
            updatePassword(auth.currentUser!, data.newPassword)
        }
    } catch (err) {
        console.log(err)
    }  
})

export const updateProjectTitle = createAsyncThunk('auth/updateProjectTitle', (data: ProjectTitleData) => {
   try {
    const docRef = doc(db, 'users', data.user!)
    updateDoc(docRef, {
      projectTitle: data.projectTitle
    })
   } catch (err) {
    console.log(err)
   } 
})

export const deleteUserAccount = createAsyncThunk('auth/deleteUserAccount', async (user: string | null) => {
    try {
        const docRef = doc(db, 'users', user!)
        await deleteDoc(docRef)
        await deleteUser(auth.currentUser!)
    } catch (err) {
        console.log(err)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(signInWithEmail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signInWithEmail.fulfilled, (state, action: PayloadAction<any>) => {
            if(typeof action.payload === 'string'){
                state.error = action.payload
                state.loading = false
            } else if (typeof action.payload === 'object'){
                state.user = action.payload.uid
                state.userProfile = action.payload.userProfile
                state.loading = false
            }
        })
        builder.addCase(signInWithEmail.rejected, (state) => {
            state.user = null
            state.loading = false
            state.error = 'Something went wrong'
        })

        builder.addCase(signUpWithEmail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signUpWithEmail.fulfilled, (state, action: PayloadAction<any>) => {
            if(typeof action.payload === 'string'){
                state.error = action.payload
                state.loading = false
            } else if (typeof action.payload === 'object'){
                state.user = action.payload.uid
                state.userProfile = action.payload.userProfile
                state.loading = false
            }
        })
        builder.addCase(signUpWithEmail.rejected, (state) => {
            state.user = null
            state.loading = false
            state.error = 'Something went wrong'
        })

        builder.addCase(logout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null
            state.userProfile = null
            state.error = null
            state.loading = false
        })
        builder.addCase(logout.rejected, (state) => {
            state.user = null
            state.userProfile = null
            state.loading = false
            state.error = 'Something went wrong!'
        })

        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
            if(typeof action.payload === 'string'){
                state.error = action.payload
                state.loading = false
            } else if (typeof action.payload === 'object'){
                state.userProfile = action.payload
                state.loading = false
            }
        })
        builder.addCase(getUserProfile.rejected, (state) => {
            state.loading = false
            state.error = 'Something went wrong!'
        })

        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserProfile.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateUserProfile.rejected, (state) => {
            state.loading = false
            state.error = 'Something Went Wrong'
        })

        builder.addCase(updateProjectTitle.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProjectTitle.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateProjectTitle.rejected, (state) => {
            state.loading = false
            state.error = 'Something Went Wrong'
        })

        builder.addCase(deleteUserAccount.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteUserAccount.fulfilled, (state) => {
            state.loading = false
            state.user = null
            state.userProfile = null
            state.error = null
        })
        builder.addCase(deleteUserAccount.rejected, (state) => {
            state.loading = false
            state.error = 'Something Went Wrong'
        })
    }
})

 export default authSlice.reducer
 export const { resetError } = authSlice.actions

// module.exports = authSlice.reducer
// module.exports.signInWithEmail = signInWithEmail