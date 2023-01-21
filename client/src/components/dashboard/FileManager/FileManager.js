import { useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import axios,{ CancelToken} from 'axios';
import ModalUpload from './modalFile';
import { setActiveModal,updateFile,selectFile, onSelect} from './FileManagerSlice';
import { activeModal } from '../../UI/modal/modalSlice';
import { convertToDate, verifyExtension } from '../../../data/helpers/helpers';
import { copyToClipboard, generatePath } from '../../helpers/helpers';
import ScrollBar from '../UI/Scrollbar/scroll';

export default function FileManager(props){
    const dispatch = useDispatch();
    const filesData = useSelector(state => state.fileManagerSlice.files);
    const selectFile = useSelector(state => state.fileManagerSlice.selectFile);
    const [activeTab, setActiveTab] = useState('all');
   

    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'Kb', 'Mb', 'gb', 'Tb'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    const updateFiles = (type_file) => {
        console.log('file:',type_file);
        axios.get(`/files/getFiles/${type_file}`).then(res => {
            dispatch(updateFile(res.data));
        });
    }
    const deleteFile = (uuid) => {
        const filesSelected = filesData.filter(file => file.selected); 
        axios.post(`/files/delete`,filesSelected).then(res => {
            toast.error("Se eliminó el archivo", {
                position: "bottom-left",
              });
            updateFiles(activeTab);
        });
    }
    const returnFile =()=>{
        props.onEvent(selectFile);
    }
    const generateHtmlImage =()=>{
        let html = `https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png`
        props.onEvent(html)
    }
    const getExtension = (filename) => { 
        return filename?.split('.').pop().toUpperCase();
    }
   
    useEffect(() => { 
        updateFiles('all');
        if(props.onEvent){
            dispatch(onSelect(props.onEvent))
        }
    }, []);
    return (
    <div className="features">
        <h2 className="title-component bold">Administrador de archivos</h2>
        <p className='paragraph mb-1'>{props?.frase}</p>
        <div className='content-tab d-flex'>
            <Filters />
            
            {
                props.type == 'modal' ? 
                <div className='d-flex tab-col' onClick={()=>{
                    returnFile();
                    dispatch(activeModal(false))}}>
                    <div className={`tab c-pointer b-info c-white border-radius mr-1 ${filesData.filter(file => file.selected).length > 0 ? 'active' : ''}`}>
                        Insertar
                    </div>
                </div>
                : null 
            }
            <div className='d-flex tab-col' onClick={()=>{dispatch(setActiveModal(true))}}>
                <div className='tab c-pointer b-success c-white border-radius mr-1'>
                    Subir un archivo
                </div>
            </div>
            {/* <div className='d-flex tab-col' onClick={()=>{generateHtmlImage()}}>
                <div className='tab c-pointer b-success c-white border-radius'>
                    Prove Modal
                </div>
            </div> */}
            <div className='d-flex tab-col'>
                <div className={`tab c-pointer b-danger c-white border-radius ${filesData.filter(file => file.selected).length > 0 ? 'active' : ''}`} onClick={()=>{deleteFile()}}>
                    Eliminar
                </div>
            </div>
            
        </div>
        <div className='content-gallery'>
            <div className='content-all-images scroll'>
                <ScrollBar/>
                {
                    filesData.map((file,index) => {
                        return(
                            <File file={file} key={'file'+index} type={props.type}/>
                        )
                    })
                }
            </div>
            <div className='info'>
                <h3 className='title-component bold'>Información de archivo</h3>
                {
                    [filesData.filter(file => file.selected)[0]].map((file,index) => {
                        if(file && filesData.filter(file => file.selected).length < 2){
                        return(
                            <div className='content-info' key={'info-item'+index}>
                                <div className='content-img skeleton-default'>
                                    
                                    {/* {
                                        file.collection_name == 'image' ? 
                                        <Imagen file={file}></Imagen>: null
                                    }
                                    {
                                        file.collection_name == 'video' ?  
                                            <video controls>
                                                <source src={file.dir+"/"+file.file_name} type="video/mp4"></source>
                                            </video> :  null
                                    } */}
                                </div>
                                <span className='name-file bold'>Información</span>
                                <div className='content-array-info scrollHidden'>
                                    <ScrollBar/>
                                    <div className='item-info'>
                                        <span className='name-info'>Título</span>
                                        <div className='text-info'>
                                            <span className=''>{file.file_name}</span>
                                        </div>
                                    </div>
                                    <div className='item-info'>
                                        <span className='name-info'>Tamaño</span>
                                        <span className='text-info'>{bytesToSize(file.size)}</span>
                                    </div>
                                    <div className='item-info'>
                                        <span className='name-info'>Formato</span>
                                        <span className='text-info'>{file.mime_type}</span>
                                    </div>
                                    <div className='item-info'>
                                        <span className='name-info'>Actualizado</span>
                                        <span className='text-info'>{convertToDate(file.updated_at)}</span>
                                    </div>
                                    <div className='item-info'>
                                        <span className='name-info'>Dimensiones</span>
                                        <span className='text-info'>1500*500</span>
                                    </div>
                                    <div className='item-info'>
                                        <span className='name-info'>Url Original</span>
                                        <span className='text-info' onClick={()=>{copyToClipboard(generatePath(file.dir,file.file_name))}}>{generatePath(file.dir,file.file_name)}</span>
                                    </div>
                                    {
                                        file.compress ? 
                                        <div className='item-info'>
                                            <span className='name-info'>Url Compress</span>
                                            <span className='text-info'onClick={()=>{copyToClipboard(generatePath(file.dir,file.compress))}}>{generatePath(file.dir,file.compress)}</span>
                                        </div> : null
                                    }
                                </div>
                            </div>
                        )
                        }else{
                            return (
                                <span className='message-info' key={'message-info'}>Elija solo una imagen o archivo para editar o ver su información</span>
                            )
                        }
                    })
                }
                
            </div>
        </div>
    </div>
  )
}
function Filters(props){
    const [activeTab, setActiveTab] = useState('all');
    const dispatch = useDispatch();

    const updateFiles = (type_file) => {
        axios.get(`/files/getFiles/${type_file}`).then(res => {
            dispatch(updateFile(res.data));
        });
    }
    const search = (e) => {
        e.preventDefault();
        const search =  document.querySelector('#search').value;
        
        axios.post(`/files/search`,{search:search}).then(res => {
            dispatch(updateFile(res.data));
            setActiveTab('');
        }).catch(err => {
            console.log(err);
        });
    }
    return(
        <div className='settings d-flex'>
            <div className='icon'>
                <i className="fas fa-sliders-h"></i>
            </div>
            <div className='content-settings'>
                <form className='content-tab-search'>
                    <input type="text" className="tab" placeholder="Buscar archivo" id='search' name='search'></input>
                    <button className='btn' type='submit' onClick={(e)=>{search(e)}}><img className='search' src={require('../../../assets/icons/search.svg').default} ></img></button>
                </form>
                <div className='d-flex tab-col filter-files'>
                    <div className={`tab c-pointer ${activeTab == 'all'? 'active':''}`} onClick={()=>{updateFiles('all');setActiveTab('all')}}>
                        Ver todos
                    </div>
                    <div className={`tab c-pointer ${activeTab == 'image'? 'active':''}`} onClick={()=>{updateFiles('image');setActiveTab('image')}}>
                        Imágenes
                    </div>
                    <div className={`tab c-pointer ${activeTab == 'video'? 'active':''}`} onClick={()=>{updateFiles('video');setActiveTab('video')}}>
                        Videos
                    </div>
                    <div className={`tab c-pointer ${activeTab == 'documento'? 'active':''}`} onClick={()=>{updateFiles('documento');setActiveTab('documento')}}>
                        Documentos
                    </div>
                </div>
            </div>
        </div>
    )
}

function File(props){
    const {file} = props;
    const Element = useRef(null);
    const [loadImage, setLoadImage] = useState(false);
    const dispatch = useDispatch();

    const getExtension = (filename) => { 
        return filename?.split('.').pop().toUpperCase();
    }
    const routeFile = file.dir+"/"+verifyExtension(file);
    const event = (e) => {
        if(e[0].isIntersecting == true){
            const imageToLoad = new Image();
            imageToLoad.src = routeFile;
            imageToLoad.onload = (e) => {
                setLoadImage(true);
            }
        }
    }
    useEffect(() => {
        const options = {
            root: document.querySelector(".content-all-images"),
            rootMargin: '28%',
            threshold: 1.0
        }
        const observer = new IntersectionObserver(event,options);
        observer.observe(Element.current);
    });

    return(
        <div className='content-file' onClick={()=>{dispatch(selectFile({type:props.type,file:file}))}} ref={Element}>
            <div className={`file ${file?.selected ? 'active':''}`}>
                {
                    file.collection_name == 'image' ? 
                    <div className='content-img'>
                        {
                            loadImage == false ? <Skeleton/> : <img className='img' src={routeFile} ></img>
                        }
                    </div> : null
                }
                {
                    file.collection_name == 'documento' || file.collection_name == 'video' ? 
                        <div className="content-img gradient">
                            <div className='doc'>
                                <span className="extension-item bold">{getExtension(file.file_name)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403.9 360"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><g id="_341772144" data-name=" 341772144"><path id="_341772624" data-name=" 341772624" d="M24.26,0H275.51a9.47,9.47,0,0,1,5.59,1.71L401.59,89.92h0A5.09,5.09,0,0,1,403.9,94h0V342.24c0,4.89-2.73,9.33-7.12,12.55A29.27,29.27,0,0,1,379.64,360H24.26a29.25,29.25,0,0,1-17.14-5.21C2.73,351.57,0,347.13,0,342.24V17.76C0,12.87,2.73,8.43,7.12,5.21A29.25,29.25,0,0,1,24.26,0Zm248,11.52h-248a10.17,10.17,0,0,0-6,1.84,5.53,5.53,0,0,0-2.51,4.4V342.24a5.53,5.53,0,0,0,2.51,4.4,10.17,10.17,0,0,0,6,1.84H379.64a10.21,10.21,0,0,0,6-1.84,5.53,5.53,0,0,0,2.51-4.4V96.38L272.25,11.52Z"></path><path id="_341772600" data-name=" 341772600" d="M395.32,99.73l-119.51-.26V93.73l0,5.76c-4.35,0-7.86-2.59-7.85-5.77a3.87,3.87,0,0,1,0-.48l-.3-87.47h0c0-3.18,3.5-5.76,7.85-5.77a9.43,9.43,0,0,1,5.62,1.72l120.48,88.2h0c3.08,2.25,3.08,5.9,0,8.14a9.64,9.64,0,0,1-6.27,1.67Z"></path></g></g></g></svg>
                            </div>
                        </div> : null
                }
                <span className='title-file'>{file.file_name}</span>
            </div>
        </div>
    )
}