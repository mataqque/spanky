import React, { Component } from 'react'
import './modal.scss'
import OwlCarousel from "react-owl-carousel2"
import { connect } from 'react-redux'
const signal_left =  require("../../../assets/images/inicio/icons/signal-left.svg").default
const signal_right =  require("../../../assets/images/inicio/icons/signal-right.svg").default

class ModalMap extends Component {
    constructor(props){
        super(props)
        this.onDragged = this.onDragged.bind(this);
        this.state = {
            events:{onDragged:()=>{},onChanged:this.onDragged},
            toggle:false,
            options:{
                items:1,
                rewind: true,
                loop:true,
                nav:true,
                center:false,
                autoWidth:true,
                speed:1000,
                smartSpeed:300,
                dots:true,
                navText: [
                    `<img src=${signal_left}></img>`,
                    `<img src=${signal_right}></img>`
                ]
            },
            slider:[
                {img:require("../../../assets/images/iconos/aeropuerto.jpg").default,title:"Ampliación del Aeropuerto Internacional Jorge Chávez",place:'Lima, Perú',by:require("../../../assets/images/cosapi-only.png").default},
                {img:require("../../../assets/images/departamentos/render-eqipe.jpg").default,title:"Proyecto multifamiliar Épiqe",place:'Lima, Perú',by:require("../../../assets/images/departamentos/COSAPI.png").default},
                {img:require("../../../assets/images/departamentos/render-muvin.png").default,title:"Proyecto multifamiliar Muvin",place:'Lima, Perú',by:require("../../../assets/images/departamentos/COSAPI.png").default},
                {img:require("../../../assets/images/departamentos/render-estadio.png").default,title:"Estadio Nacional",place:'Lima, Perú',by:require("../../../assets/images/cosapi-only.png").default},
                {img:require("../../../assets/images/departamentos/banco-de-la-nacion.png").default,title:"Banco de la Nación",place:'Lima, Perú',by:require("../../../assets/images/cosapi-only.png").default},
                {img:require("../../../assets/images/iconos/Prana.png").default,title:"Proyecto multifamiliar Prana",place:'Lima, Perú',by:require("../../../assets/images/iconos/cosapi-inmobiliaria.png").default},
                {img:require("../../../assets/images/iconos/Velia.png").default,title:"Proyecto multifamiliar Velia",place:'Lima, Perú',by:require("../../../assets/images/iconos/cosapi-inmobiliaria.png").default},
            ],
        }
    }
    onDragged(e){
        console.log(e.page.index)
        if(e.page.index >= 0){
            document.querySelector('#title-project').textContent = this.state.slider[e.page.index].title
            document.querySelector('#img-project').textContent = this.state.slider[e.page.index].title
            document.querySelector('#img-project').src = this.state.slider[e.page.index].by
        }
    }
    toggle=(e)=>{
        console.log(e.target.dataset.type)
        if(e.target.dataset.type == 'modal'){
            document.querySelector('.modal-map').classList.remove('active')
        }
    }
    render() {
        return (
            <div className={`modal-map ${this.state.toggle ? 'active' : ''}`} onClick={(e)=>{this.toggle(e)}} data-type='modal'>
                <div className='content-modal-map'>
                    <div className='content-title-map'>
                        <span className='bold-alt c-primary' id='title-project'>Proyecto multifamiliar Muvin</span>
                        <span className='sub-title-map c-primary'>Lima, Perú</span>
                    </div>
                    <div className='content-slide'>
                        <OwlCarousel options={this.state.options} events={this.state.events} className="owl-carousel MyCarouselHorizontal" >
                            {
                                this.state.slider.map((item,index)=>{
                                    return(
                                        <div className='content-picture' key={'slider'+index}>
                                            <picture className="content-img">
                                                <source media="(min-width: 500px)" srcSet={item.img}></source>
                                                <img src={item.img}></img>
                                            </picture>
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                    </div>
                    <div className='content-brands'>
                        <span className='by-brand'>Desarrollado por:</span>
                        <img className='' id='img-project' src={this.state.slider[0].by} ></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null)(ModalMap)