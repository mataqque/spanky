import './GestionProductos.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { DateRangePicker } from "rsuite";
import { ProductSchema, UserSchema } from "../../helpers/common/forms/constraints/ValidatonSchemas";
import { FormContainer, setInputProps } from "../../helpers/common/forms/Form";
import Modal from "../../UI/modal/modal";
import { activeModal} from "../../UI/modal/modalSlice";
import FileManager from "../FileManager/FileManager";
import { onSelect } from "../FileManager/FileManagerSlice";
import { EditorHtml } from '../GestionProjects/editor/EditorHtml';
import { GlobalSortable } from '../Sortables/GlobalSortable';
import ScrollBar from '../UI/Scrollbar/scroll';
import { generateId, generateUrl, onChangeInput } from '../../helpers/helpers';
import ImageLoading from '../../UI/image/image';
import { api } from './api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const frase = 'Selecciona el archivo que quieras insertar'

function ItemSortableName({item}){
    return(
        <span className='name'>
            <i className="fas fa-sort mr-1"></i><span className='text'>{item.file_name}</span>
        </span>
    )
}
export default function GestionProducto(){
    const userData = useSelector((state) => state.usersSlice.userLoggedIn);
    const {id} = useParams();
    const [user,setUser] = useState({username:''});
    const [initialValues,setInitialValues] = useState({
        uuid_product: id || generateId({type:'number'}).toString(),
        uuid_autor: userData.uuid_user,
        name_product:'',
        description:'',
        id_empresa:'',
        id_category:'',
        id_subcategory:'',
        tags:[],
        season:'',
        gender:'',
        colors:[],
        quantity:'',
        price:'',
        discount:'',
        images: [],
        videos: [],
        url:'',
        status:true,
        index_page:true,
        meta_description:'',
        meta_keywords:'',
    });
    const [Image,setImage] = useState('');
    const dispatch = useDispatch();
    const submitForm = (values) => { 
        console.log(values)
        api.addProduct(values).then(res => {
            toast.success('Se actualizo el producto correctamente');
        })
    }
    const show = (item) => {       
        setImage(item);
    }
    const deleteItem = (item) => {
        let newImages = initialValues.images.filter((i) => i.uuid !== item.uuid);
        setInitialValues({...initialValues,images:newImages});
    }
    const onSortEnd = async ({oldIndex, newIndex}) => {
        const newList = arrayMove(initialValues.images, oldIndex, newIndex);
        setInitialValues(prevState => {
            return {
                ...prevState,
                images:newList
            }
        })
    };
    const updateImage = (image) => {
        setInitialValues(prevState => {
            return {
                ...prevState,images:[...prevState.images,image]
            }
        });
    }
    const getHtmlofEditor = (html) => {
        setInitialValues(prevState => {
            return {
                ...prevState,
                description:html
            }
        })
    }
    const selected = (file) => {
        setImage(file.dir+'/'+file.file_name)
    }
    useEffect(()=>{
        let data = id ? api.getProduct(id).then((res) => {
            console.log(res)
            setInitialValues(res);
        }) : null
    },[])
    return(
        <section className='Gestion-productos'>
            {/* arreglar modal */}
            <Modal name={'fileManager'}>
                <FileManager frase={frase} type='modal' onEvent={updateImage}></FileManager>
            </Modal> 
            <div className='features'>
                <FormContainer
                    initialValues={initialValues}
                    validationSchema={ProductSchema}
                    onSubmit={submitForm}
                >
                {form => {const {handleSubmit} = form;
                return( 
                    <form className='d-flex form-style h-100' onSubmit={handleSubmit}>

                        <div className='d-flex f-column w-100 content-filter'>
                            <h2 className="title-component bold mb-1 d-flex">Gestión del Producto{initialValues.uuid_product ? " : "+initialValues.uuid_product : null}</h2>
                            <div className='form-add-product d-flex align-start'>
                                <div className='fields-products form-style d-flex flex-wrap scroll'>
                                    <ScrollBar></ScrollBar>
                                    <h3 className="sub-title-component bold mb-1 d-flex">Detalles</h3>
                                    <div className="content-input f-column w-100">
                                        <label className="form-label ">Nombre del Producto</label>
                                        <input {...setInputProps("name_product", "", form)}
                                        type="text" 
                                        placeholder="Nombre de producto"
                                        defaultValue={initialValues.name_product}
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        ></input>
                                    </div>
                                    <div className="content-input f-column w-100">
                                        <label className="form-label ">Descripción</label>
                                        <EditorHtml className="mini" required getHtml={getHtmlofEditor} initialHtml={initialValues.description}></EditorHtml>
                                    </div>
                                    <div className="content-input f-column w-100">
                                        <label className="form-label ">Empresa</label>
                                        <select className='select' 
                                        defaultValue={"DEFAULT"}
                                        {...setInputProps("id_empresa", "", form)}
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        >
                                            <option value="">Selecionar</option>
                                            <option value="false">SIM.Coorporation</option>
                                        </select>
                                    </div>
                                    <div className="content-input f-column middle">
                                        <label className="form-label ">Categoría</label>
                                        <select className='select' 
                                        defaultValue={initialValues.id_category}
                                        {...setInputProps("id_category", "", form)}
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        >
                                            <option value="">Selecionar</option>
                                            <option value="0">Tacos</option>
                                            <option value="0">Botines</option>
                                            <option value="0">Zapatillas</option>
                                        </select>
                                    </div>
                                    <div className="content-input f-column middle-2">
                                        <label className="form-label " >Sub categoría</label>
                                        <select className='select' 
                                        defaultValue={initialValues.id_subcategory}
                                        {...setInputProps("id_subcategory", "", form)}
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        >
                                            <option value="">Selecionar</option>
                                            <option value="0">Tacos</option>
                                            <option value="0">Botines</option>
                                            <option value="0">Zapatillas</option>
                                        </select>
                                    </div>
                                    <div className="content-input f-column w-100">
                                        <label className="form-label" >Etiquetas</label>
                                        <input {...setInputProps("tags", "", form)}
                                        ></input>
                                    </div>
                                    <h3 className="sub-title-component bold mb-1 mt-1 d-flex w-100">Inventario</h3>
                                    <div className="content-input f-column middle">
                                        <label className="form-label ">Cantidad total de unidades</label>
                                        <input {...setInputProps("quantity", "input-high", form)} 
                                        defaultValue={initialValues.quantity} type="text" placeholder="Cant. productos"
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        ></input>
                                    </div>
                                    <div className="content-input f-column middle-2">
                                        <label className="form-label ">Precio</label>
                                        <input {...setInputProps("price", "input-high", form)}
                                        defaultValue={initialValues.price} 
                                        placeholder="Precio"
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        ></input>
                                    </div>
                                    <div className="content-input f-column middle">
                                        <label className="form-label ">Descuento</label>
                                        <input {...setInputProps("discount", "input-high", form)} 
                                        defaultValue={initialValues.discount}
                                        type="text" placeholder="Descuento"
                                        onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                        ></input>
                                    </div>
                                </div>
                                <div className='content-imgs-product'>
                                    <div className="content-input f-column">
                                        <label className="form-label ">Imagenes del producto</label>
                                        <div className='gestion-links'>
                                            <div className='content-group content-group-1'>
                                                <div className='list sublinks'>
                                                    <div className='visor-img'>
                                                        {
                                                            Image?.file_name ? <ImageLoading  src={generateUrl(Image)} /> : "Visualizador de las imagenes del producto."
                                                        }   
                                                    </div>
                                                    <div className='group-info mb-05 d-flex'>
                                                        <span className='name'>Nombre</span>
                                                        <span className='accions'>Acciones</span>
                                                    </div>
                                                    {
                                                        initialValues.images.length > 0 ? 
                                                        <>
                                                            <GlobalSortable
                                                                items={initialValues.images}
                                                                html={[ItemSortableName]}
                                                                editItem={show}
                                                                deleteItem={deleteItem}
                                                                onSortEnd={onSortEnd}
                                                                helperClass='dragged'
                                                                lockAxis="y"
                                                                useDragHandle
                                                            >
                                                            </GlobalSortable>
                                                        </>
                                                        : null
                                                    }
                                                    <div className='group-info d-flex justify-center align-center c-pointer' onClick={()=>{dispatch(activeModal(true))}}>
                                                        <span className='d-flex align-center'>
                                                            <i className="fas fa-plus mr-1"></i>
                                                            Agregar nueva imagen
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-input f-column form-product-seo">
                            <h3 className="sub-title-component bold mb-1">Seo</h3>
                            <div className='content-input f-column'>
                                <label className="form-label ">url del producto</label>
                                <div className='content-url-seo'>
                                    <input type="text" placeholder="url" {...setInputProps("url", "input-high", form)}
                                    defaultValue={initialValues.url}
                                    onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                    ></input> 
                                    <div className='btn'>
                                        <i className="fas fa-undo-alt"></i>
                                    </div>  
                                </div>
                            </div>
                            <div className='content-input f-column'>
                                <label className="form-label ">Estado</label>
                                <select className='select' defaultValue={initialValues.status} 
                                {...setInputProps("status", "input-high", form)}
                                onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                >
                                    <option value="true" >Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            <div className='content-input f-column'>
                                <label className="form-label ">Indexar de los moteres de busqueda.</label>
                                <select className='select' 
                                defaultValue={initialValues.index_page} 
                                {...setInputProps("index_page", "input-high", form)}
                                onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            <div className='content-input f-column'>
                                <label className="form-label ">Meta description</label>
                                <input type="text" placeholder="description"
                                {...setInputProps("meta_description", "input-high", form)}
                                defaultValue={initialValues.meta_description}
                                onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                ></input>  
                            </div>
                            <div className='content-input f-column'>
                                <label className="form-label ">Meta keyword</label>
                                <input type="text" placeholder="keyword" 
                                {...setInputProps("meta_keywords", "input-high", form)}
                                defaultValue={initialValues.meta_keywords}
                                onChange={(e)=>{onChangeInput(setInitialValues,e)}}
                                ></input>  
                            </div>
                            <label className="form-label "> </label>
                            <button type='submit' className='btn b-success c-white'>Guardar cambios</button>
                        </div>
                    </form>
                )}}
                </FormContainer>
            </div>
        </section>
    )
}