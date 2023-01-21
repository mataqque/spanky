const bcrypt = require('bcryptjs');
export class helpers{
    public encryptPassword = async (password:string) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    matchPassword = async (password:string, savedPassword:string) => {
        try {
            return await bcrypt.compare(password, savedPassword);
        } catch (err) {
            return err
        }
    }
    verifyUser = async (pool:any,res:any,email:string,password:string) =>{
        
    }
    file_name = async (fileName:string) => {
        let onlyName = fileName.split('.')[0];
        return onlyName;
    }
    file_extension = async (filename:any) => {
        const documento = /(pdf|docx|html|zip|svg|avi)/g;
        const image = /(png|PNG|JPG|jpg|jpeg|web|gif)/g;
        const audio = /(mp3)/g;
        const video = /(mpeg|mp4)/g;

        let ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
        let type = "";

        if(documento.test(ext)) type = "documento";
        if(image.test(ext)) type = "image";
        if(audio.test(ext)) type = "audio";
        if(video.test(ext)) type = "video";

        let dataExt = {ext:ext,typeFile:type}
        return dataExt;
    }
    generateId = () => Math.random().toString(36).substr(2, 18);
}

