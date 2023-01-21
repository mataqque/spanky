import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PublicRoutes from './components/page/TypeRoute/PublicRoutes'
import PrivatedRoute from './components/page/TypeRoute/PrivatedRoute'
import Apuesta from './pages/apuesta/apuesta'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GestionHome from './components/dashboard/GestionHome/gestionHome'
import GestionPromociones from './components/dashboard/GestionPromociones/GestionPromociones'
import CreateFieldGlobal from './components/dashboard/Customfields/CustomFieldEdit'

const fraseGallery = 'Sube tus archivos mp3, mp4, jpg ,png, webp, svg. etc, los archivos deben pesar menos de 10mb, no se admiten archivos con peso mayor a 100mb';
const About =  React.lazy(() => import(/* webpackChunkName:"about"*/'./pages/About/About'))
const Home =  React.lazy(() => import(/* webpackChunkName:"home"*/'./pages/Home/home'))
const GestionProjects = React.lazy(() => import(/* webpackChunkName:"gestionprojects"*/'./components/dashboard/GestionProjects/gestionProjects')) 
const GestionUsuario = React.lazy(() => import(/* webpackChunkName:"GestionUsuario"*/'./components/dashboard/GestionUsuarios/GestionUsuario'))
const GestionUsuarios =  React.lazy(() => import(/* webpackChunkName:"GestionUsuarios"*/'./components/dashboard/GestionUsuarios/GestionUsuarios'))
const GestionPage = React.lazy(() => import(/* webpackChunkName:"GestionPage"*/'./components/dashboard/GestionProjects/gestionPage'))
const GestionProductos = React.lazy(() => import(/* webpackChunkName:"GestionProductos"*/'./components/dashboard/GestionProductos/GestionProductos'))
const Login =  React.lazy(() => import(/* webpackChunkName:"login"*/'./pages/formularios/login'))
const Features =  React.lazy(() => import(/* webpackChunkName:"features"*/'./components/dashboard/List/Features'))
const GestionLinks =  React.lazy(() => import(/* webpackChunkName:"gestionLinks"*/'./components/dashboard/GestionLinks/GestionLinks'))
const FileManager =  React.lazy(() => import(/* webpackChunkName:"FileManager"*/'./components/dashboard/FileManager/FileManager'))
const Dashboard =  React.lazy(() => import(/* webpackChunkName:"Dashboard"*/'./pages/dashboard/dashboard'))
const GestionProducto =  React.lazy(() => import(/* webpackChunkName:"GestionProducto"*/'./components/dashboard/GestionProductos/GestionProducto'))
const CustomGlobalFields =  React.lazy(() => import(/* webpackChunkName:"Customfields"*/'./components/dashboard/Customfields/Customfields'))
const CustomForms =  React.lazy(() => import(/* webpackChunkName:"Customfields"*/'./components/dashboard/CustomForms/CustomForms'))
const CreateForm =  React.lazy(() => import(/* webpackChunkName:"CreateForm"*/'./components/dashboard/CustomForms/CreateForm'))
const BotWhatsapp =  React.lazy(() => import(/* webpackChunkName:"BotWhatsapp"*/'./components/dashboard/BotWhatsapp/botWhatsapp'))
const GestionCategoriesAndTags =  React.lazy(() => import(/* webpackChunkName:"tagsandcategories"*/'./components/dashboard/GestionCategorias/GestionCategorias'))

const ReactComp = {
    Home:<Suspense fallback={<div>Cargando...</div>}><Home/></Suspense>,
    Apuesta:<Apuesta></Apuesta>,
    About:<About></About>,
    Login:<Suspense fallback={<div>Cargando...</div>}><Login/></Suspense>,
    Dashboard:<Dashboard></Dashboard>,
    FileManager:<Suspense fallback={<div>Cargando...</div>}><FileManager frase={fraseGallery} type={'gallery'}/></Suspense>,
    GestionUsuarios:<Suspense fallback={<div>Cargando...</div>}><GestionUsuarios/></Suspense>,
    DataUser:<Suspense fallback={<div>Cargando...</div>}><GestionUsuario/></Suspense>,
    // GestionHome:<GestionHome/>,
    GestionProjects:<Suspense fallback={<div>Cargando...</div>}><GestionProjects/></Suspense>,
    GestionPage:<Suspense fallback={<div>Cargando...</div>}><GestionPage/></Suspense>,
    GestionLinks:<Suspense fallback={<div>Cargando...</div>}><GestionLinks/></Suspense>,
    GestionProductos:<Suspense fallback={<div>Cargando...</div>}><GestionProductos/></Suspense>,
    GestionProducto:<Suspense fallback={<div>Cargando...</div>}><GestionProducto/></Suspense>,
    GestionPromociones:<Suspense fallback={<div>Cargando...</div>}><GestionPromociones/></Suspense>,
    Features:<Suspense fallback={<div>Cargando...</div>}><Features/></Suspense>,
    CustomGlobalFields:<Suspense fallback={<div>Cargando...</div>}><CustomGlobalFields/></Suspense>,
    CustomForms:<Suspense fallback={<div>Cargando...</div>}><CustomForms/></Suspense>,
    CreateForm:<Suspense fallback={<div>Cargando...</div>}><CreateForm/></Suspense>,
    CreateField:<Suspense fallback={<div>Cargando...</div>}><></></Suspense>,
    CreateFieldGlobal:<Suspense fallback={<div>Cargando...</div>}><CreateFieldGlobal/></Suspense>,
    BotWhatsapp:<Suspense fallback={<div>Cargando...</div>}><BotWhatsapp/></Suspense>,
    GestionCategoriesAndTags:<Suspense fallback={<div>Cargando...</div>}><GestionCategoriesAndTags/></Suspense>,
}

export default function RoutesDom (props){
    const links = useSelector((state) => state.routesFeatures.links)
    return (
        <Router>
            <ToastContainer />
            <Routes>
                {
                    links.map((item,index)=>{
                        return(
                            <Route exact path={item.link} key={index-'route'} element={
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <PublicRoutes item={item} component={ReactComp[item.component.name] ? ReactComp[item.component.name] : console.error('Component not found')}/>
                                </Suspense>
                            }/>
                        )
                    })
                }
                <Route exact path='/dashboard' key={'route-dashboard'} element={
                    <PrivatedRoute>
                        {ReactComp.Dashboard}
                    </PrivatedRoute>
                }>
                    <Route exact path='file-manager' element={ReactComp.FileManager}/>
                    // users
                    <Route exact path='gestionUsuarios' element={ReactComp.GestionUsuarios}/>
                    <Route exact path='gestionUsuarios/:id' element={ReactComp.DataUser}/>
                    // pages
                    <Route exact path='gestionPaginas' element={ReactComp.GestionProjects}/>
                    <Route exact path='gestionPagina/:page' element={ReactComp.GestionPage}/>
                    <Route exact path='createPage' element={ReactComp.GestionPage}/>
                    // links
                    <Route exact path='gestionLinks' element={ReactComp.GestionLinks}/>
                    // productos
                    <Route exact path='gestionProductos' element={ReactComp.GestionProductos}/>
                    <Route exact path='gestionProductos/createProduct' element={ReactComp.GestionProducto}/>
                    <Route exact path='gestionProducto/:id' element={ReactComp.GestionProducto}/>
                    // promociones
                    <Route exact path='gestionPromociones' element={ReactComp.GestionPromociones}/>
                    <Route exact path='Features' element={ReactComp.Features}/>
                    // Custom Components
                    <Route exact path='CustomFormFields' element={ReactComp.CustomFields}/>
                    <Route exact path='CustomForms' element={ReactComp.CustomForms}/>
                    <Route exact path='CreateForm' element={ReactComp.CreateForm}/>
                    <Route exact path='formulario/:id' element={ReactComp.CreateForm}/>
                    // Custom global components
                    <Route exact path='campos-personalizados' element={ReactComp.CustomGlobalFields}/>
                    <Route exact path='campos-personalizados/nuevo-campo' element={ReactComp.CreateFieldGlobal}/>
                    // Custom Categories and tags
                    <Route exact path='categorias-y-etiquetas' element={ReactComp.GestionCategoriesAndTags}/>
                    // Bot Whatsapp
                    <Route exact path='Botwhatsapp' element={ReactComp.BotWhatsapp}/>
                    // Prueba
                    <Route exact path='prueba' element={ReactComp.Prueba}/>
                </Route>
            </Routes>
        </Router>
    )
}