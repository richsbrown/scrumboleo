import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    numOfCakes: number
}

const initialState: InitialState = {
    numOfCakes: 10
}

const cakeSlice = createSlice({ // createSlice automatically creates action creators for each action listed in it's reducers object. Also returns the main reducer function to be provided to the redux store
    name: 'cake', // name of the slice
    initialState, // initialState
    reducers: {
        ordered: (state) => {
            state.numOfCakes--
        },
        restocked: (state, action: PayloadAction<number>) => {
            state.numOfCakes += action.payload
        }, 
    },
})

export default cakeSlice.reducer // default export
export const { ordered, restocked } = cakeSlice.actions // named export