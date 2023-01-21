import axios from 'axios'
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { arrayMove } from 'react-sortable-hoc';
import { convertDate, generateId, onChangeInput } from '../../helpers/helpers';
import { FormContainer, setInputProps,checkableBoolProps} from '../../helpers/common/forms/Form';
import '../CustomForms/CustomForms.scss' 
import '../GestionLinks/gestionlinks.scss'
import BaseModalFields from './component/BaseModalFields';
import { FormSchema } from '../../helpers/common/forms/constraints/ValidatonSchemas';
import { data } from './api';
import { SortableList } from '../Sortables/Sortables';

export default  function CreateFieldGlobal(){
    const field = document.querySelector(".content-typeof-field form");
    const defaultData = {
        uuid:"",
        title:'',
        typeInput:'',
        enable:false,
        required:false,
    }
    const [defaultEdit,setDefaultEdit] = useState(defaultData);
    const [openModalOptions,setopenModalOptions] = useState(false);
    const checkeable = useRef(null);
    const [initialValues,setInitialValues] = useState({
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
        console.log('send',values)
    }

    const openModal = (value) => {
        console.log('open',value)
        setopenModalOptions(value);
        setDefaultEdit(defaultData);
    }
    const addGroup =(values)=> {
        setopenModalOptions(false);
        setInitialValues(prevState =>{
            values.uuid ? values.uuid = values.uuid : values.uuid = generateId({type:"number"});
            let allItems = prevState.items.filter(e=>e.uuid != values.uuid);
            return {
                ...prevState,
                items:[...allItems,values]
            }
        });
        setDefaultEdit(defaultData);
        field.reset()
    }
    const editItem = (item) => {
        setopenModalOptions(true);
        setDefaultEdit(item)
    } 
    const deleteItem = (itemSelected) => {
        const newList = initialValues.items.filter((item)=>item.uuid !== itemSelected.uuid);
        initialValues.items = newList;
        console.log(initialValues)
        setInitialValues(initialValues);
    }
    const resetForm = () => {
        setopenModalOptions(false);
    }
    useEffect(()=>{
        setInitialValues(data)
    },[])

    return(
        <div className='gestion-links d-flex'>
            <div className='features'>
                {/* <BaseModalFields 
                    ValuesDefault={defaultEdit}
                    openModal={openModal}
                    setter={setDefaultEdit}
                    setOpenModal={setopenModalOptions}
                    className="form-style"
                    onSubmit={addGroup}
                    render={(form)=>(
                        <Fragment>
                        </Fragment>
                    )}
                /> */}
                <FormContainer
                initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={submitForm}
                >{form => {const {handleSubmit, errors, touched, isSubmitting,resetForm } = form;
                    return(
                    <form className='form-style d-flex flex-column form-creator-form' onSubmit={handleSubmit}> 
                        <h2 className="title-component bold pb-1">Crear nuevo campo</h2>
                        <div className='info-section d-flex align-center'>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-eye mr-03"></i><strong className='bold'>Estado</strong>: Publicado</span>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-calendar-week mr-03"></i><span className='bold'>Fecha de publicación: </span> {convertDate(initialValues?.created_at)}</span>
                            <span className='mr-1 d-flex align-center'><i className="fas fa-calendar-week mr-03"></i><span className='bold'>ID: </span> {initialValues?.uuid_form}</span>
                            <button type='submit' className='ml-auto btn c-white b-blue'>Publicar</button>
                        </div>
                        <div className='d-flex w-100'>
                            <div className='content-input d-flex align-center w-100'>
                                <span className='title-group bold'>Título de grupo</span>
                                <input 
                                    {...setInputProps("title_group", "input", form)}
                                    onChange={(e)=>{onChangeInput(setInitialValues,e)}} 
                                    defaultValue={initialValues.title_group}>
                                </input>
                            </div>
                        </div>
    
                        <div className='content-data d-flex'>
                            <div className='content-group content-group-1'>
                                <div className='list sublinks'>
                                    <div className='group-info mb-05 d-flex'>
                                        <span className='name'>Nombre</span>
                                        <span className='type'>Tipo</span>
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
                                <div className='switch d-flex align-center mb-2 mt-1'>
                                    <input type="checkbox" id='hidden' {...checkableBoolProps("enable", "input", form)} ref={checkeable} defaultChecked={initialValues.enable}/>
                                    <span className="toggle-switch mr-1">
                                        <label className="handle-toggle" htmlFor="hidden"></label>
                                    </span>
                                    <label className='paragraph'>Mostrar los campos</label>
                                </div>
                                <div className='d-flex flex-column mb-1'>
                                    <strong className='mb-1'>UBICACIÓN</strong>
                                    <p className='paragraph mb-1'><strong>Reglas</strong>: Crea un conjunto de reglas para determinar qué pantallas de edición utilizarán estos campos personalizados</p>
                                    <div className='content-input'>
                                        <select {...setInputProps("rules", "mr-1 middle", form)} defaultValue="">
                                            <option value="">Opciones</option>
                                            <optgroup label="Post" type="text" >
                                                <option value="post_type">Post Type</option>
                                                <option value="post_template">Plantilla de entrada:</option>
                                                <option value="post_status">Estado del Post</option>
                                                <option value="post_format">Formato de Post</option>
                                                <option value="post_category">Categoría de Post</option>
                                                <option value="post_taxonomy">Taxonomía de Post</option>
                                                <option value="post">Post</option>
                                            </optgroup>
                                            <optgroup label="Página">
                                                <option value="page_template">Plantilla de Página</option>
                                                <option value="page_type">Tipo de Página</option>
                                                <option value="page_parent">Página Superior</option>
                                                <option value="page">Página</option>
                                            </optgroup>
                                            <optgroup label="Usuario">
                                                <option value="current_user">Usuario Actual</option>
                                                <option value="current_user_role">Rol del Usuario Actual</option>
                                                <option value="user_form">Formulario de Usuario</option>
                                                <option value="user_role">Rol de Usuario</option>
                                            </optgroup>
                                            <optgroup label="Formularios">
                                                <option value="taxonomy">Taxonomía</option>
                                                <option value="attachment">Adjunto</option>
                                                <option value="comment">Comentario</option>
                                                <option value="widget">Widget</option>
                                                <option value="nav_menu">Menú</option>
                                                <option value="nav_menu_item">Elemento del menú</option>
                                                <option value="block">Bloque</option>
                                                <option value="options_page">Página de Opciones</option>
                                            </optgroup>
                                        </select>
                                        <select className='middle-2'>
                                            <option>Sin Título</option>
                                        </select>
                                    </div>
                                    <div className='content-input flex-column'>
                                        <label className='paragraph'>Descripción</label>
                                        <input></input>
                                    </div>
                                    <div className='content-input flex-column'>
                                        <label className='paragraph'>Número de posición</label>
                                        <input></input>
                                    </div>
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



