import { Request,Response,Router } from "express"
import { pool } from '../../database/database';

export class productsController{
    public router: Router;
    public schema: any;
    constructor(){
        this.add = this.add.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.schema = [
            {"uuid_product": "string"},
            {"uuid_autor": "string"},
            {"name_product": "string"},
            {"description": "string"},
            {"id_empresa": "number"},
            {"id_category": "number"},
            {"id_subcategory": "number"},
            {"season":"string"},
            {"gender":"string"},
            {"colors":"string"},
            {"quantity":"number"},
            {"price":"number"},
            {"discount":"number"},
            {"url":"string"},
            {"status":"string"},
            {"index_page":"number"},
            {"meta_description":"string"},
            {"meta_keywords":"string"}
        ]
    }
    async returnValidation(data: any){
        
    }
    async add(req: Request, res: Response){
        
        let data = this.schema.map((item: any) => {
            if(item[Object.keys(item)[0]] == "array"){
                let images = req.body[Object.keys(item)[0]].map((item: any) => {
                    return item.uuid
                })
                return JSON.stringify(images)
            }
            let newArray = req.body[Object.keys(item)[0]]
            return newArray;
        })
        let raw = await pool.query(`
        INSERT INTO sp_products (${this.schema.map((e:any)=>{return Object.keys(e)}).join(',')}) VALUES(${this.schema.map((e:any,i:any)=>`?`).join(',')}) 
        ON DUPLICATE KEY UPDATE  ${this.schema.map((e:any)=>{return Object.keys(e)+"=?"}).join(',')}`,[...data,...data],async (err: any, result: any) => {
            if(err) res.send(err);
            res.send(result)
        })
        
    }
    async getProducts(req: Request, res: Response){
        // let raw = await pool.query('SELECT *,(SELECT JSON_OBJECT("first_name",users.name,"last_name",users.lastname) FROM users WHERE P.uuid_autor = users.uuid_user) AS autor FROM sp_products AS P',[])
        let data = [];
        // for(let i = 0; i < raw.length; i++){
        //     let imgsParse = JSON.parse(raw[i].images);
        //     if(imgsParse.length > 0){
        //         let images = await pool.query(`SELECT * FROM files WHERE uuid = ?`,[...imgsParse])
        //         raw[i].images = images
        //         data.push(raw[i])
        //     }
        // }
        res.send([])
    }
    async getProduct(req: Request, res: Response){
        let id = req.params.id
        await pool.query('SELECT * FROM sp_products as P WHERE uuid_product = ?;',[id],async (err: any, result: any)=>{
            if(err) res.send(err);
            let newResult = result[0]
            this.schema.map((item: any) => {
                if(item[Object.keys(item)[0]] == "array"){
                    newResult[Object.keys(item)[0]] = JSON.parse(newResult[Object.keys(item)[0]])
                }
            })

            if(newResult.images.length > 0){
                let images = await pool.query(`SELECT * FROM files WHERE uuid = ?`,[...newResult.images])
                newResult.images = images
                res.send(newResult)
            }else{
                res.send(newResult)
            }
        });
    }
}