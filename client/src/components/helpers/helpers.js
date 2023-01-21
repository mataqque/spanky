// sortable
const onSortEnd = async ({oldIndex, newIndex}) => {
    // const newList = arrayMove(initialValues.items, oldIndex, newIndex);
    // return newList;
};
export const generateId =({type})=>{
    const typeid = {
        number : (new Date()).getTime(),
        string : Math.random().toString(36).substr(2, 18)
    }
    const typeIdDefault = typeid.string;
    return typeid[type] || typeIdDefault
}

export const generateUrl = (props)=>{
    console.log(props)
    let path = window.location.origin;
    let url = path+props.dir+"/"+props.file_name;
    return url;
} 

export const convertDate = (date) => {
    let date_ = new Date(date);
    return date_.toLocaleDateString("es-Es",{ year: 'numeric', month: 'long', day: 'numeric' });
}


export const onChangeInputBoolean =(setter,select)=>{
    setter(prevState => ({
        ...prevState,
        [select.target.name]:select.target.checked
    }));
}
export const onChangeInput =(setter,select)=>{
    setter(prevState => ({
        ...prevState,
        [select.target.name]:select.target.value
    }));
}

export const onChangeOptions =(setter,name,value)=>{
    setter(prevState => ({
        ...prevState,
        [name]:value
    }));
}

// function to copy text to clipboard

export const copyToClipboard = (text) => {
    try {
        let textarea = document.createElement("textarea");
        textarea.value = text
        textarea.style.position = "fixed";
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.opacity = 0;
        textarea.style.pointerEvents = "none";
        document.body.appendChild(textarea);
        textarea.focus()
        textarea.select()
        document.execCommand('copy');
    } catch (error) {
        console.log(error)
    }
}

export const generatePath = (...props)=>{
    let path = window.location.origin;
    props.map((item) => { path += "/"+item.replace(/\//,"") });
    return path;
} 