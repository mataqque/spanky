import {Request, Response} from 'express';
import { pool } from '../../database/database';

export class pagesController{
    async addPage(req:Request,res:Response) {
        const { uuid,title,url,category,tag,visibility,datahtml} = req.body
        let data =  await pool.query(`
            INSERT INTO sp_page (uuid,title,url,category,tag,visibility,datahtml) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE
            uuid=?,title=?,url=?,category=?,tag=?,visibility=?,datahtml=?
        `,
        [
            uuid,title,url,category,tag,visibility,datahtml,uuid,title,url,category,tag,visibility,datahtml
        ],(err:any,results:any)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send('success!');
            }
        }
        )
    }
    async getPages(req:Request,res:Response) {
        let data = await pool.query(`SELECT * FROM sp_page`);
        res.send(data)
    }
    async getPage(req:Request,res:Response) {
        let uuid = req.params.id
        let data = await pool.query(`SELECT * FROM sp_page WHERE uuid = ?`,[uuid]);
        res.send(data[0])
    }
    async deletePage(req:Request,res:Response) {
        let uuid = req.params.id
        let data = await pool.query(`DELETE FROM sp_page WHERE uuid = ?`,[uuid]);
        res.send("OK").status(200)
    }
}


// INSERT INTO sp_page (uuid,title,url,category,tag,visibility,datahtml) VALUES ('1ae','2','3','3','3','3','3',"4") ON DUPLICATE KEY UPDATE
//             uuid=?,title=?,url=?,category=?,tag=?,visibility=?,datahtml