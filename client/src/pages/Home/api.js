import axios from "axios"

export const dataFormBuilder = {
    "enable": false,
    "title_form": "Página de inicio",
    "base_url": "spanky.com/mail",
    "mailto": "flavio@gmail.com",
    "subject": "flavio@gmail.com",
    "message": "Nuevo mensaje",
    "name": "Nombre",
    "items": [
        {
            "uuid": "1666511307154",
            "title": "Nombre",
            "typeInput": "text",
            "entity": "name",
            "enable": false,
            "validations": [
                "string",
                "email",
                "required"
            ],
            "name": "name",
            "params": {},
            "type-validator": "email"
        },
    ]
}
export const api = {
    getProducts: async() => {
        const response = await axios.get(`/products/getProducts`);
        return response.data;
    },
}