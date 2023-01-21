
import { Helmet } from 'react-helmet-async';
import Footer from "../footer/footer";
import Navbar from '../navbar/navbar';

function PublicRoutes (props){
    return (
        <>  
        <Navbar></Navbar>
            {props.component}
        <Footer/>
        </>
    )
}
export default PublicRoutes
// export default connect(null,{showNav})(PublicRoutes)
