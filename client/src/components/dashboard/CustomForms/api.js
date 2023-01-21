import axios from "axios";
import { generateId } from "../../helpers/helpers";

export const updateFormBuilder = async(data) =>{
    const raw =  await axios.post(`/Form/upload`,{data:data})
    return raw.data
}

export const getFormDataBuilder = async(id) =>{
    const raw =  await axios.get(`/Form/getform/${id}`)
    return raw.data
}

export const getFormBuilderList = async(path) =>{
    const raw =  await axios.get(`/Form/getformlist`)
    console.log(raw.data)
    return raw.data
}

export const deleteForm = async(id) =>{
    const raw =  await axios.get(`/Form/delete/${id}`)
    return raw.data
}