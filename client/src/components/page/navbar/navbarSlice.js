import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    activeNav:true,
}

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers:{
        toggleNavbar: (state,value)=>{
            state.toggle = !state.toggle
        },
        inactiveNav: (state,value)=>{
            state.activeNav = false
        }
    }
});

export const { toggleNavbar,inactiveNav } = navbarSlice.actions;
export default navbarSlice.reducer;