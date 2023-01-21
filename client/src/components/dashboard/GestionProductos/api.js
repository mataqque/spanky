import axios from "axios";

export const api = {
    getAllProducts: async () => {
        const response = await axios.get(`/products/getProducts`);
        return response.data;
    },
    getProduct:async (id) =>{
        const response = await axios.get(`/products/getProduct/${id}`);
        return response.data;
    },
    addProduct: async (product) => {
        console.log(product);
        const response = await axios.post(`/products/add`, product);
        return response.data;
    },
}