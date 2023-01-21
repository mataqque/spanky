export const baseSchema = [
    {
        name: "enable",
        type: "boolean",
        label: "Enable",
        placeholder: "",
        validations: ["boolean"],
        params: {
            required: "",
        }
    },
    {
        name: "title",
        type: "text",
        label: "Titulo",
        placeholder: "",
        validations: ["string","required"],
        params: {
            required: "title is required",
        }
    },
    {
        name: "entity",
        type: "text",
        label: 'Entidad ("propiedad name del campo")',
        placeholder: "Entidad",
        validations: ["string","required"],
        params: {
            required: "entity is required",
        }
    },
    {
        name: "className",
        type: "text",
        label: 'Clase CSS(Hoja de estilos)',
        placeholder: "Class",
        validations: ["string"],
        params: {}
    },
    {
        name: "typeInput",
        type: "text",
        label: "Tipo de input",
        placeholder: "",
        validations: ["string","required"],
        params: {
            required: "typeInput is required",
        }
    },
]