import { LoaderComponent } from "../../components/dashboard/UI/Loaders/LoaderComponent";
import { useSelector } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { deleteToken } from '../../data/userStore'
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { toggleSideBar,handleChangeSidebar} from "./dashboardSlice";
import './dashboard.scss'
import ModalUpload from "../../components/dashboard/FileManager/modalFile";
import { useState } from "react";


function Dashboard (props){
    const navigate = useNavigate();
    const statetoggleSideBar = useSelector((state) => state.dashboardSlice.toggleSideBar);
    const sectionBoton = useSelector((state) => state.dashboardSlice.sectionBoton);
    const expanded = useSelector((state) => state.dashboardSlice.expanded);
    const dispatch = useDispatch();
    const [sectionActive,setSectionActive] = useState(0);

    const handleChange = (panel) => (event, newExpanded) => {
        console.log(panel,newExpanded)
        let expanded = newExpanded ? panel : false
        dispatch(handleChangeSidebar(expanded))
        // this.setState({expanded: newExpanded ? panel : false, activeSection: panel})
    }
    const changeSection = (active , upComponent) =>{
        setSectionActive(active)
    }
    const subHandleChangeSection = (active, upComponent) => {
        // this.setState({activeSection:active,component:upComponent})
    }
    const logOut = () => { 
        navigate("/login")
        dispatch(deleteToken())
    }
    return (
        <>
            <LoaderComponent properties={{time:"1000"}}>
                <main className="dashboard" key={'dash'}>
                    <ModalUpload></ModalUpload>
                    {/* {
                        this.props.show == true ? <GaleriaModal/> : null
                    } */}
                    <div className='content-dashboard'>
                        <div className={`envolves ${statetoggleSideBar ? '' : 'close'}`}>
                            <div className='content-sidebar'>
                                <div className='brand-dashboard c-white'>
                                    DASHBOARD
                                    <div className='icon-menu mask' onClick={() => dispatch(toggleSideBar(false))}>
                                    </div>
                                </div>
                                <div className='user'>
                                    <div className='content-img'>
                                        <img className='profile' src={require('../../assets/images/dashboard/profile.jpg')} ></img>
                                    </div>
                                    <RoleUser/>
                                </div>
                                <div className='sider-bar_bottom scrollAlternateColor'>
                                    <div className='sidebar'>
                                        {
                                            sectionBoton.map((body,index)=>{
                                                return(
                                                    <SectionSidebar 
                                                        key={'Sidebar'+index}
                                                        sectionActive={sectionActive}
                                                        expanded={expanded} 
                                                        handleChange={handleChange} 
                                                        body={body}
                                                        index={sectionActive}
                                                        changeSection={changeSection}
                                                        subHandleChangeSection= {subHandleChangeSection}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='sidebar-down-option d-flex align-center justify-center'>
                                    <div className='option'>
                                        <div className='mask icon-settings'>
                                        </div>
                                    </div>
                                    <div className='option'>
                                        <div className='mask icon-notification'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='wrapper'>
                            <div className='nav-wrapper'>
                                <div className='toggle' onClick={()=>{dispatch(toggleSideBar())}}>
                                    <img className='icon' src={require('../../assets/images/dashboard/menu.svg').default} ></img>
                                </div>
                                <div className='content-links'>
                                    <div className='link'>
                                        <span className='top-font'>
                                            <Link to={"/dashboard"}>Dashboard</Link>
                                        </span>
                                    </div>
                                </div>
                                <div className='toggle left' onClick={()=>{logOut()}}>
                                    <i className="fas fa-sign-out-alt"></i>
                                </div>
                            </div>
                            <div className='content-wrapper'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </main>
            </LoaderComponent>
        </>
    )
}

export default Dashboard;

function RoleUser(){
    const user = useSelector((state) => state.usersSlice.userLoggedIn);
    return(
        <div className='user-role'>
            <span className='role c-white'>{user?.role}</span>
            {
                user.name ? <span className='name c-white'>{user.name} {user.lastname}</span> : <span className='name c-white'>{user?.username}</span>
            
            }
        </div>
    )
}

function SectionSidebar (props){
    return(
        <div className='section-sidebar'>
            <div className='c-sidebar-nav-title sidebar-sub-title'>
                {props.body.header}
            </div>
            <div className='c-sidebar-nav-item'>
                {
                    props.body.sections.map((section,index)=>{
                        if(section.subSection == 0 ){
                            return(
                                <Link to={section?.path ? section?.path : '#'} className={`c-sidebar-nav-title ${section.index == props.sectionActive ? 'active' : ''}`} onClick={()=>{props.changeSection(section.index,section.component)}} key={'section-'+index}>
                                    <i className={section.icon}></i>
                                    <span className='span-title'>{section.title}</span>
                                    <div className='mask icon-signal-rigth'>
                                    </div>
                                </Link>
                            )
                        }else{
                            return(
                            <Accordion expanded={props.expanded === section.index} square onChange={props.handleChange(section.index,section.component)} key={'section-'+index}>
                                <AccordionSummary aria-controls="panel-content">
                                    <Typography>
                                        <label className={`c-sidebar-nav-title ${props.expanded == section.index ? 'active-nav' : ''}`}>
                                            <i className={section.icon}></i>
                                            <span className='span-title'>{section.title}</span>
                                            <label className='mask icon-signal-rigth'>
                                             </label>
                                        </label>
                                    </Typography>
                                </AccordionSummary>
                                {
                                    section.subSection.map((item,index)=>{
                                        return(
                                        <AccordionDetails key={'subSection-'+index}>
                                            <Typography>
                                                <Link to={item?.path ? item?.path : '/'} className='c-sidebar-nav-title subsidebar' onClick={()=>{props.subHandleChangeSection(item.index,item.component)}} key={'acordion-'+index}>
                                                    <i className={item.icon}></i>
                                                    <span className='span-title'>{item.title}</span>
                                                </Link>
                                            </Typography>
                                        </AccordionDetails>
                                        )
                                    })
                                }
                            </Accordion>
                            )
                        }
                    })
                }
                
            </div>
        </div>
    )

}