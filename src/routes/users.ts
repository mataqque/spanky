import {Request, Response,Router} from 'express';
import { usersController } from '../controllers/users/users';
const passport = require('passport');

export class usersRoute {
    public router: any;
    public usersController: usersController = new usersController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/verifyUser", this.usersController.login);
        this.router.post("/registerUser", passport.authenticate('register', {passReqToCallback: true}), (req: Request, res: Response) => {
            console.log(req.body)
        });
        this.router.post("/updateUser", this.usersController.updateUser);
        this.router.get("/getUsers", this.usersController.getUsers);
        this.router.get("/getUser/:user", this.usersController.getUser);
    }
}