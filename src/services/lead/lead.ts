const { google } = require("googleapis");
import {Request, Response} from 'express';
import { Router } from 'express';
import path from 'path';
import { leadSheetsController } from '../../controllers/leads/leadSheets';

export class leadSheetsService{
    public router: any;
    public leadsController: leadSheetsController = new leadSheetsController();
    constructor(){

    }
    async saveLead(req:Request,res:Response){
        const DATA_ENTRIES = Object.values(req.body);
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, '../../config/credentials.json'),
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1rMfk72Of1YM8Kue6cYPGVCeBYDFczpRIqcGv2OINITY";
        const metaData = await googleSheets.spreadsheets.get({auth,spreadsheetId});
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A:G",
        });
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
            values: [DATA_ENTRIES],
            },
        });
        
        res.status(200).send(DATA_ENTRIES);
    }
} 