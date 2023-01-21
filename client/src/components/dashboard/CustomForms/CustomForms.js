import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { convertDate } from '../../helpers/helpers';
import './CustomForms.scss'
import { deleteForm, getFormBuilderList } from "./api";

export default function CustomForms(){
    const [listForms,setListForms] = useState([]);
    const filesData = useSelector(state => state.fileManagerSlice.files);

    const search = (e) => {
        e.preventDefault();
        const search =  document.querySelector('#search').value;
    }
    const deleteForms = async(id) =>{
        deleteForm(id).then(res=>{
            console.log(res)
            updateData();
        }).catch(err=>{
            console.log(err)
        })
    }
    const updateData = ()=>{
        getFormBuilderList('/Form/getformlist').then(res => {
            setListForms(res);
        })
    }
    useEffect(()=>{
        updateData();
    },[]);
    return(
        <div className='features Global-list'>
            <h2 className="title-component bold">Formularios</h2>
            <p className='paragraph mb-1'>Gestiona y ve las estadísticas de los formularios.</p>
            <div className='content-tab d-flex'>
                <form className='content-tab-search'>
                    <input type="text" className="tab" placeholder="Buscar formulario" id='search'></input>
                    <button className='btn' type='submit' onClick={(e)=>{search(e)}}><i className="fas fa-search"></i></button>
                </form>
                <Link to={'/dashboard/CreateForm'} className='d-flex tab-col'>
                    <div className={`btn c-pointer b-blue c-white border-radius d-flex align-center justify-center`}>
                        Nuevo formulario
                    </div>
                </Link>
                <div className='d-flex tab-col'>
                    <div className={`tab c-pointer b-danger c-white border-radius ${filesData.filter(file => file.selected).length > 0 ? 'active' : ''}`} onClick={()=>{}}>
                        Eliminar
                    </div>
                </div>
            </div>
            <div className='container-list-global'>
                <div className='data-information'>
                    {
                        listForms?.map((formData,index)=>{
                            return(
                                <div className='miniature d-flex' key={'miniature-'+index}>
                                    <div className='select mr-1'>
                                        <div className='btn-select'>
                                        </div>
                                    </div>
                                    <div className='title'>
                                        <span className='bold'>
                                            {formData?.title_form}
                                        </span>
                                    </div>

                                    <span className='autor d-flex f-column align-center justify-center'>
                                        <span className='name bold'>
                                            Action
                                        </span>
                                        <div className='options d-flex'>
                                            <Link className="edit c-success mr-1" to={`/dashboard/formulario/${formData?.uuid_form}`}>
                                                <i className="fas fa-user-edit c-pointer" aria-hidden="true"></i>
                                            </Link>
                                            <div className="delete c-danger c-pointer" onClick={()=>{deleteForms(formData?.uuid_form)}}>
                                                <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </span>
                                    <span className='autor d-flex f-column align-center justify-center'>
                                        <span className='name bold'>
                                            Autor
                                        </span>
                                        <span>
                                            {formData?.autor ? formData?.autor:' '}
                                        </span>
                                    </span>
                                    <span className='date d-flex f-column align-center justify-center ml-1'>
                                        <span className='name bold'>
                                            Fecha
                                        </span>
                                        {
                                            convertDate(formData?.created_at)
                                        }
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='buttons-list-global'>
                    <button className='d-flex align-center btn-left'>
                        <div className='mask icon-signal-left'>
                        </div>
                        Anterior
                    </button>
                    <div className='counter'>
                        <span className='counter-page bold active'>
                            1
                        </span>
                        <span className='counter-page bold'>
                            2
                        </span>
                        <span className='counter-page bold'>
                            3
                        </span>
                    </div>
                    <button className='d-flex align-center btn-right'>
                        Siguiente
                        <div className='mask icon-signal-rigth'>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}