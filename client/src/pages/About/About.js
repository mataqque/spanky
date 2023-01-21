import './About.scss'
const data = require("./poligono");


export default function About(){
  
    console.log(data.area(2,2).perimetro())
    return(
        <main className='about main pt-3'>
            <div className='container'>
                <h1 className='title text-center c-white bold mb-2'>Quienes somos?</h1>
                <p className='paragraph c-white text-center'>Somos un grupos de amigos, con la intención de crear un comunidad que se questione los interesantes hallazgos, conspiraciones, investigaciones,etc.</p>
                
                <h1 className='title text-center c-white bold mt-3 mb-2 mt-2'>Nuestro equipo</h1>
                <div className='content-targets d-flex'>
                    <div className='target'>
                        <div className='target-front'>
                            <div className='content-img'>
                                <img className='' src={require('../../assets/images/pages/aboutus/Flavio.PNG')} ></img>
                            </div>
                        </div>
                        <div className='target-back f-column'>
                            <span className='sub-title c-white mb-1'>Ingeniero de sistemas</span>
                            <span className='name c-white bold mb-1'>Flavio Mataqque Pinares</span>
                            <div className='redes mb-1'>
                                <div className='btn-link d-flex'>
                                    <div className='content-icon'>
                                        <a className='icon-f-facebook mask'></a>
                                    </div>
                                    <div className='content-icon'>
                                        <a className='icon-instagram mask'></a>
                                    </div>
                                    <div className='content-icon'>
                                        <a className='icon-twitter mask'></a>
                                    </div>
                                    <div className='content-icon'>
                                        <a className='icon-github mask'></a>
                                    </div>
                                </div>
                            </div>
                            <div className='button gradient-secondary'>
                                Ver Perfil
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}