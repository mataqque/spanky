import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import BotonSelect from "../../UI/select/select";
import { useState } from "react";
import { FormContainer, setInputProps } from "../../helpers/common/forms/Form";
import { UserSchema } from "../../helpers/common/forms/constraints/ValidatonSchemas";
import { toast } from "react-toastify";


const arraySelect = [
    { name: 'Admin',value:'1' },
    { name: 'Editor',value:'2' },
    { name: 'Autor',value:'3' },
];
export default function GestionUsuario(props){
    const params = useParams()
    const [rol,setRole] = useState()
    const [user,setUser] = useState(null)
    
    const updateRole = (value) => {
        console.log(value)
        setRole(value.value)
    }
    const submitForm = (values) => {
        values.id_role = rol;
        console.log(values)
        axios.post('/users/updateUser',values).then(res=>{
            console.log(res)
            toast.success("Información actualizada", {
                position: "top-right",
            });
        })

    }
    useEffect(() => {
        const fetchData = async () => {
           await axios.get(`/users/getUser/${params.id}`).then(res => {
                const { uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role} = res.data[0]
                setRole(id_role)
                setUser({uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role})
            })
        }
        fetchData()
    },[setUser])

    return user ? (
        <>
            <div className=' d-flex'>
                <div className="features-auto mr-1">
                    <h2 className="title-component bold mb-1">Información del usuario</h2>
                    <FormContainer
                        initialValues={user}
                        validationSchema={UserSchema}
                        onSubmit={submitForm}
                    >
                    {form => {const {handleSubmit} = form;
                    return(
                        <form className="form-style d-flex w-100 flex-wrap" onSubmit={handleSubmit}>
                            <div className='w-100'>
                                <div className='avatar'>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{bgcolor: deepOrange[500] }}
                                            alt={user?.username}
                                            src={user?.photo ? `/images/${user?.photo}` : user?.username}
                                        ></Avatar>
                                    </Stack>
                                </div>
                            </div>
                            <div className="content-input f-column middle">
                                <label className="form-label">Rol</label>
                                <BotonSelect data={arraySelect} event={updateRole}></BotonSelect>
                            </div>
                            <div className="content-input f-column middle-2">
                                <label className="form-label ">Usuario</label>
                                <input {...setInputProps("username", "input-high ligth", form)} defaultValue={user.username} type="text" placeholder="Ingrese su usuario"></input>
                            </div>
                            <div className="content-input f-column middle">
                                <label className="form-label ">Nombre</label>
                                <input {...setInputProps("name", "input-high ligth", form)} defaultValue={user.name} type="text"  placeholder="Ingrese su nombre"></input>
                            </div>
                            <div className="content-input f-column middle-2">
                                <label className="form-label ">Apellidos</label>
                                <input {...setInputProps("lastname", "input-high ligth", form)} defaultValue={user.lastname} type="text"  placeholder="Ingrese su apellido"></input>
                            </div>
                            <div className="content-input f-column middle">
                                <label className="form-label ">Email</label>
                                <input {...setInputProps("email", "input-high ligth", form)} defaultValue={user.email} type="email"  placeholder="Ingrese su correo"></input>
                            </div>
                            <div className="content-input f-column middle-2">
                                <label className="form-label ">N° Celular</label>
                                <input {...setInputProps("phone", "input-high ligth", form)} defaultValue={user.phone} type="text"  id="username" placeholder="Ingrese su número celular"></input>
                            </div>
                            <div className="content-input f-column w-100">
                                <label className="form-label ">Dirección</label>
                                <input {...setInputProps("address", "input-high ligth", form)} defaultValue={user.address} type="text"  id="username" placeholder="Dirección"></input>
                            </div>
                            <div className='content-input w-100 d-flex justify-end f-d-row'>
                                <div className='btn c-white b-info mr-1'>
                                    Descartar cambios
                                </div>
                                <button type="submit" className='btn c-white b-success'>
                                    Guardar cambios
                                </button>
                            </div>
                        </form>
                     )}}
                    </FormContainer>    
                    <div className="features-auto mr-1">
                        <h2 className="title-component bold">Séguridad</h2>
                        <div className=''>
                        </div>
                    </div>
                </div>
            
            </div>
        </> 
    ) : <span>loading...</span>;
}