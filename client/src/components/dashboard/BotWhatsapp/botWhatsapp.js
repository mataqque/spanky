import { useEffect, useState } from 'react';
import Image from '../../UI/image/image';
import { initSeccionBot } from './api';
import { io } from "socket.io-client";
import './botWhatsapp.scss';
export default function BotWhatsapp(props){
    const [qrCode, setQrCode] = useState("");
    const socket = io();
    
    socket.on("qrimg", (qrimg) => {
        setQrCode(qrimg)
    });

    socket.on("message", (message) => {
        console.log(message)
    });
    
    const getQrCode =()=>{
        initSeccionBot().then((data)=>{
            console.log(data)
        })
    }

    useEffect(()=>{
        // socket.emit("qrimg", { data: "I'm connected!" });
    },[qrCode])
    return(
        <div className="features">
            <h2 className="title-component bold">Bot de whatsapp</h2>
            <p className='paragraph mb-1'>Configura tu bot de whatsapp</p>
            <div className='d-flex'>
                <div className='d-flex f-column'>
                    <div className='content-img-qr mb-1'>
                        {
                            qrCode ? <img className='img-qr' src={qrCode} ></img> :  <Image src={qrCode} />
                        }
                    </div>
                    <button className='btn btn-primary w-100' onClick={()=>{getQrCode()}}>Obtener QR</button>
                </div>
                <div className='f-column'>
                    <span className=''>
                        Perfil de whatsapp
                    </span>
                    <div className='d-flex f-column'>
                        <span className=''>Número asociado: +51 946008051</span>
                        <span className=''>Nombre: Juan Carlos</span>
                        <span className=''>Estado: Activo</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 