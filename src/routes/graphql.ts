import {Request, Response} from 'express';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql'
 import {Schema} from '../models/Schema'

export class graphqlRouter{
    public router: any;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes(){
        // this.router.get("/",(req:Request,res:Response)=>{
        //     res.json({status:200})
        // })
        this.router.use("/",graphqlHTTP({
            graphiql:true,
            schema:Schema,
        }))
    }
}