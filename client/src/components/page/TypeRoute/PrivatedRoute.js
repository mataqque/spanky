import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { inactiveNav } from '../navbar/navbarSlice';
import { setUserLoggedIn } from '../../../data/userStore';
import './protected.scss'
const iconLoader = require("../../../assets/icons/lottie/loader-points.json");

function PrivateRoute (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(inactiveNav());
    axios.post('/auth/validationToken',{token:localStorage.getItem('token')}).then(res => {
        if(res.data.token == false){
            navigate('/login')
        }else{
            dispatch(setUserLoggedIn(res.data.dataSet))
        }
    })
    return(
        <>
            <Helmet>
                <script src="https://kit.fontawesome.com/6611670d58.js" crossorigin="anonymous"></script>
            </Helmet>
            {props.children}
        </>
    )
}

export default PrivateRoute