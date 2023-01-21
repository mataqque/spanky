import {Request, Response} from 'express';
export class leadSheetsController{
    constructor(){

    }
    async saveLead(req:Request,res:Response){
        
        res.send("saveLead");
    }
} 