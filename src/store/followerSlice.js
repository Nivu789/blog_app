import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followList:[]
}

export const followSlice = createSlice({
    name:'follow',
    initialState,
    reducers:{
        follow:(state,action)=>{
            state.followList.push(action.payload)
        },
        unfollow:(state,action)=>{
            state.followList = state.followList.filter((item)=>item!==action.payload)
        }
    }
})

export default followSlice.reducer
export const {follow,unfollow} = followSlice.actions