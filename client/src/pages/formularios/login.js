import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { inactiveNav } from '../../components/page/navbar/navbarSlice'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import './auth.scss'

function Login (){
    const [iconShowPassword, SetIconShowPassword] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(inactiveNav());

    const checkToken = () => {
        try {
            let token = localStorage.getItem('token')
            if(token.length > 0){
                axios.post('/auth/validationToken',{token:localStorage.getItem('token')}).then(res => {
                    if(res.data.token == true){
                        navigate('/dashboard')
                    }
                })
            }else{
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        checkToken();
    },[])

    const showPassword = () => {
        let input = document.getElementById('password');
        SetIconShowPassword(!iconShowPassword)
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        axios.post('/users/verifyUser',{ username,password }).then(res => { 
            if(res.data.status === 200){
                localStorage.setItem('token',res.data.token)
                navigate('/dashboard')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <main className="auth-page">
            <Helmet>
                <script src="https://kit.fontawesome.com/6611670d58.js" crossorigin="anonymous"></script>
            </Helmet>
            <div className='auth-full-page-content'>
                <div className='auth-brand'>
                    
                </div>
                <form className="form-style" onSubmit={handleSubmit}>
                    <h1 className="title">Login</h1>
                    <div className="content-input f-column">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="input-high" id="username" placeholder="Ingresa el usuario"></input>
                    </div>
                    <div className="content-input f-column">
                        <div className="d-flex space-between">
                            <label className="form-label">Contraseña</label>
                            <div className="flex-shrink-0">
                                <div className="">
                                    <a href="auth-recoverpw.html" className="text-muted">Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="input-group d-flex input-high">
                            <input type="password" id="password" className="form-control" placeholder="Ingresa la contraseña" aria-label="Password" aria-describedby="password-addon"></input>
                            <label className="btn look" type="button" id="password-addon" onClick={()=>{showPassword()}}>
                                {
                                    iconShowPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>
                                }
                            </label>
                        </div>
                    </div>
                    <div className="row mb-4 w-100">
                        <div className="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="remember-check"></input>
                                <label className="form-check-label" htmlFor="remember-check">
                                    Recordarme
                                </label>
                            </div>  
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary w-100 input-high" type="submit">Ingresar</button>
                    </div>
                </form>
                <div className='auth-footer'>
                    © 2022 created with ♥  by Flavio  
                </div>
            </div>
            <div className='bg-auth'>
                <div className='content-img'>
                    <ul className="bg-bubbles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <img className='img-expand' src={require('../../assets/images/auth/auth-bg.jpg')} ></img>
                </div>
            </div>
        </main>
    )
}

export default Login;