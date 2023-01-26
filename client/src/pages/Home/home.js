import ScrollReveal from 'scrollreveal'
import { useEffect } from 'react'
import { useState } from 'react';
import { animation } from '../../components/UI/utilities/utilities'
import { Parallax } from 'react-parallax';
import OwlCarousel from "react-owl-carousel2"
import './home.scss'
import ImageLoading from '../../components/UI/image/image';
import axios from 'axios';
import { useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { api, dataFormBuilder } from './api';
import FormBuilder from '../../components/FormBuilder/FormBuilder';
import { generatePath } from '../../components/helpers/helpers';
import { convertToDate } from '../../data/helpers/helpers';
import { Link } from 'react-router-dom';
const sr = ScrollReveal()

export default function Home(){
    const [data,setData] = useState([]);
    const onDragged = (index) => {
        console.log(index)
    }
    const events = {
        onDragged:onDragged,
        onChanged:function(item){}
    }
    const options = {
        rewind: true,
        loop:false,
        nav:false,
        center:false,
        speed:1000,
        smartSpeed:300,
        dots:false,
        items:3,
        margin:20,
    };

    const elementRef = useRef();
    
    useEffect(()=>{
        
        let time = setInterval(() => {
            sr.reveal(".animate",{opacity:1,beforeReveal: function (el) {
                el.classList.add("active")
            } })
            clearInterval(time)
        }, 200);
        api.getProducts().then(res=>{
            console.log(res)
            setData(res)
        })
        // setData(fakeUsers);
    
    },[])
    const transformBase = (value,classes,reg,space) => {
        return animation(value,classes,reg,space)
    }
    const addUser = async() => {
        var _learnq = window._learnq || [];
        _learnq.push(['identify', {
            '$email': 'mataqque.100@gmail.com',
            '$first_name': 'Flavio',
            '$last_name': 'Mataqque' 
        }]);
    }
    return(
        <main className='home main'>
            <Header></Header> 
            <section className='tutorial container'>
                <h2 className='c-white bold d-flex text-center' dangerouslySetInnerHTML={{__html:transformBase("Como entrar a la Deepweb?","bold"," ")}}>
                </h2>
                <div className='content-inf'>
                    <div className='content-img'>
                        <img className='' src={require('../../assets/images/pages/home/join-deep-web.jpg')} ></img>
                    </div>
                    <div className='inf'>
                        <p className='paragraph c-white'>
                            Para empezar a navegar por la Deepweb debes descargar TOR-PROJECT e instalarlo en tu equipo, lo siguiente será encontrar los links, aqui te dejo algunos
                        </p>
                        <p className='paragraph c-white'>
                            Tor Browser evita que alguien que esté viendo tu conexión sepa qué sitios web visitas. Todo lo que cualquier persona que controle tus hábitos de navegación puede ver es que estás usando Tor.
                        </p>
                    </div>
                </div>
            </section>
            <Parallax blur={0} strength={300} bgImage={require("../../assets/images/pages/home/space-galaxy-background.jpg")} bgImageAlt="the cat" >
                <span className='text-parallax bold'>Ten cuiado, entrar es peligroso!</span>
            </Parallax>
            <div className='content-section'>
                <div className='content-background'>
                    <img className='' src={require('../../assets/images/pages/home/background-deep.jpg')} ></img>
                </div>
                <section className='post section container'>
                    <h2 className='c-white bold'>Nuestras últimas publicaciones</h2>
                    <div className='d-flex'>
                        <div className='sections-post'>
                            <div className='section-post'>
                                <h3 className='c-white'>POST OVNIS</h3>
                                <div className='content-post'>
                                {
                                    data.length > 0 ?
                                    <OwlCarousel options={options} events={events} >
                                    {
                                        data.map((card,index)=>{
                                            return(
                                                <div className='card' key={'card-'+index}>
                                                    <div className='avatar'>
                                                        <div className='content-img-avatar'>
                                                            <img className='' src={card.avatar ? card.avatar : require("../../assets/icons/avatar.png")} ></img>
                                                        </div>
                                                        <div className='inf d-flex f-column'>
                                                            <span className='name c-white'>{JSON.parse(card.autor).first_name +" "+JSON.parse(card.autor).last_name}</span>
                                                            <span className='date'>{convertToDate(card.created_at)}</span>
                                                        </div>
                                                    </div>
                                                    <div className='content-img'>
                                                        <ImageLoading src={generatePath(card.images[0].dir,card.images[0].compress)}/>
                                                    </div>
                                                    <div className='content-text'>
                                                        <span className='title c-white'>{card.name_product}</span>
                                                        <Link to={"/"} className='more'>
                                                            <span className='icon-more mask'></span>
                                                        </Link>
                                                    </div>
                                                    {/* <p className='paragraph c-white' dangerouslySetInnerHTML={{__html:card.description}}>
                                                    </p> */}
                                                </div>
                                            )
                                        })
                                    }
                                    </OwlCarousel>:""
                                }
                                </div>
                            </div>
                            
                        </div>
                        <div className='popular-post'>
                            <h3 className='c-white mb-2'>Post Populares</h3>
                            <div className='content-popular-post'>
                                {
                                    data.map((card,index)=>{ 
                                        if(index < 6){
                                            return(
                                            <div className='mini-post d-flex' key={'card'+index}>
                                                <div className='content-img'>
                                                    <img className='' src={card.image} ></img>
                                                </div>
                                                <div className='d-flex f-column'>
                                                    <span className='c-white bold mb-1'>{card.name}</span>
                                                    <span className='c-white date'>31 de mayo de 2022</span>
                                                </div>
                                            </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className='section section-form container'>
                    <span className='bold c-white title-form text-center mb-2'>Contáctanos</span>
                    <FormBuilder
                        id={1668788850499}
                        className={"form-home"}
                    />
                </section>
                <section className='section section-klaviyo container'>
                    <form className='style'>
                        <div className='btn b-white' onClick={()=>{addUser()}}>
                            add user
                        </div>
                    </form>
                </section>
            </div>
            <section className='developers'>

            </section>
        </main>
    )
}

function Header(){
    const [visitor,setVisitor] = useState({});
    const [home,setHome] = useState({});
    const [countries,setCountries] = useState([
        {country:'Peru',coord:{top: "62%",left: "27%"}},
        {country:'Argentina',coord:{top: "62%",left: "27%"}},
        {country:'Chile',coord:{top: "62%",left: "27%"}},
        {country:'Brasil',coord:{top: "62%",left: "27%"}},
        {country:'Uruguay',coord:{top: "62%",left: "27%"}},
        {country:'Bolivia',coord:{top: "62%",left: "27%"}},
        {country:'Venezuela',coord:{top: "62%",left: "27%"}},
        {country:'Paraguay',coord:{top: "62%",left: "27%"}},
        {country:'México',coord:{top: "62%",left: "27%"}},
        {country:'Estados Unidos',coord:{top: "62%",left: "27%"}},
        {country:'Canadá',coord:{top: "62%",left: "27%"}},
    ]);
    useEffect(()=>{ 
        axios.get('/list/home').then(res=>{ 
            // console.log(res.data);
            // setHome(res.data)
        })
        axios.get('http://www.geoplugin.net/json.gp').then(res=>{ 
            setVisitor(res.data)
        })
    },[])
    const transformBase = (value,classes,reg,space) => {
        return animation(value,classes,reg,space)
    }
    return(
        <header className='container header'>
            <div className='content-inf'>
                <h1 className='c-white bold letters-animate' dangerouslySetInnerHTML={{__html:transformBase("LA RED DEEP WEB!","bold"," ")}}></h1>
                <p className='paragraph c-white'>Buscamos desentrañar los misterios de la humanidad</p>
                <div className='d-flex f-row mt-2'>
                    {
                        home?.header?.links.map((item,index)=>{
                            return(
                            <a className={`c-white c-hover-white button ${item.class_css}`} href={item?.url} key={'link-header-'+index}>
                                <i className='icon-whatsapp mask'></i>
                                {item?.name}
                            </a>
                            )
                        })
                    }
                    {/* <div className='button gradient-secondary'>
                        <i className='icon-facebook mask'></i>
                        Grupo de Facebook
                    </div> */}
                </div>
            </div>
            <div className='content-img'>
                <img className='continent' src={require('../../assets/images/pages/home/mapa-mundi.png')} ></img>
                <div className='point-site peru active'>
                    <div className='message'>
                        <span className='c-white'>
                            {visitor?.geoplugin_request}
                        </span>
                    </div>
                </div>
                <div className='point-site chile'>
                </div>
                <div className='point-site brasil'>
                </div>
                <div className='point-site mexico'>
                </div>
            </div>
        </header>
    )
}