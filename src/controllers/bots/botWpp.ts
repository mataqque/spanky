
import {Request, Response} from 'express';
// import WhatsappService from '../../services/bots/botWhatsapp'

export class botWppController {
    public router: any;
    // public bot: WhatsappService;
    constructor() {
        console.log('init bot controller');
        // this.login = this.login.bind(this);
        // this.sendMessage = this.sendMessage.bind(this);
        // this.bot = new WhatsappService();
    }
    // public async login(req:Request,res:Response){
    //     this.bot.start(req,res);
    //     res.send("QR PROCCESING");
    // }
    // async sendMessage(req:Request,res:Response) {
    //     await this.bot.sendMsg(req.body.msg,res);
    // }
}
