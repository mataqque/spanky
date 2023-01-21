import { createSlice } from "@reduxjs/toolkit";
import { deleteTokenHelper, getTokenHelper, setTokenHelper } from "./helpers/helpers";

const initialState = {
    currentUser: true,
    userLoggedIn: {},
    users: [],
}
export const userStore = createSlice({
    name:"userStore",
    initialState,
    reducers:{
        setUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload
        },
        updateUsers: (state, action) => {
            state.users = action.payload
        },
        setToken: (state)=>{
            state.currentUser = true
        },
        getToken: (state)=>{
            state.currentUser = true
        },
        deleteToken: (state)=>{
            localStorage.removeItem('token')
        },
        curremtUser: (state)=>{
            state.currentUser = true
        }
    }
})

export const { curremtUser,deleteToken,getToken,setToken,updateUsers,setUserLoggedIn} = userStore.actions
export default userStore.reducer