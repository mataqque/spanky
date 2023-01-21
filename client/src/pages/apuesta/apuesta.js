import { useState } from 'react'
import './apuesta.scss'

export default function Apuesta(){
    const [result, setApuesta] = useState(0)
    const [cuota1margen,setCuota1margen] = useState(0)
    const [cuota2margen,setCuota2margen] = useState(0)
    const [cuota3margen,setCuota3margen] = useState(0)
    const [cuota4margen,setCuota4margen] = useState(0)
    const [cuota5margen,setCuota5margen] = useState(0)

    const updateData = (data) => {
        let saldo = parseFloat(document.querySelector("#saldo").value)
        let cuota1 = parseFloat(document.querySelector("#cuota1").value)
        let cuota2 = parseFloat(document.querySelector("#cuota2").value)
        let cuota3 = parseFloat(document.querySelector("#cuota3").value)
        let cuota4 = parseFloat(document.querySelector("#cuota4").value)
        let cuota5 = parseFloat(document.querySelector("#cuota5").value)

        setCuota1margen(saldo/cuota1)
        setCuota2margen(saldo/cuota2)
        setCuota3margen(saldo/cuota3)
        setCuota4margen(saldo/cuota4)
        setCuota5margen(saldo/cuota5)
        let total = (saldo/cuota1)+(saldo/cuota2)+(saldo/cuota3)+(saldo/cuota4)+(saldo/cuota5)
        setApuesta(total)
    }
    return(
        <main className='apuesta'>
            <div className='form-style' onChange={updateData}>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Saldo</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='saldo' type="text" className="form-control" placeholder="Saldo" ></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Cuota 1</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='cuota1' type="text" className="form-control" placeholder="Ingresa tu cuota" ></input>
                        <input id='cuota1margen' type="text" className="form-control" placeholder="Ingresa tu cuota" value={cuota1margen}></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Cuota 2</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='cuota2' type="text" className="form-control" placeholder="Ingresa tu cuota"  ></input>
                        <input id='cuota2margen' type="text" className="form-control" placeholder="Ingresa tu cuota" value={cuota2margen}></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Cuota 3</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='cuota3' type="text" className="form-control" placeholder="Ingresa tu cuota"  ></input>
                        <input id='cuota3margen' type="text" className="form-control" placeholder="Ingresa tu cuota" value={cuota3margen}></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Cuota 4</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='cuota4' type="text" className="form-control" placeholder="Ingresa tu cuota"  ></input>
                        <input id='cuota4margen' type="text" className="form-control" placeholder="Ingresa tu cuota" value={cuota4margen}></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Cuota 5</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='cuota5' type="text" className="form-control" placeholder="Ingresa tu cuota"  ></input>
                        <input id='cuota5margen' type="text" className="form-control" placeholder="Ingresa tu cuota" value={cuota5margen}></input>
                    </div>
                </div>
                <div className="content-input f-column">
                    <div className="d-flex space-between">
                        <label className="form-label">Resultado</label>
                    </div>
                    <div className="input-group d-flex input-high">
                        <input id='result' type="text" className="form-control" placeholder="Ingresa tu cuota"   value={result}></input>
                    </div>
                </div>
            </div>
        </main>
    )
}