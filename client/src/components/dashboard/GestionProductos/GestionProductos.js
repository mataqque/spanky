import { DateRangePicker } from 'rsuite';
import { useEffect, useState} from "react";
import { UserSchema } from "../../helpers/common/forms/constraints/ValidatonSchemas";
import { FormContainer, setInputProps } from "../../helpers/common/forms/Form";
import './GestionProductos.scss'
import "rsuite/dist/rsuite.min.css";
import { Link } from 'react-router-dom';
import { api } from './api';

export default function GestionProductos(){
    const [user,setUser] = useState({username:''})
    const [AllList,setAllList] = useState([])

    const changed = (value) => {
        console.log(value)
    }

    const submitForm = (values) => {        

    }
    useEffect(()=>{
        api.getAllProducts().then((data)=>{
            setAllList(data)
        })
    },[setAllList])
    return(
        <section className='Gestion-productos'>           
            <div className='features mb-1'>
                <h2 className="title-component bold mb-1">Gestión de Productos</h2>
                <div className='d-flex align-center'>
                    <p className='paragraph mr-1 d-flex '>Administra los items </p>
                    <Link className='btn b-success c-white' to='/dashboard/gestionProductos/createProduct'>Agregar producto</Link>
                </div>
                <div className='container-filters'>
                    <h4 className='sub-title bold mb-1'>Filtro</h4>
                    <FormContainer
                        initialValues={user}
                        validationSchema={UserSchema}
                        onSubmit={submitForm}
                    >
                    {form => {const {handleSubmit} = form;
                    return( 
                        <form className='d-flex f-column'>
                            
                            <div className='filters form-style'>
                                <div className="content-input f-column">
                                    <label className="form-label ">Nombre del Producto</label>
                                    <input {...setInputProps("username", "input-high ligth", form)} defaultValue={user.username} type="text" placeholder="Ingrese su usuario"></input>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Categorias</label>
                                    <select className='select'>
                                        <option selected>Selecionar</option>
                                        <option>Tacos</option>
                                        <option>Botines</option>
                                        <option>Zapatillas</option>
                                    </select>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Estado</label>
                                    <select className='select'>
                                        <option selected>Selecionar</option>
                                        <option>Activo</option>
                                        <option>Inactivo</option>
                                    </select>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Nombre del Producto</label>
                                    <select className='select'>
                                        <option selected>Selecionar</option>
                                        <option>Tacos</option>
                                        <option>Botines</option>
                                        <option>Zapatillas</option>
                                    </select>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Marca</label>
                                    <select className='select'>
                                        <option selected>Selecionar</option>
                                        <option>Tacos</option>
                                        <option>Botines</option>
                                        <option>Zapatillas</option>
                                    </select>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Rango de fecha</label>
                                    <DateRangePicker appearance="default" placeholder="Rango de fecha" onChange={changed}/>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Precio desde</label>
                                    <input {...setInputProps("username", "input-high ligth", form)} defaultValue={user.username} type="text" placeholder="Ingrese su usuario"></input>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label ">Precio hasta</label>
                                    <input {...setInputProps("username", "input-high ligth", form)} defaultValue={user.username} type="text" placeholder="Ingrese su usuario"></input>
                                </div>
                                <div className="content-input f-column">
                                    <label className="form-label "> </label>
                                    <div className='btn b-info c-white'>Aplicar filtro</div>
                                </div>
                            </div>
                            <div className='result-items'>
                                <div className='result-items-header'>
                                    <div className='t-item name'>
                                        Nombre
                                    </div>
                                    <div className='t-item brand'>
                                        Marca
                                    </div>
                                    <div className='t-item cat'>
                                        Categoría
                                    </div>
                                    <div className='t-item stock'>
                                        Stock 
                                    </div>
                                    <div className='t-item cant_total'>
                                        Cantidad Total
                                    </div>
                                    <div className='t-item price'>
                                        Precio
                                    </div>
                                    <div className='t-item status'>
                                        Estado
                                    </div>
                                    <div className='t-item actions'>
                                        Accciones
                                    </div>
                                </div>
                                <div className='grid-result scroll'>
                                    {AllList.map((item,index) => {
                                        return(
                                            <div className='item-result' key={index}>
                                                <div className='t-item name'>
                                                    {item.name_product}
                                                </div>
                                                <div className='t-item brand'>
                                                    {}
                                                </div>
                                                <div className='t-item cat'>
                                                    {item.id_category}
                                                </div>
                                                <div className='t-item stock'>
                                                    {item.quantity - item.quantity_sold}
                                                </div>
                                                <div className='t-item cant_total'>
                                                    {item.quantity}
                                                </div>
                                                <div className='t-item price'>
                                                    {item.price}
                                                </div>
                                                <div className='t-item status'>
                                                    {item.status}
                                                </div>
                                                <div className='t-item actions'>
                                                    <Link to={`/dashboard/gestionProducto/${item.uuid_product}`} className='edit c-success mr-1'>
                                                        <i className="fas fa-user-edit c-pointer"></i>
                                                    </Link>
                                                    <div className='delete c-danger c-pointer'>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </form>
                    )}}
                    </FormContainer>
                </div>
            </div>
        </section>
    )
}
