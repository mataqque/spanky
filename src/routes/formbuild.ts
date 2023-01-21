import { Router } from "express";
import { formbuildController } from "../controllers/formbuild/formbuild";
export class formbuild{
    public router:any;
    public formController: formbuildController = new formbuildController();
    constructor(){
        this.router = Router();
        this.routes()
    }
    private routes(){
        this.router.post("/upload",this.formController.update)
        this.router.get("/getform/:id",this.formController.getData)
        this.router.get("/getformlist",this.formController.getformlist)
        this.router.get("/delete/:id",this.formController.delete)
    }
}