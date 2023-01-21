import { useEffect, useState } from "react"
import { AddField } from "../../helpers/common/forms/constraints/ValidatonSchemas";
import { FormContainer, setInputProps } from "../../helpers/common/forms/Form";
import { getFormData } from "./api";
import { InputSelect, InputText } from "./typefileds";

export const TypeInputs = {
    Text: {component:InputText,},
    Select: {component:InputSelect},
    Number: {component:InputSelect},
    Textarea: {component:InputSelect},
    Date: {component:InputSelect},
    File: {component:InputSelect},
    Check: {component:InputSelect},
    Radio: {component:InputSelect},
}

export default function Formbuilder({id,...props}){
    const [initialValues, setInitialValues] = useState({
        title_group:"",
    });
    const [FormData, setFormData] = useState({items:[]});
   
    const submitForm = (values)=>{

    }
    return(
        <FormContainer
            initialValues={initialValues}
            validationSchema={AddField}
            onSubmit={submitForm}
        >{form => {const {handleSubmit, errors, touched, isSubmitting,resetForm } = form;
            return(
                <form className="form-style" onSubmit={handleSubmit}>
                    {
                        FormData.items ? 
                        FormData.items.map((item,index)=>{
                            const {type,placeholder} = item;
                            const Component = TypeInputs[type]?.component || TypeInputs.Text.component;
                            if(type){
                                return(
                                    <Component 
                                        key={'input-'+index}
                                        placeholder={item.placeholder}
                                        item={item}
                                        title={item.title}
                                        name={item.name}
                                        className={item.className}
                                        form={form}
                                        setter={setInitialValues}
                                    />
                                )
                            }
                        }) : null
                    }
                </form>
            )
        }}
        </FormContainer>
    )
}