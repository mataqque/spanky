import {Request, Response} from 'express';
import { Lead } from '../../entity/Lead';
import { SperantService } from '../../services/http/SperantService';

export class leadsController {
    async list(req: Request, res: Response) {

    }

    async details(req: Request, res: Response) {

    }

    async save(req: Request, res: Response) {
        const {fname, lname, email, phone, rooms_amount, motive, message, promo, url_query} = req.body.data

        try {
            const lead = new Lead()
            lead.fname = fname
            lead.lname = lname
            lead.email = email
            lead.phone = phone
            lead.rooms_amount = rooms_amount
            lead.motive = motive

            const saved = await lead.save()

            const client = {
                "fname": fname,
                "lname": lname,
                "email": email,
                "main_telephone": phone,
                "interest_type_id": 4,
                "project_related": 17,
                "input_channel_ids": 4,
                "source_id": 85,
                "observation": [
                    rooms_amount && `Dormitorios: ${rooms_amount}`,
                    motive && `Motivo: ${motive}`,
                    message && `Mensaje: ${message}`,
                    promo && `Promoción: ${promo}`,
                ].filter(Boolean).join(", ")
            }

            if(promo?.toLowerCase() === "descuentos de feria"){
                client.source_id = 86
            }

            const _sperantService = new SperantService()
            _sperantService.captationWays(url_query, {
                "google|adwords|googleads|gclid|cpc": 59, // Google Ads
                "facebook|fbclid|pixel": 51, // facebook
                "icommarketing|mailchimp|mail": 27, // mailing
            })

            const {data: {client: sperantClient}} = await _sperantService.setClient(client).create()

            // console.log(sperantClient.seller
            //             .filter((s:any) => s.phone !== null && s.phone !==""))
            
            // .forEach((seller, i)=>{
            //     if(seller.phone){
            //         seller.phone.replace(/\s/g, '');
            //         return
            //     }
            // })

            const date = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            const axios = require("axios")
            axios.post("https://script.google.com/macros/s/AKfycbws7GCpc1eEN5ScQ_IisUkLEwKQHvY_XCe5_KEbXA3ytUWVtA/exec", {
                "ss_id": "1CfCxJdJJDWvfmixvX7AdowGGq_LfiBuP823m4Ryj3YA",
                "range": "Ativa!A:XX",
                "values": [[date, fname, lname, phone, email, client.observation, promo]]
            })
            
            res.status(201).send({lead: saved})
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Oh uh, something went wrong"})
        }
    }
}