import axios from "axios";

export const createPage = async(data) =>{
    const raw =  await axios.post("/pages/createPage",data)
    console.log(raw)
    return raw;
}

export const getPagesFromDatabase = async(data) =>{
    const raw =  await axios.get("/pages/getPages",data)    
    return raw.data;
}