import axios from "axios";
import { generateId } from "../../helpers/helpers";

export const updateFormBuilder = async(data,items) =>{
    const uuid_form = data.uuid_form ? data.uuid_form : generateId({type:"number"});
    data.uuid_form = uuid_form;
    data.items = items;
    const raw =  await axios.post("/customField/upload",data)
    return raw.data;
}

export const data = {
    uuid_form: "123456789",
    enable: true,
    title_group:"Página de inicio",
    rules:"",
    description:"",
    created_at: "2020-12-12",
    updated_at: "2020-12-12",
    items:[],
}

// export const getDataFields = async(id) =>{
//     const raw =  await axios.get(`/formbuild/getform/${id}`)
//     return raw.data
// }