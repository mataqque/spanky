import Icon from '../Icon'
import "./loader.scss"
import loader from '../../../../assets/icons/lottie/loader-main.json'
import { useEffect } from 'react'
import { useState } from 'react'

export const LoaderComponent = (props) => {
    
    const [activeLoader, SetActiveLoader] = useState(true);

    const properties = {
        class: 'loader-main',
        loop: true,
        icon: loader,
    }

    useEffect(() => {
        let time = setInterval(() => {
            SetActiveLoader(false)
            clearInterval(time)
        }, props.time);
    })

    return (
        <div className={`loader-component ${activeLoader==false?'inactive':''}`}>
            {/* <div className='loader'>
                <Icon properties={properties}></Icon>
            </div> */}
            {props.children}
        </div>
    )
}
