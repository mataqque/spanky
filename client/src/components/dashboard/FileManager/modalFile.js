import { useRef } from 'react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal,updateFile,selectFile,uploadFiles} from './FileManagerSlice';
import axios,{ CancelToken}  from 'axios';
import { useEffect } from 'react';

export default function ModalUpload(props){
    const dispatch = useDispatch();
    const activeModal = useSelector(state => state.fileManagerSlice.activeModal);
    const [preFiles, setPreviousFiles] = useState([]);

    const updateFiles = (type_file) => {
        axios.get(`/files/getFiles/${type_file}`).then(res => {
            let delay =  setInterval(() => {
                dispatch(updateFile(res.data));
                clearInterval(delay);
            }, 1000);
        });
    }

    const onDrop = (Files) => {
        const newArray = Files.map((file,index) => {
            return {
                uuid:(new Date()).getTime()+index,
                file:file,
                uploaded:false,
                cancel:CancelToken.source(),
            }
        })
        
        setPreviousFiles((preFiles)=>[...dataFiles]);
        const dataFiles = [...preFiles,...newArray];
        
        dataFiles.forEach((file)=>{
            if(file.uploaded == false){
                let formData = new FormData();
                formData.append('archivo', file.file)
                dataFiles.forEach(__file => {
                    if(__file.uuid === file.uuid){
                        __file.uploaded = 'uploading';
                    }
                })
                axios.post('/files/upload/',formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    cancelToken: file.cancel.token,
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        try {
                            let contentLoader = document.querySelector(`#content-loader-${file.uuid}`)
                            let loader = document.querySelector(`#loader-${file.uuid}`)
                            loader.style.width = `${percent}%`;

                            console.log(preFiles)
                            if(percent === 100){
                                contentLoader.classList.add('active');
                                dataFiles.forEach(__file => {
                                    if(__file.uuid === file.uuid){
                                        __file.uploaded = true;
                                    }
                                })
                                // setPreviousFiles((preFiles)=>[...dataFiles]);
                                
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }).then(res => {
                    let delay = setInterval(() => {
                        updateFiles("all");
                        clearInterval(delay)
                    }, 1000);
                } )
            }
           
        })
        
    }
    const closeModal = () => {
        setPreviousFiles([]);
        dispatch(setActiveModal(false))
    }
    if(activeModal == true){
        return(
            <div className={`modal-upload`}>
                <div className='mask icon-close c-pointer' onClick={()=>{closeModal()}}></div>
                <div className='features'>
                    <h3 className='title-component bold text-center'>Sube tus archivos</h3>
                    <span className='sub-title'>JPG,PNG,SVG,PDF,DOCX,GIF. peso esperado menor a 3mb</span>
                    <div className='content-dropzone'>
                        <Dropzone onDrop={onDrop}>
                            {
                                ({getRootProps, getInputProps, isDragActive})=>(
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className={`content-img ${isDragActive ? 'active' : ''}`}>
                                            <div className='icon upload mask'>
                                            </div>
                                            <span className='message'>
                                                <strong> Arrastra tu imagen</ strong>o importalo desde el explorador de archivos
                                            </span>
                                            <div className='explore'>
                                                Explorador de archivos
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Dropzone>
                    </div>
                    {
                        preFiles.length > 0 ? 
                        <div className='content-pre-files'>
                            <div className='d-flex space-between c-pointer mb-1'>
                                <span className=''>{"0 de "+ preFiles.length+" archivos han sido subido"}</span>
                                <div className='bold c-pointer'>
                                    Cancel
                                </div>
                            </div>
                            <div className='items-uploaded scroll'>
                                { 
                                    preFiles.map((file,index) => {
                                        return(
                                            <ItemUploadFile key={index+'-file'} file={file} index={index}/>
                                        )
                                    })
                                }
                            </div> 
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }else{
        return <></>
    }
}

function ItemUploadFile(props){
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'Kb', 'Mb', 'gb', 'Tb'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    const getExtension = (filename) => { 
        return filename?.split('.').pop().toUpperCase();
    }
    const cancelRequest = () => {
        props.file.cancel.cancel();
    }
    return(
        <div className='item' id={'content-loader-'+(props.file.uuid)}>
            <div className='loader-upladed' id={'loader-'+(props.file.uuid)}>
            </div>
            <div className='content-img'>
                <span className='extension-item bold'>{getExtension(props.file.file.name)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403.9 360"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><g id="_341772144" data-name=" 341772144"><path id="_341772624" data-name=" 341772624" d="M24.26,0H275.51a9.47,9.47,0,0,1,5.59,1.71L401.59,89.92h0A5.09,5.09,0,0,1,403.9,94h0V342.24c0,4.89-2.73,9.33-7.12,12.55A29.27,29.27,0,0,1,379.64,360H24.26a29.25,29.25,0,0,1-17.14-5.21C2.73,351.57,0,347.13,0,342.24V17.76C0,12.87,2.73,8.43,7.12,5.21A29.25,29.25,0,0,1,24.26,0Zm248,11.52h-248a10.17,10.17,0,0,0-6,1.84,5.53,5.53,0,0,0-2.51,4.4V342.24a5.53,5.53,0,0,0,2.51,4.4,10.17,10.17,0,0,0,6,1.84H379.64a10.21,10.21,0,0,0,6-1.84,5.53,5.53,0,0,0,2.51-4.4V96.38L272.25,11.52Z"/><path id="_341772600" data-name=" 341772600" d="M395.32,99.73l-119.51-.26V93.73l0,5.76c-4.35,0-7.86-2.59-7.85-5.77a3.87,3.87,0,0,1,0-.48l-.3-87.47h0c0-3.18,3.5-5.76,7.85-5.77a9.43,9.43,0,0,1,5.62,1.72l120.48,88.2h0c3.08,2.25,3.08,5.9,0,8.14a9.64,9.64,0,0,1-6.27,1.67Z"/></g></g></g></svg>
            </div>
            <div className='info-item'>
                <span className='title-item bold'>{props.file.file.name}</span>
                <span className='size-item'>{bytesToSize(props.file.file.size)}</span>
            </div>
            <div className='options'>
                <div className='content-icon-cancel' onClick={()=>{cancelRequest()}}>
                    <div className='mask icon-cancel c-pointer'>
                    </div>
                </div>
                <div className='content-icon-success'>
                    <div className='mask icon-check c-pointer'>
                        <div className="wrapper">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}