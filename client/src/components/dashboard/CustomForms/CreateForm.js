import { Fragment, useEffect, useRef, useState } from "react";
import './CustomForms.scss' 
import '../GestionLinks/gestionlinks.scss'
import {arrayMove} from 'react-sortable-hoc';
import {SortableList} from '../../dashboard/Sortables/Sortables';
import { convertDate, generateId, onChangeInput } from '../../helpers/helpers';
import { FormContainer, setInputProps, setInputRadeo,checkableBoolProps} from '../../helpers/common/forms/Form';
import { getFormDataBuilder, updateFormBuilder } from './api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pruebaData } from '../../../data/example';
import BaseModalFields from '../Customfields/component/BaseModalFields';
import { FormEditorSchema, FormSchema } from "../../helpers/common/forms/constraints/ValidatonSchemas";
const defaultData = {
    uuid:"",
    title:'',
    typeInput:'',
    entity:'',
    enable:false,
    className:'',
}

export default  function CreateForm(){
    const field = document.querySelector(".content-typeof-field form");
    const { id } = useParams();
    
    const [defaultEdit,setDefaultEdit] = useState(defaultData);
    const [openModalOptions,setopenModalOptions] = useState(false);
    const [initialValues,setInitialValues] = useState({
        uuid_form: id || generateId({type:"number"}).toString(),
        enable:false,
        title_form:"",
        baseurl:"",
        mailto:"",
        subject:"",
        message:"",
        items:[],
    });

    const onSortEnd = async ({oldIndex, newIndex}) => {
        const newList = arrayMove(initialValues.items, oldIndex, newIndex);
        setInitialValues(prevState => {
            return {
                ...prevState,
                items:newList
            }
        })
    };

    const submitForm = async (values,{ setSubmitting, resetForm }) => {
        updateFormBuilder(values).then((res)=>{
            console.log(res)
        })
        toast.success('Formulario actualizado correctamente');
    }

    const addGroup =(values)=> {
        openModal(false)
        values.validations = [
            values.typeInput == "text" || values.typeInput == "number" ? 'string':"",
            values.enable == true ? "required": "",
            values['type-validator'] ? values['type-validator'] : "",
        ].filter(Boolean);
        values.name = values.entity;
        values.params = {
            
        }
        setInitialValues(prevState =>{
            values.uuid ? values.uuid = values.uuid : values.uuid = generateId({type:"number"}).toString();
            let allItems = prevState.items.filter(e=>e.uuid != values.uuid);
            return {
                ...prevState,
                items:[...allItems,values]
            }
        });
    }
    const openModal = (value) => {
        field.reset();
        setopenModalOptions(value);
        setDefaultEdit(defaultData);
    }
    const editItem = (item) => {
        setDefaultEdit(item);
        setopenModalOptions(true);
    } 
    const deleteItem = (itemSelected) => {
        const newList = initialValues.items.filter((item)=>item.uuid !== itemSelected.uuid);
        setInitialValues({items:newList});
    }
    const modifyInitialValues = (values) => {
        console.log(values)
        
    }
    useEffect(()=>{
        getFormDataBuilder(id).then(res=>{
            let data = res;
            data.items = JSON.parse(res.data);
            setInitialValues(data);
            try {
                document.querySelector("#enableFor").checked = data.enable;
            } catch (err) {
                console.log(err)
            }
        })
    },[])
    return(
        <div className='gestion-links d-flex'>
            <div className='features'>
                
                <BaseModalFields 
                    ValuesDefault={defaultEdit}
                    openModal={openModalOptions}
                    modifyValues={modifyInitialValues}
                    setter={setDefaultEdit}
                    setOpenModal={openModal}
                    className="form-style"
                    onSubmit={addGroup}
                    render={(form)=>(
                        <Fragment>
                        </Fragment>
                    )}
                />
                <FormContainer
                initialValues={initialValues}
                validationSchema={FormEditorSchema}
                onSubmit={submitForm}
                >{form => {const {handleSubmit, errors, touched, isSubmitting,resetForm } = form;
                    return(
                    <form className='form-style d-flex flex-column form-creator-form' onSubmit={handleSubmit} >
                        <h2 className="title-component bold pb-1">Crear nuevo formulario</h2>
                        <div className='info-section d-flex align-center'>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-eye mr-03"></i><strong className='bold'>Estado</strong>: Publicado</span>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-calendar-week mr-03"></i><span className='bold'>Fecha de publicación: </span> {convertDate(initialValues.created_at)}</span>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-calendar-week mr-03"></i><span className='bold'>ID: </span> {initialValues.uuid_form}</span>
                            <button type='submit' className='ml-auto btn c-white b-blue'>Publicar</button>
                        </div>
                        <div className='d-flex w-100'>
                            <div className='content-input d-flex align-center w-100'>
                                <span className='title-group bold'>Título de grupo</span>
                                <input 
                                    {...setInputProps("title_form",` ${form.errors["title_form"] ? "--invalid" : " "}`, form)}
                                    onChange={(e)=>{onChangeInput(setInitialValues,e)}} 
                                    defaultValue={initialValues.title_form}>
                                </input>
                            </div>
                        </div>
    
                        <div className='content-data d-flex'>
                            <div className='content-group content-group-1'>
                                <div className='list sublinks'>
                                    <div className='group-info mb-05 d-flex'>
                                        <span className='name'>Nombre</span>
                                        <span className='type'>Tipo</span>
                                        <span className='type'>Activo</span>
                                        <span className='accions'>Acciones</span>
                                    </div> 
                                    {
                                        initialValues.items.length > 0 ? 
                                        <>
                                            <SortableList
                                                items={initialValues.items}
                                                editItem={editItem}
                                                deleteItem={deleteItem}
                                                onSortEnd={onSortEnd}
                                                helperClass='dragged'
                                                lockAxis="y" useDragHandle
                                            />
                                        </>
                                        : null
                                    }
                                    <div className='group-info d-flex justify-center align-center c-pointer' onClick={()=>{setopenModalOptions(true)}}>
                                        <span className='d-flex align-center'>
                                            <i className="fas fa-plus mr-1"></i>
                                            Agregar nuevo campo
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='content-group-2'>
                                <div className='switch d-flex align-center mb-1 mt-1'>
                                    <input type="checkbox" id='enableForm' {...checkableBoolProps("enable", ` ${form.errors["enable"] ? "--invalid" : " "}`, form)} 
                                        defaultChecked={true}/>
                                    <span className="toggle-switch mr-1">
                                        <label className="handle-toggle" htmlFor="enableForm"></label>
                                    </span>
                                    <label className='paragraph'>Mostrar el formulario</label>
                                </div>
                                
                                <div className='content-input d-flex flex-column mb-1'>
                                    <label>Url base</label>
                                    <input {...setInputProps("baseurl", `${form.errors["baseurl"] ? "--invalid" : " "}`, form)} placeholder='url' 
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}} 
                                        defaultValue={initialValues.baseurl}/>
                                </div>
                                <div className='content-input d-flex flex-column mb-1'>
                                    <label>Correo al que se enviara las notificaciones*</label>
                                    <input type="email" 
                                        {...setInputProps("mailto", `${form.errors["mailto"] ? "--invalid" : " "}`, form)} 
                                        placeholder='Correo'
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        defaultValue={initialValues.mailto}/>
                                </div>
                                <div className='content-input d-flex flex-column mb-1'>
                                    <label>Asunto</label>
                                    <input {...setInputProps("subject", `${form.errors["subject"] ? "--invalid" : " "}`, form)} 
                                        placeholder='Asunto' 
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}  
                                        defaultValue={initialValues.subject}/>
                                </div>
                                <div className='content-input d-flex flex-column mb-1'>
                                    <label>Mensaje</label>
                                    <input {...setInputProps("message", `${form.errors["message"] ? "--invalid" : " "}`, form)} 
                                        placeholder='mensaje' 
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}} 
                                        defaultValue={initialValues.message}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    )}}
                </FormContainer>
            </div>
           
        </div>
    )
}
