import {Request, Response} from 'express';
import { pool } from '../../database/database';

export class listController{
    async updateLinks(req:Request,res:Response){
        let error;
        var newData = await req.body.map(async(item:any) => {
            let data = await pool.query('INSERT INTO linkfather (uuid_link,name) VALUES (?,?) ON DUPLICATE KEY UPDATE uuid_link=?,name=?;',[
                item.uuid_link,
                item.name,
                item.uuid_link,
                item.name
            ]);
            console.log('that item',item)
            let dataChild = await item?.links.map(async(linksChild:any)=>{
                console.log('child',linksChild)
                let datasubLinks = await pool.query('INSERT INTO links (uuid,order_id,name,url,icon,class_css,type,uuid_father) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE uuid=?,order_id=?,name=?,url=?,icon=?,class_css=?,type=?,uuid_father=?;',[
                    linksChild.uuid,
                    linksChild.order_id,
                    linksChild.name,
                    linksChild.url,
                    linksChild.icon,
                    linksChild.class_css,
                    linksChild.type,
                    item.uuid_link,
                    linksChild.uuid,
                    linksChild.order_id,
                    linksChild.name,
                    linksChild.url,
                    linksChild.icon,
                    linksChild.class_css,
                    linksChild.type,
                    item.uuid_link,
                ],(err:any,results:any)=>{
                    console.log(results)
                    if(err){
                        error = err
                        console.log(err)
                    }
                });
            })
        });
        
        res.send(req.body)
        // res.send(error=='' ? error : 'success')
    }
    async updateLinksChild(req:Request,res:Response){
        const {uuid,order_id,name,url,icon,type,class_css,uuid_father} = req.body
        let data = await pool.query('INSERT INTO links (uuid,order_id,name,url,icon,class_css,type,uuid_father) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE uuid=?,order_id=?,name=?,url=?,icon=?,class_css=?,type=?,uuid_father=?;',
        [ uuid,order_id,name,url,icon,class_css,type,uuid_father,uuid,order_id,name,url,icon,class_css,type,uuid_father ],(err:any,results:any)=>{
            if(err){
                res.send(err)
            }else{
                res.send(results)
            }
        });

    }
    async getAllLinks(req:Request,res:Response){
        const allLinkFather = await pool.query('SELECT * FROM linkfather');
        
        const dataSubLinks = await allLinkFather.map(async(item:any)=>{
            let links = await pool.query('SELECT * FROM links WHERE uuid_father = ? ORDER BY order_id ASC',item.uuid_link);
            item.links = await links;
            return item;
        })
        let data = await Promise.all(dataSubLinks);
        res.send(data)

    }
    async getLinks(req:Request,res:Response){
        const {type} = req.body
        const allLinks = await pool.query('SELECT * FROM linkfather WHERE type = ?',type);
        res.send(allLinks)
    }
    async deleteGroup(req:Request,res:Response){
        const {uuid} = req.params
        const deleteGroup = await pool.query('DELETE FROM linkfather WHERE uuid_link = ?',uuid);
        res.send(deleteGroup)
    }
    async home(req:Request,res:Response){
        var Home = {header:{links:{}},body:{},footer:{logo:{},links:{}},};
        // let footer = await pool.query('SELECT * FROM links WHERE type = "footer"');
        // let header = await pool.query('SELECT * FROM links WHERE type = "header"');
        // Home.footer.links = await footer;
        // Home.header.links = await header;
        res.send(Home)
    }
}