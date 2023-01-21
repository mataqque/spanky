import { Component, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer, setInputProps } from "../../helpers/common/forms/Form";
import { useGetPageQuery } from "../../../data/getData";
import { generateId } from "../../helpers/helpers";
import { AddPageSchema } from "../../helpers/common/forms/constraints/ValidatonSchemas";
import { createPage } from "./api";
import { EditorHtml } from "./editor/EditorHtml";
import './gestionProjects.scss'

export default function GestionPage(props){
    const params = useParams()
    const navigate = useNavigate();
    const {data} = useGetPageQuery(params.page)
    const [initialValues,setInitialValues] = useState({
        title:"",
        url:"",
        category:"",
        tag:"",
        visibility:""
    });

    const submitForm = async (values) => {
        values.uuid = data?.uuid ? data?.uuid : generateId()
        // values.datahtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const response = await createPage(values)
        if(response.status === 200){
            alert("Página creada correctamente")
            navigate('/dashboard/gestionPaginas')
        }
    }
    

    const onChangeSelect =(select)=>{
        setInitialValues(prevState => ({
            ...prevState,
            [select.target.name]:select.target.value 
        }));
    }
   
    useEffect(()=>{
        if(data){
            setInitialValues({
                title:data.title,
                url:data.url,
                category:data.category,
                tag:data.tag,
                visibility:data.visibility
            });
        }
    },[data])
    if(typeof data != "undefined"){
        return(
            <div className='features pages'>
                <h2 className="title-component bold">Página</h2>
                <p className='paragraph mb-1'>Administra la página</p>
                <div className='d-flex create-page scroll'>
                    <div className='content-page'>
                        <EditorHtml></EditorHtml>
                        <form className="form-style">
                            <div className='content-input'>
                                <input></input>
                            </div>
                            <div className='content-input'>
                                <input></input>
                            </div>
                            <div className='content-input'>
                                <input></input>
                            </div>
                            <div className='content-input'>
                                <input></input>
                            </div>
                            <div className='content-input'>
                                <input></input>
                            </div>
                            <div className='content-input'>
                                <input></input>
                            </div>
                        </form>
                    </div>
                    <div className='content-form'>
                        <FormContainer
                            initialValues={initialValues}
                            validationSchema={AddPageSchema}
                            onSubmit={submitForm}
                        >
                        {form => {const {handleSubmit, errors, touched, isSubmitting} = form;
                        return( 
                        <form className="form-style" onSubmit={handleSubmit}>
                            
                            <div className="content-input f-column">
                                <label className="form-label ">Título de la página</label>
                                <input {...setInputProps("title", "input-high ligth", form)} defaultValue={initialValues.title} type="text" placeholder="Título" onChange={onChangeSelect}></input>
                            </div>
                            <div className="content-input f-column">
                                <label className="form-label ">Categoría</label>
                                <select className='select' defaultValue={initialValues.visibility} {...setInputProps("visibility", "select", form)} onChange={onChangeSelect}>
                                    <option value="" disabled>Selecionar</option>
                                    <option value='enabled'>Activo</option>
                                    <option value='disabled'>Desactivo</option>
                                </select>
                            </div>
                            <div className="content-input f-column">
                                <label className="form-label ">Etiqueta</label>
                                <select className='select' defaultValue={initialValues.visibility} {...setInputProps("visibility", "select", form)} onChange={onChangeSelect}>
                                    <option value="" disabled>Selecionar</option>
                                    <option value='enabled'>Activo</option>
                                    <option value='disabled'>Desactivo</option>
                                </select>
                            </div>
                            <div className="content-input f-column">
                                <label className="form-label ">Url de la página</label>
                                <input {...setInputProps("url", "input-high ligth", form)} defaultValue={initialValues.url} type="text" placeholder="Url" onChange={onChangeSelect}></input>
                            </div>
                            <div className="content-input f-column">
                                <label className="form-label ">Visibilidad</label>
                                <select className='select' defaultValue={initialValues.visibility} {...setInputProps("visibility", "select", form)} onChange={onChangeSelect}>
                                    <option value="" disabled>Selecionar</option>
                                    <option value='enabled'>Activo</option>
                                    <option value='disabled'>Desactivo</option>
                                </select>
                            </div>
                            <button type="submit" className="btn b-success c-white" >
                                Guardar cambios
                            </button>   
                        </form>
                        
                        )}}
                        </FormContainer>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className=''>
                loading
            </div>
        )
    }
}


