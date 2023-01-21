import { Router } from 'express';
import { pagesController } from '../controllers/pages/pagesController'
const passport = require('passport');

export class pageRoute {
    public router: any;
    public pagesController: pagesController = new pagesController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/createPage",this.pagesController.addPage);
        this.router.get("/getPages",this.pagesController.getPages);
        this.router.get("/getPage/:id",this.pagesController.getPage);
        this.router.post("/deletePage/:id",this.pagesController.deletePage);
    }
}

