const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export class mailService{
    email: any;
    constructor(){
        
    }
    async sendMail(){
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {},
            user: "",
         })
    }
}
