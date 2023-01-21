import { Router } from "express";
import {webHookController} from '../controllers/webhook/webhook'

export class webhookRoute{
    public router:Router;
    public webHook:webHookController = new webHookController();
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/whatsapp',this.webHook.whatsapp);
    }
}