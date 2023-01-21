import axios from "axios"

// export const data = {
//     "uuid_form": "123456789",
//     "enable": true,
//     "title_group": "Página de inicio",
//     "rules": "",
//     "description": "",
//     "created_at": "2020-12-12",
//     "updated_at": "2020-12-12",
//     "listInputs": [
//         {
//             "uuid": 1664689452299,
//             "title": "name",
//             "typeInput": "text",
//             "enable": false,
//             "validations": ["numeric","required"],
//             "params": {
//                 "min": 8,
//                 "required": "name is required"
//             },
//             "options": [],
//         },
//         {
//             "uuid": 1664689458821,
//             "title": "email",
//             "typeInput": "text",
//             "enable": false,
//             "options": [],
//             "validations": ["string", "email", "required"],
//             "params": {
//                 "min": 3,
//                 "max": 20,
//                 "email": "email is not valid",
//                 "required": "Email is required"
//             },
//         },
//         {
//             "uuid": 1664689468895,
//             "title": "dormitorios",
//             "typeInput": "select",
//             "enable": false,
//             "optionDefault": "0",
//             "options": [
//                 {
//                     "value": "0",
//                     "label": "Elige una opción"
//                 },
//                 {
//                     "value": "1",
//                     "label": "1 Dormitorio"
//                 },
//                 {
//                     "value": "2",
//                     "label": "2 Dormitorios"
//                 },
//                 {
//                     "value": "3",
//                     "label": "3 Dormitorios"
//                 },
//             ],
//             "validations": ["string","required"],
//             "params": {
//                 "required": "Dormitorio is required"
//             },
//         }
//     ]
// }


export const getDataForm = async (uuid) => {
    let res =  await axios.get(`/Form/getform/${uuid}`);
    let data = res.data;
    data.items = JSON.parse(data.data)
    console.log(data)
    return data;
}

export const sendData = async (data) => {
    let res =  await axios.post(`/leadSheet/saveLead`,data);
    return res.data;
}