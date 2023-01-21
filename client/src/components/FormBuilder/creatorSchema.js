import * as Yup from "yup";

export const createValidationSchema = (fields = []) => {
    const ObjectSchema = fields.reduce((schema, field) => {
        if (field?.validations?.length) {
            schema[field.name] = field.validations.reduce((yup, type) => {
                if (field.params[type]) {
                    const params = Array.isArray(field.params[type])
                        ? field.params[type]
                        : [field.params[type]];
        
                    yup = yup[type](...params);
                } else {
                    yup = yup[type]();
                }
    
                return yup;
            },{ ...Yup });
        }
  
      return schema;
    }, {});
  
    return Yup.object().shape({ ...ObjectSchema });
};

export const createInitialSchema = (fields) => {
    let newobj = {};
    fields.forEach((e)=>{
        newobj[e?.name] = "";
    });
    return newobj;
}