import React from 'react'
import { Formik } from 'formik'

export const FormContainer = 
({initialValues, validationSchema, onSubmit, children}) => {
    return ( 
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}>
            {children}
        </Formik>
    )
}

export default function validate(getValidationSchema) {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, {abortEarly: false})
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

export const handleChecked = (e, form) => {
    form.setFieldValue(e.target.name, e.target.checked)
}

export const setInputProps =(name, classes = "", {errors, touched, handleChange, handleBlur}) => {
    return ({
        name: name,
        className: `${classes} ${errors[name] && touched[name] ? "--invalid" : ""}`,
        onChange: handleChange,
        // onBlur: handleBlur
    })
}

export const setCurrencyInputProps = (name, classes = "", {errors, touched, handleChange, handleBlur, setFieldValue}) => ({
    name: name,
    className: `${classes} ${errors[name] && touched[name] ? "--invalid" : ""}`,
    onChange: handleChange,
    onBlur: (event)=>{
        const formatted = event.target.value &&
            !isNaN(event.target.value.toString().replace(/,/g, '')) &&
            parseFloat(event.target.value.toString().replace(/,/g, ''))
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        event.target.value = formatted
        setFieldValue(name, formatted)
        handleBlur(event)
    }
})

export const checkableBoolProps = (name, classes = "", {errors, touched, handleChange, handleBlur, setFieldValue}) => ({
    name: name,
    className: `${classes} ${errors[name] && touched[name] ? "--invalid" : ""}`,
    onChange: ({target}) => setFieldValue(name, target.checked),
    onBlur: handleBlur
})


function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }
    }, {})
}