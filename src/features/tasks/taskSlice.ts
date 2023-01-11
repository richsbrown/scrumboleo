import { async } from '@firebase/util';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router';
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, where, DocumentSnapshot, DocumentData, addDoc } from 'firebase/firestore';
import { stat } from 'fs';
import { auth, db } from '../../config/firebaseConfig';
//import { store } from '../../redux/store';

type TaskProps = {
    id: string
    task: TaskDetailsProps
}

type TaskDetailsProps = {
    id?: string
    projectId?: string
    authorId?: string
    createdAt?: any
    title?: string
    owner?: string
    phase?: string
    hours?: number
    details?: string
}

type InitialState = {
    tasks: TaskProps[] | []
    numberOfTasks: number
    planning: TaskProps[] | []
    wip: TaskProps[] | []
    complete: TaskProps[] | []
    totalHours: any
    loading: boolean
    error: string | null
}

type ProjectId = {
    projectId: string | undefined
}

const initialState: InitialState = {
   tasks: [],
   numberOfTasks: 0,
   planning: [],
   wip: [],
   complete: [],
   totalHours: 0,
   loading: false,
   error: null
}

function filterTasks(tasks: any, phase: string){
    return tasks.filter((task: any) => task.task.phase == phase)
  }

function calculateTotalHours(taskList: any){
    let total = 0
    taskList = taskList.filter((task: any) => {
      return task.task.phase !== 'complete'
    })
    taskList.forEach((task: any) => {
      total = Number(total) + Number(task.task.hours)
    })
    return total
  }

//const reduxStore = store.getState()
//console.log('reduxStore', reduxStore.auth.userProfile?.email)

export const getAllTasks = createAsyncThunk('task/getAllTasks', async (projectId: string | ProjectId) => {
    try {
        const docRef = collection(db, 'tasks')
        const q = query(docRef, where('projectId', '==', projectId))       
        const querySnapshot = getDocs(q)
        let taskList: any[] = [];
        (await querySnapshot).forEach((task) => {
            taskList.push({id: task.id, task: task.data()});
        })
        return taskList
    } catch (err) {
        console.log(err)
        return err
    }
})

export const addTask = createAsyncThunk('task/addTask', async (task: TaskDetailsProps) => {
    try {
        addDoc(collection(db, 'tasks'), {
            ...task
        })
    } catch (err) {
        console.log(err)
        return err
    }        
})

export const updateTask = createAsyncThunk('task/updateTask', async (task: TaskDetailsProps) => {
    try {
        const docRef = doc(db, 'tasks', task.id!)
        updateDoc(docRef, {
        title: task.title,
        owner: task.owner,
        details: task.details,
        phase: task.phase,
        hours: task.hours
    })
    } catch (err) {
        console.log(err)
        return err
    }
})

export const updatePhase = createAsyncThunk('task/updatePhase', async (task: TaskDetailsProps) => {
    try {
        const docRef = doc(db, 'tasks', task.id!)
        updateDoc(docRef, {
        phase: task.phase
    })
    } catch (err) {
        console.log(err)
        return err
    }
})

export const deleteTask = createAsyncThunk('task/deleteTask', async (taskId: string) => {
    const docRef = doc(db, 'tasks', taskId)
    deleteDoc(docRef)
    return taskId
})

export const deleteAllTasks = createAsyncThunk('task/deleteAllTasks', async (tasks: any) => {
    tasks.forEach((task: any) => {
        const docRef = doc(db, 'tasks', task.id)
        deleteDoc(docRef)
    })
})

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllTasks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllTasks.fulfilled, (state, action: PayloadAction<any>) => {
            if(typeof action.payload === 'string'){
                state.error = action.payload
            } else if (typeof action.payload === 'object'){
                state.tasks = action.payload
                state.numberOfTasks = action.payload.length
                state.planning = filterTasks(action.payload, 'planning')
                state.wip = filterTasks(action.payload, 'wip')
                state.complete = filterTasks(action.payload, 'complete')
                state.totalHours = calculateTotalHours(action.payload) 
                state.loading = false
                state.error = null
            }
        })
        builder.addCase(getAllTasks.rejected, (state) => {
            state.error = 'Somethine went wrong'
            state.loading = false
        })

        builder.addCase(addTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addTask.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(addTask.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateTask.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateTask.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updatePhase.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePhase.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updatePhase.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            // state.tasks = state.tasks.filter((task) => {
            //     return task.id !== action.payload
            // })
        })
        builder.addCase(deleteTask.rejected, (state) => {
            state.error = 'Somethine went wrong'
            state.loading = false
        })

        builder.addCase(deleteAllTasks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteAllTasks.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteAllTasks.rejected, (state) => {
            state.loading = false
        })
    }
})

export default taskSlice.reducer // default export
export const {  } = taskSlice.actions // named export