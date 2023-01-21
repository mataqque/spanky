import { createSlice } from '@reduxjs/toolkit'

// The initial state of the counter, observation is that the links.component dont save the component react, 

const  initialState = {
    activeLinkValue: 0,
    navShow:true,
    links:[
        {
            index:0,
            title:"Inicio",
            link: '/',
            component:{name:'Home'},
            metaDescription:'',
            metaKeyword: '',
        },
        {
            index:1,
            title:"nosotros",
            link: '/nosotros',
            component:{name:'About'},
            metaDescription:'',
            metaKeyword: '',
        },
        {
            index:2,
            title:"Login",
            link: '/login',
            component:{name:'Login'},
            metaDescription:'',
            metaKeyword: '',
            show:true,
        },
        // {
        //     index:3,
        //     title:"Apuesta",
        //     link: '/apuesta',
        //     component:{name:'Apuesta'},
        //     metaDescription:'',
        //     metaKeyword: '',
        //     show:true,
        // },
    ]
}
export const routesFeatures = createSlice({
    name:"routes",
    initialState,
    reducers:{
        activeLinks: (state,value)=>{
            state.activeLinkValue = value.payload
        },
        hideNav:(state)=>{
            state.navShow = false
        },
        showNav:(state)=>{
            state.navShow = true
        },
    }
})

export const {activeLinks, hideNav, showNav} = routesFeatures.actions
export default routesFeatures.reducer