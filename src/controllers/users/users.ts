import {Request, Response} from 'express';
import { pool } from '../../database/database';
import { Manage_token }  from "../../utilities/jwt.utilities";
import {constantAnswer} from "../../utilities/constanst"
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

export class usersController{

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
        await pool.query(`
            SELECT uuid_user,username,name,lastname,address,phone,email,status,password,
            (SELECT if(files.compress,files.compress,files.file_name) FROM files WHERE files.id = users.id_photo_perfil) as photo,
            (SELECT user_roles.rol FROM user_roles WHERE user_roles.id = users.id_role) as role FROM users  WHERE ( username = ? );
            `,[username],async (err:any, results:any, field:any)=>{
                console.log(results);
                try{
                    if(err){
                        res.status(401)
                    }
                    if(results.length > 0){
                        const match = await bcrypt.compare(password, results[0].password);
                        console.log(match)
                        if(match){
                            delete results[0].password
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
    async getUsers(req:Request,res:Response){
        try {
            const users = await pool.query(`
            SELECT uuid_user,username,name,lastname,address,phone,email,status,created_at,
            (SELECT if(files.compress,files.compress,files.file_name) FROM files WHERE files.id = users.id_photo_perfil) as photo,
            (SELECT user_roles.rol FROM user_roles WHERE user_roles.id = users.id_role) as role FROM users;
            `);
            res.send(users)
        } catch (error) {
            res.status(500)
        }
    }
    async getUser(req:Request,res:Response){
        try {
            const user = await pool.query(`
            SELECT username,name,lastname,address,phone,email,status,created_at,uuid_user,id_photo_perfil,id_role,
            (SELECT if(files.compress,files.compress,files.file_name) FROM files WHERE files.id = users.id_photo_perfil) as photo,
            (SELECT user_roles.rol FROM user_roles WHERE user_roles.id = users.id_role) as role FROM users WHERE users.uuid_user = ?;
            `, [req.params.user]);
            res.send(user)
        } catch (error) {
            res.status(500)
        }
    }
    async updateUser(req:Request,res:Response){
        try {
            const {uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role} = req.body
            const data = [uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role]
            const changeUserData = await pool.query(`
            INSERT INTO users (uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role) VALUES (?,?,?,?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE uuid_user=?,username=?,name=?,lastname=?,address=?,phone=?,email=?,id_photo_perfil=?,id_role=?`, [...data, ...data]);

            res.send(changeUserData)
        } catch (error) {
            res.status(500)
        }
    }
    
}