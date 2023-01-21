import axios from "axios"

const TOKEN = 'token';
export const setTokenHelper = (token) => {
    localStorage.setItem(TOKEN,token)
}

export const getTokenHelper = () => {
    return localStorage.getItem(TOKEN)
}

export const deleteTokenHelper = () => {
    localStorage.removeItem(TOKEN)
}

export const curremtUserHelper = (state) => {
    state.currentUser = true
}

export const convertToDate = (date) => {
    let date_ = new Date(date);
    return date_.toLocaleDateString("es-Es",{ year: 'numeric', month: 'long', day: 'numeric' });
}

// return the same path or the path with the icon acording to the extension
export const verifyExtension = (file) =>{
    let extension = file.file_name.split('.').pop()
    if(extension == 'pdf'){
        return 'file.png'
    }else if(extension == 'mp4'){
        return 'video.png'
    }else if(extension == 'mp3'){
        return 'file.png'
    }else if(extension == 'webp' || extension == 'jpg' || extension == 'png' || extension == 'jpeg'|| extension == 'gif'|| extension == 'svg'|| extension == 'PNG'|| extension == 'JPG'|| extension == 'JPEG'|| extension == 'GIF'|| extension == 'SVG'){
        return file.compress.length > 0 ? file.compress : file.file_name; 
    }else{
        return 'file.png'
    }
}