import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f4f02be34d91cb",
      pass: "710e57f9849d77"
    }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Renan Souza <renan.souza@gmail.com>',
            subject: subject,
            html: body
        })
    };
}