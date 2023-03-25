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
            {"colors":"array"},
            {"quantity":"number"},
            {"price":"number"},
            {"discount":"number"},
            {"images":"array"},
            {"videos":"array"},
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
        try {            
            const { uuid_product, uuid_autor, name_product, description, id_empresa, id_category, id_subcategory, tags, season, gender, colors, quantity, price, discount, images, videos, url, status, index_page, meta_description, meta_keywords } = req.body;
            let data = [uuid_product, uuid_autor, name_product, description, id_empresa, id_category, id_subcategory, season, gender, quantity, price, discount, url, status, index_page, meta_description, meta_keywords]
            const insertProductQuery = `INSERT INTO sp_products (uuid_product, uuid_autor, name_product, description, id_empresa, id_category, id_subcategory, season, gender, quantity, price, discount, url, status, index_page, meta_description, meta_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE uuid_product=?, uuid_autor=?, name_product=?, description=?, id_empresa=?, id_category=?, id_subcategory=?, season=?, gender=?, quantity=?, price=?, discount=?, url=?, status=?, index_page=?, meta_description=?, meta_keywords=?`;  
            const insertProduct = await pool.promise().query(insertProductQuery, [...data,...data]);
            const removeImagesQuery = `DELETE FROM sp_products_images WHERE id_producto = ?`;
            const removeImages = await pool.promise().query(removeImagesQuery, [uuid_product]);
            const insertImagesQuery = `INSERT INTO sp_products_images (id_producto,id_image, orden) VALUES ?`;
            // get uuid from images
            const listImages:any = images.map((image:any,index:number) => {
                let array = [uuid_product,image.uuid,index];
                return array;
            });
            const insertImages = await pool.promise().query(insertImagesQuery, [listImages]);
            
            res.send(insertImages)
        } catch (error) {
            res.send(error)
        }

    }
    async getProducts(req: Request, res: Response){
        let data = await pool.query('SELECT * FROM sp_products;')
        let newData = await Promise.all(data.map(async(item: any) => {
            item.images = await pool.query(`SELECT 
            (SELECT files.file_name FROM files WHERE files.uuid = sp_products_images.id_image LIMIT 1) AS file_name,
            (SELECT files.dir FROM files WHERE files.uuid = sp_products_images.id_image LIMIT 1) AS dir,
            (SELECT files.collection_name FROM files WHERE files.uuid = sp_products_images.id_image LIMIT 1) AS collection_name,
            (SELECT files.compress FROM files WHERE files.uuid = sp_products_images.id_image LIMIT 1) AS compress
            FROM sp_products_images WHERE id_producto = ?`,[item.uuid_product])
            return item;
        }))

        // let data = [];
        // for(let i = 0; i < raw.length; i++){
        //     let imgsParse = JSON.parse(raw[i].images);
        //     if(imgsParse.length > 0){
        //         let images = await pool.query(`SELECT * FROM files WHERE uuid = ?`,[...imgsParse])
        //         raw[i].images = images
        //         data.push(raw[i])
        //     }
        // }
        res.send(newData)
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