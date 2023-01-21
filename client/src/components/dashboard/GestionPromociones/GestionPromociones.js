import { useState } from "react";
import './GestionPromociones.scss'

export default function GestionPromociones(){
    const [productos,setProductos] = useState([]);
    
    return(
        <section className='Gestion-promociones'>           
            <div className='features mb-1'>
                <h2 className="title-component bold">Gestión de promociones</h2>
                <p className='paragraph mb-1 d-flex'>Administra las promociones </p>
                <div className='d-flex'>
                    <div className='filters'>
                    </div>
                    <div className='content-items'>
                    </div>
                </div>
            </div>
        </section>
    )
}