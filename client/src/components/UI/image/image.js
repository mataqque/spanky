import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton'


export default function ImageLoading(props){
    const [loadImage, setLoadImage] = useState(false);
    const routeFile = props.src;
    const imageLoaded = () => {
        setLoadImage(true);
    }
    useEffect(() => {

    },[loadImage]);
    
    return(
        <div className='content-loading-img'>
            {loadImage == false ? <Skeleton/> : null}
            <img className='img' src={routeFile} onLoad={()=>{imageLoaded()}} loading='over-eager'></img>
        </div>
    )
}