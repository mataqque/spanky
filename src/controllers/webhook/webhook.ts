var token = process.env.TOKEN || 'token';
import {Request, Response} from 'express';
export class webHookController{
    constructor(){

    }
    public async whatsapp(req:Request,res:Response){
        if (
            req.query['hub.mode'] == 'subscribe' &&
            req.query['hub.verify_token'] == '677940047240369'
        ){
            res.send(req.query['hub.challenge']);
        }else {
            res.sendStatus(400);
        }
    }
}