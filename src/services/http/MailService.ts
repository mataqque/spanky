import axios from "axios";
import FormData from "form-data";

export class MailService {
    mailgun: any;
    payload: any;
    constructor() {
        this.payload = new FormData()
        this.mailgun = axios.create({
            baseURL: "https://api.mailgun.net/v3/mg.formulaperu.com",
            headers: { 
                ...this.payload.getHeaders()
            },
            auth: {
                username: 'api',
                password: 'key-2f8526fda8b88fce4bc2fd3f1858cca7'
            }
        })
    }

    from(from: string) {
        this.payload.append("from", from)
        return this
    }

    to(to: string) {
        this.payload.append("to", to)
        return this
    }

    subject(subject: string) {
        this.payload.append("subject", subject)
        return this
    }

    html(html: string) {
        this.payload.append("html", html)
        return this
    }

    attachment(attachment: any) {
        this.payload.append("attachment", attachment)
        return this
    }

    send() {
        return this.mailgun.post('messages', this.payload)
    }
}