import { Request,Response,Router } from "express"
import { productsController } from "../controllers/products/productsController";

export class productsRouter{
    public router;
    public productController: productsController;
    constructor(){
        this.productController = new productsController();
        this.router = Router()
        this.routes()
    }
    routes(){
        this.router.post('/add',this.productController.add)
        this.router.get('/getProducts',this.productController.getProducts)
        this.router.get('/getProduct/:id',this.productController.getProduct)
    }
}