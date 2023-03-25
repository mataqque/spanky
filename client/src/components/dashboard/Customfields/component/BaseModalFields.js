import { Formik } from "formik"
import { Fragment, useEffect, useRef, useState } from "react"
import { createValidationSchema} from "../../../FormBuilder/creatorSchema"
import { checkableBoolProps, setInputProps } from "../../../helpers/common/forms/Form"
import { generateId, onChangeInput} from "../../../helpers/helpers"
import { TypeInputs } from "../../../page/formbuider/formbuilder"
import { listTypeFields } from "../config"
import { baseSchema } from "./configBaseModal"

export default function BaseModalFields({modifyValues,ValuesDefault,openModal,setOpenModal,className,render,setter,...props}) {
    const formReset = useRef(null);
    const checkBook = useRef(null);
    const [BaseValidationSchema, setBaseValidationSchema] = useState(createValidationSchema(baseSchema))
    console.log("BaseValidationSchema",BaseValidationSchema)
    const [listOfDynamicComponents, setListOfDynamicComponents] = useState([])

    const onsubmit = (values) => {
        formReset.current.resetForm();
        props.onSubmit(values);
    }
    const chanceCheckBox = (name,check) => {
        let time =  setTimeout(() => {
            setter(prevState => ({
                ...prevState,
                [name]:check.current.checked
            }));
            clearTimeout(time);
        }, 100);
    }
    const setModalActive = (value) => {
        setBaseValidationSchema(createValidationSchema(baseSchema));
        setListOfDynamicComponents([]);
        setOpenModal(value);
    }
    const changeOptions = (setter,type,typeInput)=>{
        let listArray = listTypeFields.map((item)=>{
            if(item.type == typeInput){
                let newbase = baseSchema.concat(item.listInputs)
                let newSchema = createValidationSchema(newbase);
                setBaseValidationSchema(newSchema)
                setListOfDynamicComponents(item.listInputs)
                return item.listInputs
            }
        }).filter(Boolean)[0] || [];

        setter(prevState => ({
            ...prevState,
            [type]:typeInput
        }));
        modifyValues(type)
    }
    useEffect(() => {
        if(ValuesDefault.typeInput){
            try {
                document.querySelector("#hidden").checked = ValuesDefault.enable;
            } catch (err) {
                console.error(err)
            }
            let listArray = listTypeFields.map((item)=>{
                if(item.type == ValuesDefault.typeInput){
                    let newbase = baseSchema.concat(item.listInputs)
                    let newSchema = createValidationSchema(newbase);
                    setBaseValidationSchema(newSchema)
                    setListOfDynamicComponents(item.listInputs)
                    return item.listInputs
                }
            }).filter(Boolean)[0] || [];
        }
    }, [ValuesDefault])

    return(
        <section className={`content-typeof-field ${openModal == true ? "active":""}`}>
            <div className={`icon-close mask`} onClick={()=>{setModalActive(false)}}></div>
            <p className='title text-center mb-1 pt-1  bold'>Agregar categoría</p>
            <div className='contentedor-scroll'>
                <div className='scroll'>
                    <Formik
                        enableReinitialize
                        initialValues={ValuesDefault}
                        validationSchema={BaseValidationSchema}
                        onSubmit={props.onSubmit}
                        render={(form) => (
                        <form className={className} onSubmit={form.handleSubmit} ref={formReset}>
                            <div className='switch d-flex align-center mb-1 mt-1'>
                                <input type="checkbox" id='hidden' 
                                    {...checkableBoolProps("enable", "input", form)}
                                    defaultChecked={ValuesDefault.enable}
                                    ref={checkBook}
                                />
                                <span className="toggle-switch mr-1">
                                    <label className="handle-toggle" htmlFor="hidden"
                                        onClick={(e)=>{chanceCheckBox("enable",checkBook)}}
                                    ></label>
                                </span>
                                <label className='paragraph'>Marcar como campo obligatorio</label>
                            </div>
                            <div className="content-input flex-column w-100">
                                <span className='mb-05 d-flex'>1. Elige un título asociado al input*</span>
                                <input type="text" 
                                    {...setInputProps("title", "input col", form)}
                                    placeholder="Título*" defaultValue={ValuesDefault?.title}
                                    onChange={(e)=>{onChangeInput(setter,e)}}
                                ></input>
                            </div>
                            <div className="content-input flex-column w-100">
                                <span className='mb-05 d-flex'>2. Entidad ("propiedad name del campo")*</span>
                                <input type="text" 
                                    {...setInputProps("entity", "input col", form)}
                                    placeholder="Entidad*" defaultValue={ValuesDefault?.entity}
                                    onChange={(e)=>{onChangeInput(setter,e)}}
                                ></input>
                            </div>
                            <div className="content-input flex-column w-100">
                                <span className='mb-05 d-flex'>3. Class css</span>
                                <input type="text" 
                                    {...setInputProps("className", "input col", form)}
                                    placeholder="Entidad*" defaultValue={ValuesDefault?.className}
                                    onChange={(e)=>{onChangeInput(setter,e)}}
                                ></input>
                            </div>
                            <div className="content-input flex-column w-100">
                                <span className='mb-05 d-flex'>4. Seleccionar tipo de input*</span>
                                <div className='content-types'>
                                    {
                                        listTypeFields.map((item, index)=>{
                                            return(
                                                <label 
                                                    className={`type ${item.type == ValuesDefault.typeInput ? "active":""}  ${form.errors.typeInput ? "error":""}`}
                                                    key={generateId+index} 
                                                    onClick={()=>{changeOptions(setter,'typeInput',item.type)}}
                                                    value={item.type}
                                                >
                                                    <div className='select-option'>
                                                    </div>
                                                    <div className='icon-type'>
                                                        <img src={item.icon} alt=""/>
                                                    </div>
                                                    <p className='paragraph text-center '>{item.name}</p>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <DynamicComponent
                                type={ValuesDefault.typeInput}
                                List={listOfDynamicComponents}
                                form={form} 
                                setter={setter}
                                ValuesDefault={ValuesDefault}
                            />

                            <div className='d-flex pd-1 buttom-bar'>
                                <button type='submit'
                                className='btn b-blue c-white'
                                onClick={()=>{form.handleReset()}}
                                >
                                    {
                                        ValuesDefault.uuid ? "Actualizar" : "Agregar campo"
                                    }
                                </button>
                            </div>
                        </form>
                    )}/>
                </div>
            </div>
        </section>
    )
}

const DynamicComponent = ({type,List,form,baseValidation,setter,ValuesDefault,...props})=>{
    return(
        <>
            {
                List.length > 0 ? 
                List.map((item,index)=>{
                    const {type,placeholder} = item;
                    const Component = TypeInputs[item.type]?.component || TypeInputs.Text.component;
                    if(type){
                        return(
                            <Component 
                                key={'input-type-'+index}
                                placeholder={placeholder}
                                item={item}
                                title={item.title}
                                name={item.name}
                                className={item.className}
                                form={form}
                                setter={setter}
                                valuesDefault={ValuesDefault}
                            />
                        )
                    }
                }) : null
            }
        </>
    )
}