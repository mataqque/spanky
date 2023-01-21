import {Request, Response,Router} from 'express';
import { listController } from '../controllers/list/list';
const passport = require('passport');

export class listRoute {
    public router: any;
    public listController: listController = new listController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/updateLinks", this.listController.updateLinks);
        this.router.post("/updateLinksChild", this.listController.updateLinksChild);
        this.router.get("/getAllLinks", this.listController.getAllLinks);
        this.router.get("/deleteGroup/:uuid", this.listController.deleteGroup);
        this.router.get("/home", this.listController.home);
    }
}