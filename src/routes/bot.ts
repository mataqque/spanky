import {Request, Response, Router} from 'express';
import { botWppController } from '../controllers/bots/botWpp';

export class botWppRoute{
    public router: any;
    // public botWppController: botWppController = new botWppController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        // this.router.get('/login',this.botWppController.login);
        // this.router.post('/prove',this.botWppController.sendMessage);
    }
}