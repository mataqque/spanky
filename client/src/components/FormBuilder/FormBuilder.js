import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { createInitialSchema, createValidationSchema } from "../../components/FormBuilder/creatorSchema";
import { TypeInputs } from "../page/formbuider/formbuilder";
import { getDataForm, sendData } from "./api";


export default function FormBuilder({id,className}){
    const formReset = useRef(null);
    const [initialValues,setInitialValues] = useState({});
    const [initialSchema,setInitialSchema] = useState(createValidationSchema([]));
    
    function cleanDataSend(data){
        let newData = {} 
        data.items.map((item,index)=>{
            newData[item.name] = data[item.name];
        })
        return newData;
    }
    const onsubmit = (values) => {
        let newData = cleanDataSend(values);
        sendData(newData).then((data)=>{
            console.log(data);
            formReset.current.resetForm();
        })
    }
    useEffect(() => {
        getDataForm(id).then((data)=>{
            console.log(data)
            setInitialValues(data);
            setInitialSchema(createValidationSchema(data.items));
        })
    },[])
    return(
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={initialSchema}
            onSubmit={onsubmit}
            render={(form) => (
                <form className={`form-style ${className}`} onSubmit={form.handleSubmit} ref={formReset}>
                    {
                        initialValues.items ? 
                        initialValues.items.map((item,index)=>{
                            const {typeInput} = item;
                            const Component = TypeInputs[typeInput]?.component || TypeInputs.Text.component;
                            if(typeInput){
                                return(
                                    <Component 
                                        key={'input-'+index}
                                        placeholder={item?.placeholder ? item.placeholder : ''}
                                        title={item.title}
                                        name={item.name}
                                        className={item.className}
                                        form={form}
                                        valuesDefault={initialValues}
                                        setter={setInitialValues}
                                    />
                                )
                            }
                        }) : null
                    }
                    <div className='content-submit mt-2'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            )}
        />
    )
}

