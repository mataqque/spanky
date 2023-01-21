import {Request, Response} from 'express';
import { pool } from '../database/database';
const sharp = require('sharp');;
const pathRoute = require('path')
const fs = require('fs')
const pathDestination = '../public/images';
import { helpers } from '../utilities/helpers/helpers';

export class filesController{
    public helpers;
    constructor(){
        this.helpers = new helpers();
    }
    upload = async (req:any,res:Response)=>{
        try{
          
            await req.files.map(async (file:any)=>{ 
                const {originalname,encoding,mimetype,filename,size} = file;
                
                let typeFile = await this.helpers.file_extension(originalname);
                let onlyName = await this.helpers.file_name(originalname);
                let dir ='/images';
                var compress = '';
            

                if(typeFile.typeFile == 'image'){
                    await sharp(pathRoute.join(__dirname,`../public/images/${filename}`))
                    .resize({width:1800,withoutEnlargement: true})
                    .webp({quality: 80,force: false})
                    .jpeg({quality: 80, compressionLevel: 8, progressive: true, force: false})
                    .png({quality: 80, progressive: true, force: false })
                    .toFile(pathRoute.join(__dirname,`../public/images/compress-${onlyName}.webp`), function(err:any) {
                        if(err){
                            console.log(err)
                        }
                    }).toBuffer()
                    .then((err:any,inf:any) => { 
                        compress = `compress-${onlyName}.webp`;
                    })
                }
                let data = [this.helpers.generateId(),typeFile.typeFile,filename,compress,mimetype,encoding,dir,size];

                const File = await pool.query(`
                INSERT INTO files(uuid,collection_name,file_name,compress,mime_type,encoding,dir,size) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE uuid=?,collection_name=?,file_name=?,compress=?,mime_type=?,encoding=?,dir=?,size=?`,
                [...data,...data],
                (err: any, results: any) => {
                    if (err) {
                        // console.log(err);
                        res.send(err);
                    }
                });
            })
            res.send(req.files)
           

        }catch(err){
            console.log(err)
            res.send(err)
        }
    }
    async getImages(req:Request,res:Response){
        let allimages;
        if(req.params.type == 'all'){
            allimages = await pool.query('SELECT * FROM `files` ORDER BY updated_at DESC ');
        }else{
            allimages = await pool.query('SELECT * FROM `files` WHERE `collection_name` = ? ORDER BY updated_at DESC ', [req.params.type]);
        }

        res.send(allimages)
    }
    async deleteFiles(req:Request,res:Response){
        try {
            const filesDeletes = await pool.query('DELETE FROM `files` WHERE uuid in (?)', [req.body.map((e:any)=>{ return e.uuid})]);
                await req.body.map((e:any)=>{ 
                    fs.existsSync(pathRoute.join(__dirname,`../public/${(e.dir.length > 0 ? e.dir+'/': '') + e.file_name}`)) && fs.unlinkSync(pathRoute.join(__dirname,`../public/images/${e.file_name}`));
                    if (e.compress != '') {
                        fs.existsSync(pathRoute.join(__dirname,`../public/${(e.dir.length > 0 ? e.dir+'/': '') + e.compress}`)) && fs.unlinkSync(pathRoute.join(__dirname,`../public/images/${e.compress}`));
                    }
                });
            res.send(filesDeletes);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    async compressImages(req:Request,res:Response){
        res.send(pathRoute.join(__dirname,"../public"))
    }
    async search(req:Request,res:Response){
        let search = `%${req.body.search}%`;
        await pool.query(`SELECT * FROM files WHERE file_name LIKE ?`, [search], (err: any, results: any) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.send(results);
        })

    }
    async mysql(req:Request,res:Response){
        const client = "mataqque";
        await pool.query(`SELECT email,nombre,apellido,telefono FROM t_clientes`, [client], (err: any, results: any) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            //convert to csv
            const fields = ['Email', 'First Name', 'Last Name', 'Phone Number'];
            let csv = results.map((e:any)=>{
                return Object.values(e)
            }) 
            let convert = csv.toString()
            res.send(results);
        })
    }
}