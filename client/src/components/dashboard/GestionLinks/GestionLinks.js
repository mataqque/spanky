import axios from 'axios'
import { useEffect, useRef } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {SortableContainer, SortableElement, arrayMove,sortableHandle} from 'react-sortable-hoc';
import { toast } from 'react-toastify';
import Modal from '../../UI/modal/modal';
import FileManager from '../FileManager/FileManager';
import ModalUpload from '../FileManager/modalFile';
import { activeModal } from '../../UI/modal/modalSlice';
import './gestionlinks.scss'
import { useDispatch } from 'react-redux';
import { generateId } from '../../helpers/helpers';

const DragHandle = sortableHandle((e) => <span className='draggable'><i className="fas fa-sort mr-1"></i><span className='text'>{e.value}</span></span>);
const SortableItem = SortableElement(({value,edit,deleteItem}) => 
    <li>
        <DragHandle value={value.name}></DragHandle>
        <div className='d-flex'>
            <div className='icon edit mr-1 c-pointer' onClick={()=>{edit(value)}}>
                <i className="fas fa-edit"></i>
            </div>
            <div className='icon delete c-pointer' onClick={()=>{deleteItem(value)}}>
                <i className="fas fa-trash"></i>
            </div>
        </div>
    </li>);
const SortableList = SortableContainer(({items,edit,deleteItem}) => {
    return (
      <ul className='content-sortable scroll'>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} edit={edit} deleteItem={deleteItem}/>
        ))}
      </ul>
    );
  });

export default function GestionLinks(props){
    const dispatch = useDispatch();
    const inputName = useRef(null);
    const inputUrl = useRef(null);
    const inputIcon = useRef(null);
    const inputClass = useRef(null);

    const [Links, setLinks ] = useState([])
    const [LinkEdit,setLinkEdit] = useState();
    const [subLinkEdit,setSubLinkEdit] = useState();
    const [btnActiveSave,setBtnActiveSave] = useState(false);

    const frase = 'Selecciona el archivo que quieras insertar'
    
    const sendData =()=>{
        axios.post("/list/updateLinks",Links).then(res=>{
            console.log(res.data)
        })
    }
    const addGroup =()=>{
        setLinks([...Links,{
            uuid_link: generateId(),
            name:'Nuevo Grupo',
            links:[],
        }])
        toast.success("Se agregó un nuevo grupo", {
            position: "bottom-left",
        });
    }
    const addLinkChild =(item)=>{
        setSubLinkEdit(null)
        setBtnActiveSave(true)
        Links.forEach((element,index) => {
            if(element.uuid_link == item.uuid_link){
                element.links.push({
                    order_id:element.links.length+1,
                    uuid:generateId(),
                    name:`nuevo link ${Links[index].links.length+1}`,
                    url:'',
                    icon:'',
                    type:item.name,
                    uuid_father:item.uuid_link
                })
            }
        });
        let newData = Links
        setLinks([...newData])
        toast.success("Se agregó un nuevo link", {
            position: "bottom-left",
        });
    } 
    
    const editLinkChild =(item)=>{
        setBtnActiveSave(false)
        setSubLinkEdit(item)
    }
    const changeLinkChild =(item)=>{
        subLinkEdit.name = inputName.current.value;
        subLinkEdit.url = inputUrl.current.value;
        subLinkEdit.class_css = inputClass.current.value;
        subLinkEdit.icon = inputClass.current.value;

        let newDataChild = JSON.parse(JSON.stringify(subLinkEdit));
        
        Links.forEach((element,index) => {
            if(element.uuid_link == subLinkEdit.uuid_father){
                element.links.forEach((itemChild,index2) => {
                    if(itemChild.uuid == subLinkEdit.uuid){
                        console.log(itemChild)
                        itemChild.name = newDataChild.name;
                    }
                })
            }
        });
        let newDataAllLinks = Links

        setLinks([...newDataAllLinks])
        setSubLinkEdit(newDataChild)
        
    }
    const deleteLinkChild =(item)=>{ 
        setBtnActiveSave(true)

        const Delete = new Promise((resolve, reject) => {
            Links.forEach((element,index) => {
                if(element.uuid_link == item.uuid_father){
                    element.links.forEach((itemChild,index2) => {
                        if(itemChild.uuid == item.uuid){
                            console.log(itemChild)
                            element.links = element.links.filter(child => item.uuid !== child.uuid)
                        }
                    })
                }
            })
            resolve(Links);
        })
        Promise.all([Delete]).then((values)=>{
            setLinks([...values[0]]);
            setSubLinkEdit(null)
        }).catch(reason => {
            console.log(reason)
        });
    }
    
    const deleteGroup =(e)=>{
        axios.get('/list/deleteGroup/'+e.uuid_link).then(res=>{
            setLinks([...Links.filter(item=>item.uuid_link!==e.uuid_link)]);
            setLinkEdit(null)
            toast.error("Se eliminó el grupo de links", {
                position: "bottom-left",
            });
        })
    }
    const editGroup = (link)=>{
        setBtnActiveSave(true)
        setLinkEdit(link)
    }
    const onSortEnd = async ({oldIndex, newIndex}) => {
        const reOrder = new Promise((resolve, reject) => {
            Links.forEach((element,index) => {
                if(element.uuid_link == LinkEdit.uuid_link){
                    element.links = arrayMove(element.links, oldIndex, newIndex);
                    for(let i=0;i<element.links.length;i++){
                        element.links[i].order_id = i+1
                    } 
                }
            })
            resolve(Links);
        });

        Promise.all([reOrder]).then((values)=>{
            console.log(values)
            setLinks([...values[0]]);
        }).catch(reason => {
            console.log(reason)
        });
    };

    const sendDataChild =()=>{
        axios.post("/list/updateLinksChild",subLinkEdit).then(res=>{
            toast.success("Cambios guardados", {
                position: "bottom-left",
            });
        })
    }
    useEffect(()=>{
        axios.get("/list/getAllLinks").then(res=>{
            setLinks([...res.data])
        })
    },[]);

    const changeName = (e)=>{
        Links.forEach((element,index) => {
            if(element.uuid_link == LinkEdit.uuid_link){
                element.name = e.target.value;
            }
        })
        let newData = Links
        setLinks([...newData])
    }
    return(
        <section className='gestion-links'>
            <Modal name={'fileManager'}>
                <FileManager frase={frase} modal='modal'></FileManager>
            </Modal>
           
            <div className='features mb-1'>
                <h2 className="title-component bold">Gestión Links</h2>
                <p className='paragraph mb-1 d-flex'>Gestiona los links en grupos al crear los grupos recuerda que deben ser de una lista en común, ejemplos lista del links del footer, lista de redes sociales,etc.</p>
                <div className='d-flex mb-1'>
                    <div className='add-item btn b-success c-white mr-1' onClick={()=>{addGroup()}}>
                        Crear Grupo de links
                    </div>
                </div>
                <div className='content-data d-flex'>
                    <div className='content-group scroll'>
                        <div className='list'>
                            <ul className='content-sortable'>
                                {Links.map((item,index)=>{
                                    return(
                                        <li key={'list-'+index}>
                                            <span className='draggable'>
                                                {item.name}
                                            </span>
                                            <div className='d-flex'>
                                                <div className='icon edit mr-1 c-pointer' onClick={()=>{editGroup(item)}}>
                                                    <i className="fas fa-edit"></i>
                                                </div>
                                                <div className='icon delete c-pointer' onClick={()=>{deleteGroup(item)}}>
                                                    <i className="fas fa-trash"></i>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='content-group '>
                        <div className='list sublinks'>
                            {
                                LinkEdit!= null ?
                                <>
                                    <div className='group-info'>
                                        <span className='mr-1 title-group'>Nombre del grupo</span>
                                        <input type='text' className='input-group' placeholder='nombre del grupo' value={LinkEdit.name} onChange={changeName}/>
                                    </div>
                                    <div className='group-info d-flex justify-center align-center c-pointer' onClick={()=>{addLinkChild(LinkEdit)}}>
                                        <span className='d-flex align-center'>
                                            <i className="fas fa-plus mr-1"></i>
                                            Agregar nuevo Link
                                        </span>
                                    </div>
                                    <SortableList items={LinkEdit.links} edit={editLinkChild} deleteItem={deleteLinkChild} onSortEnd={onSortEnd} helperClass='dragged' lockAxis="y" useDragHandle/>
                                </>
                                : null
                            }
                        </div>
                        <div className={`btn sublinks b-success c-white ${btnActiveSave ==false ? '':'active'}`} onClick={()=>{sendData()}}>
                            Guardar cambios
                        </div>
                    </div>
                    <div className='content-group scroll'>
                        {
                            subLinkEdit!= null ? 
                            <>
                                <div className='content-form-group b-white' onChange={changeLinkChild}>
                                    <div className='content-input'>
                                        <span className='name'>Nombre</span>
                                        <input type='text' placeholder='Nombre del link' value={subLinkEdit?.name} ref={inputName}/>
                                    </div>
                                    <div className='content-input'>
                                        <span className='url'>Url</span>
                                        <input type='text' placeholder='Url' value={subLinkEdit?.url} ref={inputUrl}/>
                                    </div>
                                    <div className='content-input'>
                                        <span className='class'>Clase css</span>
                                        <input type='text' placeholder='Clase css' value={subLinkEdit?.class} ref={inputClass}/>
                                    </div>
                                    <div className='content-input'>
                                        <span className='name'>Icon</span>
                                        <input className='mb-1' type='text' placeholder='ingresar icono' value={subLinkEdit?.icon} ref={inputIcon}/>
                                        <div className='btn b-info c-white d-flex align-center' onClick={()=>{dispatch(activeModal(true))}}>
                                            <i className="fas fa-search mr-1"></i>
                                            Seleccionar desde la galeria
                                        </div>
                                    </div>
                                </div>
                                <div className='btn b-success c-white' onClick={()=>{sendDataChild()}}>
                                    Guardar cambios
                                </div> 
                            </> : null
                        }
                    </div>
                </div>
            </div>

        </section>
    )    
}


function ListLink(props){
    return(
        <>
            <div className='item'>
                {props.index}
            </div>
            <div className='item'>
                {props.link.name}
            </div>
            <div className='item'>
                {props.link.url ? props.link.url : '-'}
            </div>
            <div className='item'>
                {props.link.icon ? props.link.icon : '-'}
            </div>
            <div className='item'>
                {props.link.type ? props.link.type : '-'}
            </div>
            <div className='item d-flex align-center '>
                <Link to={"/"} className='edit c-success mr-1'>
                    <i className="fas fa-user-edit c-pointer"></i>
                </Link>
                <div className='delete c-danger c-pointer'>
                    <i className="fas fa-trash-alt"></i>
                </div>
            </div>
    </>       
    )
}