import axios from "axios"
import { updateUsers } from '../../../data/userStore'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { convertToDate } from "../../../data/helpers/helpers"
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Link,Outlet } from "react-router-dom"


function GestionUsuarios (props){
    const dispatch = useDispatch()
    const users = useSelector((state) => state.usersSlice.users)
    useEffect(()=>{
        axios.get('/users/getUsers').then(res=>{
            dispatch(updateUsers(res.data))
        })
    },[])
    return(
        <div className="features">
            <h2 className="title-component bold">Gestión de usuarios</h2>
            <div className="content-users">
                <div className="user-header user">
                    <div className='item usuario bold'>
                        Foto
                    </div>
                    <div className='item usuario bold'>
                        Usuario
                    </div>
                    <div className='item rol bold'>
                        Rol
                    </div>
                    <div className='item phone bold'>
                        Phone
                    </div>
                    <div className='item email bold'>
                        Email
                    </div>
                    <div className='item status bold'>
                        Estado
                    </div>
                    <div className='item date-created bold'>
                        Creación de la cuenta
                    </div>
                    <div className='item actions bold'>
                        Accciones
                    </div>
                    {
                        users.map((user,index)=>{
                        return(
                            <ListUser user={user} key={'user-data'+index}/>
                        )}) 
                    }
                </div>
            </div>
            {/* <form className="form-style">
                <div className="content-input">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="input-high" id="username" placeholder="Ingresa el usuario"></input>
                </div>
            </form> */}
        </div>
    )
}
export default GestionUsuarios

function ListUser(props){
    return(
        <>
            <div className='item usuario'>
                <Stack direction="row" spacing={2}>
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={props.user?.username}
                        src={`/images/${props.user?.photo}`}
                    ></Avatar>
                </Stack>
            </div>
            <div className='item usuario'>
                {props.user?.username}
            </div>
            <div className='item rol'>
                {props.user?.role}
            </div>
            <div className='item phone'>
                {props.user?.phone}
            </div>
            <div className='item email'>
                {props.user?.email}
            </div>
            <div className='item status'>
                {props.user?.status == "true" ? <span className="c-success">Activo</span> : <span className="c-danger">Inactivo</span>}
            </div>
            <div className='item date-created'>
                {convertToDate(props.user?.created_at)}
            </div>
            <div className='item actions bold'>
                <Link to={props.user?.uuid_user} className='edit c-success'>
                    <i className="fas fa-user-edit c-pointer"></i>
                </Link>
                <div className='delete c-danger c-pointer'>
                    <i className="fas fa-trash-alt"></i>
                </div>
            </div>
        </>
     ) 
}