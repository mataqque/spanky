import {Request, Response,Router} from 'express';
import { Client, LocalAuth } from "whatsapp-web.js";
import { Socket } from "socket.io";
const QRCode = require("qrcode");

export default class WhatsappService extends Client{
    public socket: any;
    public router:Router;
    constructor() {
        super({
            authStrategy: new LocalAuth({ clientId: "client-one" }),
            puppeteer: { headless: true },
        });
        console.log('init bot service');
        this.start = this.start.bind(this);
        this.router = Router();
        this.initialize();
        this.on("ready", (event:any) => {
            console.log("LOGIN_SUCCESS",event);
        });
        // this.socket = this.router.
    }
    async start(req:Request,res:Response){
       
        this.on("auth_failure", () => {
            console.log("LOGIN_FAIL");
        });
        this.on('message', message => {
            req.app.get("socketio").emit("qrimg", message);
        });
         
        this.on("qr", (qr) => {
            QRCode.toDataURL(qr, function (err:any, url:any) {
                req.app.get("socketio").emit("qrimg", url);
            })
        });
        this.on('authenticated', (session:any) => {    
            console.log(session);
            // req.app.get("socketio").emit("message", JSON.stringify(session));
            // Save the session object however you prefer.
            // Convert it to json, save it to a file, store it in a database...
        });
         
    }
    async close(req:Request,res:Response){
        this.destroy();
    }
    async sendMsg(msg:string,res:Response):Promise<any>{
        this.sendMessage("51936087701@c.us", msg).then((response:any) => {
            res.send('message sended');
        });
    }
   
} 