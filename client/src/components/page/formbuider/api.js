import axios from "axios";

export const getFormData = async (id) => {
    const raw = await axios.get(`/formbuild/getform/${id}`);
    console.log(raw.data)
    return raw.data;
}