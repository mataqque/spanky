import { Router } from 'express';
import { complaintsController } from '../controllers/complaints';

export class complaintsRoute {
    public router: any;
    public complaintsController: complaintsController = new complaintsController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/", ()=>{
            
        });
    }
}