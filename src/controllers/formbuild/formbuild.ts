import {Request, Response} from 'express';
import { pool } from '../../database/database';

export class formbuildController{
   
    async update(req:Request,res:Response) {
        console.log(req.body)
        const {uuid_form,enable,title_form,mailto,subject,message,baseurl,items} = req.body.data
        let newItems = JSON.stringify(items)
        let createDataQuery = [uuid_form,title_form,mailto,subject,enable,baseurl,message,newItems]
        let query = await pool.query(`INSERT INTO sp_customform (uuid_form,title_form,mailto,subject,enable,baseurl,message,data) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE  
        uuid_form=?,title_form=?,mailto=?,subject=?,enable=?,baseurl=?,message=?,data=?
        `,[...createDataQuery,...createDataQuery]);
        res.send(req.body)
    }
    async getData(req:Request,res:Response) {
        let uuid = req.params.id
        let data = await pool.query(`SELECT * FROM sp_customform WHERE uuid_form = ?`,[uuid]);
        if(data.length > 0){
            data[0].enable = data[0].enable == 1 ? true : false
        }
       
        res.send(data[0])
    }
    
    async getformlist(req:Request,res:Response) {
        let data = await pool.query(`SELECT * FROM sp_customform`);
        res.send(data)
    }
    async delete(req:Request,res:Response) {
        let data = await pool.query(`DELETE FROM sp_customform WHERE uuid_form = ?`,[req.params.id]);
        res.send(data)
    }
}