import {Request, Response} from 'express';
import { ComplaintMail } from '../mails/ComplaintMail';
import { MailService } from '../services/http/MailService';

export class complaintsController {
    async save(req: Request, res: Response) {
        const book = req.body.data

        try {
            const mailservice = new MailService()
            mailservice.from(`Web Ativa <no-reply@ativa.com.pe>`)
                .to("comercial@ativa.com.pe")
                .subject("Nuevo libro de reclamaciones")
                .html(ComplaintMail(book))
            
            await mailservice.send()
            
            res.status(201).send({book: book})
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Oh uh, something went wrong"})
        }
    }
}