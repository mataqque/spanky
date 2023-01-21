import './footer.scss'
export default function Footer(){
    return(
        <footer className='footer'>
            <div className='container header-footer'>
                <div className='brand bold c-white'>
                    DEEPWEB!
                </div>
                <div className='content'>
                    <div className='column'>
                        <span className='c-white title-link d-flex mb-1'>Síguenos</span>
                        <div className='link-icons'>
                            <i className='icon-facebook mask mr-1'></i>
                            <i className='icon-whatsapp mask'></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container line-footer'>
                <span className='c-white mr-1'>Terminos y condiciones</span>
                <span className='c-white mr-1'>Politicas de seguridad</span>
                <span className='c-white mr-1'>Sitemap</span>
                <span className='ml-auto c-white'>
                    © 2020 Deepweb. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    )
}