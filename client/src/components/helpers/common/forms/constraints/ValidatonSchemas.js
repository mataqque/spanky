import * as Yup from 'yup';

export const BaseInterestedConstraints = {
    fname: Yup.string()
        .required(),
    lname: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    phone: Yup.number()
        .integer()
        .test('len', val => val.toString().length >= 7 && val.toString().length <=15)
        .required(),
}

export const UserSchema = (values) => Yup.object()
    .shape({
        username: Yup.string(),
        name: Yup.string(),
        lastname: Yup.string(),
        phone: Yup.string(),
        email: Yup.string().email(),
        address: Yup.string(),
    })

export const ProductSchema = (values) => Yup.object()
    .shape({
        uuid_product: Yup.string().required(),
        uuid_autor: Yup.string().required(),
        name_product: Yup.string().required(),
        id_empresa: Yup.string().required(),
        id_category: Yup.string().required(),
        id_subcategory: Yup.string(),
        season: Yup.string(),
        genero: Yup.string(),
        quantity: Yup.number().required(),
        price: Yup.number().required(),
        discount: Yup.number(),
        url: Yup.string().required(),
        status: Yup.string().required(),
        index_page: Yup.string().required(),
        meta_description: Yup.string(),
        meta_keywords: Yup.string(),
    })


export const AddField = (values) => Yup.object().shape({
    enable: Yup.boolean(),
    title: Yup.string().required(),
    typeInput: Yup.string().required(),
})
export const BaseValidationSchema = (values) => Yup.object().shape({
    enable: Yup.boolean(),
    title: Yup.string().required(),
    typeInput: Yup.string().required(),
})

export const AddPageSchema = (values) => Yup.object()
    .shape({
        title: Yup.string().required(),
        url: Yup.string().required(),
        category: Yup.string().required(),
        tag: Yup.string().required(),
        visibility: Yup.string().required(),
    })

export const FormSchema = (values) => Yup.object()
    .shape({
        title_form: Yup.string().required(),
        email: Yup.string().email().required(),
        subject: Yup.string().required(),
        message: Yup.string(),
    })
export const FormEditorSchema = (values) => Yup.object()
    .shape({
        title_form: Yup.string().required(),
        baseurl: Yup.string().required(),
        mailto: Yup.string().email().required(),
        subject: Yup.string().required(),
        message: Yup.string().required(),
    })


