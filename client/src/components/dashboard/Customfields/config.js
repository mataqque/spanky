const optionsTypeOfValidatorText  = [
    {value:"email",label:"Email"},
    {value:"url",label:"Url"},
    {value:"uppercase",label:"Mayusculas"},
    {value:"lowercase",label:"Minusculas"},
]
const optionsTypeOfValidatorNumeric  = [
    {value:"dni",label:"DNI"},
    {value:"celular",label:"Celular"},
]

const typeOfValidator = (options) => {
    return {
        type: "Select",
        title: "Tipo de validador",
        name: "type-validator",
        className:"w-100",
        options,
        validations: ["string"],
        params: {
        },
    }
};
const min = {
    type: "Text",
    title: "min",
    name: "min",
    placeholder: "n° min",
    className:"middle",
    validations: ["number"],
    params: {
    },
}
const max = {
    type: "Text",
    title: "max",
    name: "max",
    className:"middle-2",
    placeholder:"n° max",
    validations: ["number"],
    params: {
    },
}
export const listTypeFields  = [
    {
        id: 1,
        name: "Texto de una sola linea",
        icon: require("../../../assets/images/dashboard/icons/single-line-alpha.png"),
        type: "text",
        listInputs: [
            typeOfValidator(optionsTypeOfValidatorText),
            min,
            max
        ]
    },
    {
        id: 2,
        name: "Número",
        icon: require("../../../assets/images/dashboard/icons/single-line-number.png"),
        type: "number",
        listInputs: [
            typeOfValidator(optionsTypeOfValidatorNumeric),
            min,
            max
        ]
    },
    {
        id: 3,
        name: "Casilla de comprobación",
        icon: require("../../../assets/images/dashboard/icons/checkbox.png"),
        type: "check",
        listInputs: [
            {
                type: "Text",
                title: "parrafo",
                name: "paragraph",
                className:"w-100",
                placeholder:"Entidad",
                validations: ["string","required"],
                params: {
                    required: "paragraph is required",
                },
            }
        ]
    },
    {
        id: 4,
        name: "Lista desplegable",
        icon: require("../../../assets/images/dashboard/icons/drop-down.png"),
        type: "select",
        listInputs: [
            typeOfValidator,
            min,
            max
        ]
    },
    {
        id: 5,
        name: "Texto de varias lineas",
        icon: require("../../../assets/images/dashboard/icons/multi-line.png"),
        type: "textarea",
        listInputs: [
            typeOfValidator,
            min,
            max
        ]
    },
    {
        id: 6,
        name: "Opciones",
        icon: require("../../../assets/images/dashboard/icons/radio.png"),
        type: "radeo",
        listInputs: [
            typeOfValidator,
            min,
            max
        ]
    },
    {
        id: 7,
        name: "Fecha",
        icon: require("../../../assets/images/dashboard/icons/date-picker.png"),
        type: "date",
        listInputs: [
            typeOfValidator,
            min,
            max
        ]
    },
    {
        id: 8,
        name: "Agregar archivo",
        icon: require("../../../assets/images/dashboard/icons/file-upload.png"),
        type: "file",
        listInputs: [
            typeOfValidator,
            min,
            max
        ]
    },

]