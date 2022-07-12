import { Router } from "express"
import nodemailer from 'nodemailer'
import { prisma } from "./prisma"

export const routes = Router()

//MAiltrap
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f4f02be34d91cb",
      pass: "710e57f9849d77"
    }
})

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Renan Souza <renan.souza@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({data: feedback})
})