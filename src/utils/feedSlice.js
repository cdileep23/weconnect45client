
import { createSlice } from "@reduxjs/toolkit"
const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload

        },
        removeUserFromFeed:(state,action)=>{
           const newarr=state.filter((r)=>r._id!=action.payload)
           return newarr;
        },
        resetFeed:(state,action)=>{
            return null
        }
    }
})
export const{addFeed,removeUserFromFeed,resetFeed}=feedSlice.actions


export default feedSlice.reducer