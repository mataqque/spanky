import { Router } from 'express';
import {Request, Response} from 'express';
import { authPanelController } from '../controllers/auth/authController';
const passport = require('passport');

export class authRoute {
    public router: any;
    public authPanelController: authPanelController = new authPanelController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/",(req: Request, res: Response) => {
            // res.send("Hello World");
        });
        this.router.post("/validationToken",this.authPanelController.validate);
    }
}

