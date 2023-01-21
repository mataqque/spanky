export const handleChecked = (e, form) => {
    form.setFieldValue(e.target.name, e.target.checked)
}

export function validate(getValidationSchema) {
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

function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }
    }, {})
}