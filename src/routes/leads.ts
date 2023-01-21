import { Router } from 'express';
import {Request, Response} from 'express';
import {leadSheetsService} from '../services/lead/lead'
export class leadRoute {
    public router: any;
    public leadSheetsService: leadSheetsService = new leadSheetsService();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/saveLead", this.leadSheetsService.saveLead);
        // this.router.post("/saveLead", (req:Request,res:Response)=>{
        //     res.send("ok")
        // });
    }
}