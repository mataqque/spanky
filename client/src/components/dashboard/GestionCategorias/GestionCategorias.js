import './gestionCategorias.scss'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './api';
import { useAuthApiQuery,useDeletePageMutation} from '../../../data/oauthSlice';
import { convertDate } from '../../helpers/helpers';
import { createValidationSchema } from '../../FormBuilder/creatorSchema';
import { baseSchema } from '../Customfields/component/configBaseModal';
import { Formik } from 'formik';
import { checkableBoolProps } from '../../helpers/common/forms/Form';
import { EditorHtml } from '../GestionProjects/editor/EditorHtml';

export default function GestionCategoriesAndTags(){
    const [categories,setCategories] = useState([])
    const [show,setShow] = useState(true)
    const dispatch = useDispatch();
    const filesData = useSelector(state => state.fileManagerSlice.files);
    const { data, error, isLoading, isSuccess } = useAuthApiQuery();
    const [updatePost, { isLoadingEdit }] = useDeletePageMutation()

    const search = (e) => {
        e.preventDefault();
        const search =  document.querySelector('#search').value;
    }
    const deletePage = async(id) =>{
        await updatePost(id)
    }
    useEffect(()=>{
        // setCategories(data)
    },[data])
    return(
        <div className='features Global-list'>
            <AddCategory show={show}/>
            <h2 className="title-component bold">Gestión de categorias y etiquetas</h2>
            {/* <p className='paragraph mb-1'>.</p> */}
            <div className='content-tab d-flex'>
                <form className='content-tab-search'>
                    <input type="text" className="tab" placeholder="Buscar Categoría" id='search'></input>
                    <button className='btn' type='submit' onClick={(e)=>{search(e)}}><i className="fas fa-search"></i></button>
                </form>
                <div className='d-flex tab-col mr-1'>
                    <div className={`btn c-pointer b-success c-white border-radius d-flex align-center justify-center`}>
                        Nueva Categoría
                    </div>
                </div>
                <div className='d-flex tab-col'>
                    <div className={`tab c-pointer b-danger c-white border-radius ${filesData.filter(file => file.selected).length > 0 ? 'active' : ''}`} onClick={()=>{}}>
                        Eliminar
                    </div>
                </div>
            </div>
            <div className='data-information'>
                {
                    categories?.map((cat,index)=>{
                        return(
                            <div className='miniature d-flex' key={'miniature-'+index}>
                                <div className='select mr-1'>
                                    <div className='btn-select'>
                                    </div>
                                </div>
                                <div className='title'>
                                    <span className='bold'>
                                        {cat?.title}
                                    </span>
                                </div>

                                <span className='autor d-flex f-column align-center justify-center'>
                                    <span className='name bold'>
                                        Action
                                    </span>
                                    <div className='options d-flex'>
                                        <Link className="edit c-success mr-1" to={`/dashboard/gestionPagina/${cat?.uuid}`}>
                                            <i className="fas fa-user-edit c-pointer" aria-hidden="true"></i>
                                        </Link>
                                        <div className="delete c-danger c-pointer" onClick={()=>{deletePage(cat?.uuid)}}>
                                            <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </span>
                                <span className='autor d-flex f-column align-center justify-center'>
                                    <span className='name bold'>
                                        Autor
                                    </span>
                                    <span>
                                        {cat?.autor ? cat?.autor:' '}
                                    </span>
                                </span>
                                <span className='date d-flex f-column align-center justify-center ml-1'>
                                    <span className='name bold'>
                                        Fecha
                                    </span>
                                    {
                                        convertDate(cat?.created_at)
                                    }
                                </span>
                            </div>
                        )
                    })
                }
                
            </div>
           
        </div>
    )
}

function AddCategory({show,...props}){
    const [ValuesDefault, setValuesDefault] = useState({})
    const [BaseValidationSchema, setBaseValidationSchema] = useState(createValidationSchema(baseSchema))
    const checkBook = useRef(null);
    const setModalActive = (e) => {

    }
    const chanceCheckBox = (name,check) => {
        let time =  setTimeout(() => {
            setValuesDefault(prevState => ({
                ...prevState,
                [name]:check.current.checked
            }));
            clearTimeout(time);
        }, 100);
    }
    return(
        <section className={`content-typeof-field ${show ? 'active' : ''}`}>
            <div className={`icon-close mask`} onClick={()=>{setModalActive(false)}}></div>
            <p className='title text-center mb-1 pt-1  bold'>Agregar categoría</p>
            <div className='scroll h-100'>    
            <Formik
                enableReinitialize
                initialValues={ValuesDefault}
                validationSchema={BaseValidationSchema}
                onSubmit={props.onSubmit}
                render={(form) => (
                <form className='form-style ' onSubmit={form?.handleSubmit}>
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
                        <label className='paragraph'>Mostrar categoría</label>
                    </div>
                    <div className='content-input d-flex f-column w-100'>
                        <label className='label'>Nombre de la categoría</label>
                        <input type="text" className="input" placeholder="Nombre de la categoría" name='title' onChange={form?.handleChange} value={form?.values?.title}></input>
                    </div>
                    <div className='content-input d-flex f-column w-100'>
                        <label className='label'>Slug</label>
                        <input type="text" className="input" placeholder="Slug" name='slug' onChange={form?.handleChange} value={form?.values?.slug}></input>
                    </div>
                    <div className='content-input d-flex f-column w-100'>
                        <label className='label'>Descripción</label>
                        <EditorHtml className="mini"></EditorHtml>
                    </div>
                    <div className='content-input d-flex f-column w-100'>
                        <label className='label'>Badge</label>
                        <input type="file" className="input" placeholder="Imagen" name='image' onChange={form?.handleChange} value={form?.values?.image}></input>
                    </div>
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
                )}
            />
            </div>
        </section>
    )
}