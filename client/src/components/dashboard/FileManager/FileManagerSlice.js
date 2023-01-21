import { createSlice } from "@reduxjs/toolkit";

const fileManagerSlice = createSlice({ 
    name: "fileManager",
    initialState: {
        activeModal: false,
        files:[],
        filesUpload:[],
        selectFile: null,
        onEvent: null,
    },
    reducers: {
        setActiveModal: (state, action) => {
            state.activeModal = action.payload;
        },
        updateFile: (state, action) => {
            state.files = action.payload;
        },
        uploadFiles: (state, value) => {
            // state.filesUpload = value.payload;
        },
        selectFile: (state, action) => {
            switch (action.payload.type) {
                case "gallery":
                    console.log(action.payload)
                    state.files.forEach(file => {
                        if(file.uuid === action.payload.file.uuid){
                            file.selected = !file.selected
                        }
                    });
                    break;
                case "modal":
                    state.selectFile = action.payload.file;
                    state.files.forEach(file => {
                        file.selected = false;
                        if(file.uuid === action.payload.file.uuid){
                            file.selected = !file.selected
                        }
                    });
                    break;
            }
        },
        onSelect : (state, action) => {
            if(typeof action.payload === "function"){
                state.onEvent = action.payload;
            }else{
                console.error('onSelect must be a function')
            }
        },
        returnFile : (state, action) => {
            let data = state.files.filter(file => file.selected === true);
            state.selectFile = data[0];
            state.onEvent(JSON.parse(JSON.stringify(data[0])))
        }
    }
});

export const { setActiveModal,updateFile,selectFile,uploadFiles,onSelect,returnFile} = fileManagerSlice.actions;
export default fileManagerSlice.reducer;