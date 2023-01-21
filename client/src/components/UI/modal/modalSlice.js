import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,

}
export const modalStore = createSlice({
    name:"modalStore",
    initialState,
    reducers:{
        activeModal: (state, action) => {
            state.active = action.payload
        },
        
    }
})

export const {activeModal} = modalStore.actions
export default modalStore.reducer