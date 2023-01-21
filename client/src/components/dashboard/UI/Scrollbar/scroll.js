import { useState,useEffect} from 'react';
import { useRef } from 'react';
import './scroll.scss'
export default function ScrollBar(props){
    const bar = useRef(null)
    const [height, setHeight] = useState(0);
    const moveScroll = (e)=>{
        const {scrollHeight,offsetHeight,scrollTop} = e.target
        let parent = bar.current.parentNode;

        let scrollTopFixed = scrollTop * (parent.offsetHeight / scrollHeight);
        let translate = (scrollHeight * ((scrollTop + scrollTopFixed) / scrollHeight));
        bar.current.style.top = `${translate}px`;
    }
    const updateHeightScroll = (e)=>{
        let parent = bar.current.parentNode;
        let heightScroll = (parent.clientHeight / parent.scrollHeight * 100)
        
        setHeight(heightScroll+'%');
    }
    useEffect(()=>{
        let timer = setInterval(() => {
            let parent = bar.current.parentNode;
            const {scrollHeight,clientHeight} = parent;
            // 
            // console.log({scrollHeight}, {clientHeight})
            scrollHeight != clientHeight ? updateHeightScroll() : setHeight(0);
            parent.addEventListener('scroll',moveScroll);
            clearInterval(timer);
        }, 500);
    },[])
    return (
        <div className="content-scrollbar" ref={bar} style={{height:height}}>
        </div>
    );
}