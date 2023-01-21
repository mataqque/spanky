import React, { Component } from 'react'
import './navbar.scss'
import { activeLinks } from '../../../data/routeStore'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { toggleNavbar } from './navbarSlice';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Navbar(props) {
    const [activeNavScrolled,setActiveNavScrolled] = useState(false)
    const activeNav = useSelector((state) => state.navbarSlice.activeNav);
    const state = useSelector((state) => state)
    const links = useSelector((state) => state.routesFeatures.links)
    const activeLink = useSelector((state) => state.routesFeatures.activeLinkValue)
    const dispatch = useDispatch()

    useEffect (()=>{
        window.onscroll = () => {
            window.scrollY == 0 ? setActiveNavScrolled(false): setActiveNavScrolled(true);
        }
    },[])
    if(activeNav){
        return(
            <nav className={`navbar ${activeNavScrolled == true ? 'active':''}`}>
                <div className='container nav-container'>
                    <a href='/' className='brand bold'>
                        DEEPWEB!
                    </a>
                    <div className='container-link inactive'>
                        <div className='center'>
                            {
                                links.map((item,index)=>{
                                    if(item.show != false){
                                        return(
                                        <Link to={item.link} key={"link-"+index} onClick={(e)=>{dispatch(toggleNavbar())}}>
                                            <div className={`link ${item.index == activeLink ? "active" : ""}`}
                                                onClick={()=>{dispatch(activeLinks(item.index))}}
                                            >
                                                <span className="text-link">{item.title}{item.icon ? <img className='icon' src={item.icon}></img> : ''}</span>
                                                <span className="line"></span>
                                            </div>
                                        </Link>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='link-buttons'>
                            <div className='button gradient-secondary'>
                                Sign In
                            </div>
                            <div className='button gradient-secondary'>
                                Register
                            </div>
                        </div>
                       
                    </div>
                </div>
            </nav>
        )
    }else{
        return null
    }
}
