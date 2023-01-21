import axios from "axios"

export const initSeccionBot = async() =>{
    const data = await axios.get("/bot/login");
    return data;
}