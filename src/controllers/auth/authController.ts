import {Request, Response} from 'express';
import { pool } from '../../database/database';
import { Manage_token }  from "../../utilities/jwt.utilities";
import {constantAnswer} from "../../utilities/constanst"
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

export class authPanelController{
    public num:any;
    public connection:any;
    constructor(){
        this.connection = pool;
        this.num = 0;
        this.login = this.login.bind(this);
    }
    route(){
        
    }
    async login(req:Request,res:Response){
        interface Post {
            username: string,
            password: string
        }

        const errors = validationResult(req);
        const { username , password } : Post = req.body;
        if(!errors.isEmpty()){
            res.send(errors)
        }else{
            await pool.query(`SELECT * FROM users WHERE ( username = ? )`,[username],async (err:any, results:any, field:any)=>{
                try{
                    if(err){
                        res.status(401)
                    }
                    if(results.length > 0){
                        const match = await bcrypt.compare(password, results[0].password);    
                        if(match){
                            let token = await Manage_token.sign(JSON.stringify(results[0]))
                            res.send({type:true,token:token,status:200})
                        }else{
                            res.send({type:false,token:null})
                        }
                    }
                    if(results.length == 0){
                        res.send({result:constantAnswer.USERNAME_PASSWORD_COMBINATION_ERROR,status:401,type:false})
                    }
                }catch(err:any){
                    return err
                }
            });
        }
    }
    async validate(req:Request,res:Response){
        let { token } = req.body
        let verify = await Manage_token.verify(token);
        if(verify){
            let dataSet = Manage_token.parse(token);
            res.send({token:true,dataSet:dataSet})
        }else{
            res.send({token:false })
        }
    }
}
