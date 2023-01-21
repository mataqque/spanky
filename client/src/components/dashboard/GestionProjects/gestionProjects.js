import './gestionProjects.scss'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getPagesFromDatabase } from './api';
import { useAuthApiQuery,useDeletePageMutation} from '../../../data/oauthSlice';
import { convertDate } from '../../helpers/helpers';

export default function GestionProjects(){
    const [pages,setPages] = useState([])
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
        setPages(data)
    },[data])
    return(
        <div className='features Global-list'>
            <h2 className="title-component bold">Gestión de los páginas</h2>
            <p className='paragraph mb-1'>Gestiona el contenido de las páginas</p>
            <div className='content-tab d-flex'>
                <form className='content-tab-search'>
                    <input type="text" className="tab" placeholder="Buscar página" id='search'></input>
                    <button className='btn' type='submit' onClick={(e)=>{search(e)}}><i className="fas fa-search"></i></button>
                </form>
                <Link to={'/dashboard/createPage'} className='d-flex tab-col mr-1'>
                    <div className={`btn c-pointer b-success c-white border-radius d-flex align-center justify-center`}>
                        Nueva página
                    </div>
                </Link>
                <div className='d-flex tab-col'>
                    <div className={`tab c-pointer b-danger c-white border-radius ${filesData.filter(file => file.selected).length > 0 ? 'active' : ''}`} onClick={()=>{}}>
                        Eliminar
                    </div>
                </div>
            </div>
            <div className='data-information'>
                {
                    pages?.map((page,index)=>{
                        return(
                            <div className='miniature d-flex' key={'miniature-'+index}>
                                <div className='select mr-1'>
                                    <div className='btn-select'>
                                    </div>
                                </div>
                                <div className='title'>
                                    <span className='bold'>
                                        {page?.title}
                                    </span>
                                </div>

                                <span className='autor d-flex f-column align-center justify-center'>
                                    <span className='name bold'>
                                        Action
                                    </span>
                                    <div className='options d-flex'>
                                        <Link className="edit c-success mr-1" to={`/dashboard/gestionPagina/${page?.uuid}`}>
                                            <i className="fas fa-user-edit c-pointer" aria-hidden="true"></i>
                                        </Link>
                                        <div className="delete c-danger c-pointer" onClick={()=>{deletePage(page?.uuid)}}>
                                            <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </span>
                                <span className='autor d-flex f-column align-center justify-center'>
                                    <span className='name bold'>
                                        Autor
                                    </span>
                                    <span>
                                        {page?.autor ? page?.autor:' '}
                                    </span>
                                </span>
                                <span className='date d-flex f-column align-center justify-center ml-1'>
                                    <span className='name bold'>
                                        Fecha
                                    </span>
                                    {
                                        convertDate(page?.created_at)
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