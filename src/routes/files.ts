import { Router } from 'express';
import {Request, Response} from 'express';
import { filesController } from '../controllers/filesController';
const multer  = require('multer');
const pathDestination = '../public/images';
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: async function (req:any, file:any, cb:any) {
        if(fs.existsSync(path.join(__dirname,pathDestination))){
            cb(null, path.join(__dirname,pathDestination))
        }else{
            await fs.mkdirSync(path.join(__dirname,pathDestination),{recursive:true})
            cb(null, path.join(__dirname,pathDestination))
        }
    },
    filename: function (req:any, file:any, cb:any){
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        // console.log(file)
        cb(null, uniqueSuffix+"-"+file.originalname)
        
    }
});


const upload = multer({ storage: storage })

export class filesRoute {
    public router: any;
    public filesController: filesController = new filesController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    
    private routes() {
        this.router.post("/upload", upload.array('archivo', 4), this.filesController.upload)
        this.router.post("/delete", this.filesController.deleteFiles);
        this.router.get("/getFiles/:type", this.filesController.getImages);
        this.router.post("/compress", this.filesController.compressImages);
        this.router.post("/search", this.filesController.search);
        this.router.get("/mysql", this.filesController.mysql);
    }
}

