import { Router } from 'express';
import { pool } from '../database/database';

export class generateRoute {
    public router: any;
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/", (req: any, res: any) => {
            const {uuid,collection_name,file_name,mime_type,custom_properties,coding,path,responsive_images,size} = req.body;
            let data = [uuid,collection_name,file_name,mime_type,custom_properties,coding,path,responsive_images,size];

            pool.query(`
            INSERT INTO files(uuid,collection_name,file_name,mime_type,custom_properties,coding,path,responsive_images,size) VALUES(?,?,?,?,?,?,?,?,?)
             ON DUPLICATE KEY UPDATE uuid=?,collection_name=?,file_name=?,mime_type=?,custom_properties=?,coding=?,path=?,responsive_images=?,size=?`,
            [...data,...data],
            (err: any, results: any) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(results);
                }
            });
        });
    }
}