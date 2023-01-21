import { useEffect, useRef, useState } from 'react';
import './EditorHtml.scss'
import ResizerLibrary from './script';
export function EditorHtml({className,initialHtml,...props}){
    const editor = useRef(null);
    const [editorState, setEditorState] = useState();
    const [selected, setSelected] = useState();
    const [selectedHtml, setSelectedHtml] = useState();
    const [Resizer, setResizer] = useState({
        onMouseMove:(e)=>{},
        onMouseDownCapture:(e)=>{},
        onChangeEvent:(e)=>{
            console.log(e)
        },
    });
    const [config, setConfig] = useState({
        toolbar: [
            {
                title:"Tags",
                type:"tags",
                options:[
                    {
                        name:"Head tags",
                        value:"",
                    },
                    {
                        name:"paragraph",
                        value:"p",
                    },
                    {
                        name:"span",
                        value:"span",
                    },
                    {
                        name:"h1",
                        value:"h1",
                    },
                    {
                        name:"h2",
                        value:"h2",
                    },
                    {
                        name:"h3",
                        value:"h3",
                    },
                    {
                        name:"h4",
                        value:"h4",
                    },
                    {
                        name:"h5",
                        value:"h5",
                    },
                    {
                        name:"h6",
                        value:"h6",
                    },
                ]
            },
            {
                title:"Negrita",
                icon:"fas fa-bold",
                type:"bold",
            },
            {
                title:"italic",
                icon:"fas fa-italic",
                type:"italic",
            },
            {
                title:"strikeThrough",
                icon:"fas fa-strikethrough",
                type:"strikeThrough",
            },
            {
                title:"Underline",
                icon:"fas fa-underline",
                type:"underline",
            },
            {
                title:"justifyLeft",
                icon:"fas fa-align-left",
                type:"justifyLeft",
            },
            {
                title:"justifyCenter",
                icon:"fas fa-align-center",
                type:"justifyCenter",
            },
            {
                title:"justifyRight",
                icon:"fas fa-align-right",
                type:"justifyRight",
            },
            {
                title:"insertImage",
                icon:"fas fa-file-image",
                type:"insertImage",
                pluggin:"image",
            },
        ]
    });
    const removeSelected = () => {
        setSelected(null);
    }
    const runCommand = (el,commandName, arg)=>{ 
        try {
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(selected.range)
            document.execCommand(commandName, true, arg);
            removeSelected();
        } catch (error) {
            
        }
    }
    const MouseEvent = (e) => {
        var selection = window.getSelection();
        if(selection.type == "Range"){
            var range = selection.getRangeAt(0)
            setSelected({range:range,selection:selection})
        }else{
            setSelected(null)
        }
    }
    const handleMouseUp = (e) => {
        console.log('up',e.target.getBoundingClientRect())
    }
    const selectOnChange = (e) => {
        if(selected != null){
            let textSelected = selected.selection.toString();
            console.log(textSelected)
            runCommand(e,'insertHtml',`<${e.target.value}>${textSelected}</${e.target.value}>`)
            removeSelected();
        }
    }
    const onChangeEditor = (e) => {
        let returnHtml = editor.current.innerHTML;
        if(props?.getHtml){
            props?.getHtml(returnHtml);
        }
    }
    useEffect(()=>{
        let Resizer = new ResizerLibrary({container:".containers"});
        setResizer(Resizer);

    },[])
    return(
        <div className={`Editor-html ${className}`}>
            <div className='toolbar-group'>
                <div className='toolbar-group-item form-style d-flex'>
                    {
                        config.toolbar.map((item,index)=>{
                            return(
                                item.options ?
                                <div className={`content-input btn${index+1}`} key={'toolbar-select'+index}>
                                    <select className='input select' onChange={(e)=>{selectOnChange(e)}}>
                                        {
                                            item.options.map((option,index)=>{
                                                return(
                                                    <option value={option.value} key={'tooloption'+index}>{option.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> : 
                                <div className={`content-input btn${index+1}`} onClick={(e)=>{runCommand(e,item.type,null)}} key={'toolbar'+index}>
                                    <div className='icon'>
                                        <i className={item.icon}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='content-textarea' 
                // onMouseMove={(e)=>{Resizer.onMouseMove(e)}}
                // onClick={(e)=>{Resizer.click(e)}}
                // onMouseUpCapture={(e)=>{Resizer.onMouseUpCapture(e)}}
                >
                <div className='poligone'>
                    <div className='config'>
                        <i className="fas fa-list-ul" aria-hidden="true"></i>
                        Atributos de imagen
                    </div>
                    {/* <div onMouseDownCapture={(e)=>{Resizer.clickBtnCoord(e,"se")}} className='coord rigth-bottom'></div> */}
                </div>
                <div className='containers scroll' 
                    contentEditable
                    onInput={(e)=>{onChangeEditor(e);Resizer.onChangeEvent(e)}}
                    onMouseLeave={(e)=>{MouseEvent(e)}}
                    onScroll={(e)=>{Resizer.onChangeEvent(e)}}
                    onChange={(e)=>{onChangeEditor(e)}}
                    ref={editor}
                    dangerouslySetInnerHTML={{__html:initialHtml}}
                    >
                        {/* <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80" style="width:500px"> </img>
                        <img src="https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal_recorte1.jpg"/> */}
                </div>
            </div>
        </div>
    )
}