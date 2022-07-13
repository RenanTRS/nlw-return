import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbakcsRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}
    async execute(req: SubmitFeedbackUseCaseRequest) {
        const {type, comment, screenshot} = req

        //Regras de negócio
        if(!type){
            throw new Error('Type is required')
        }
        if(!comment){
            throw new Error('Comment is required')
        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            //se existir screenshot e ela não começar com data:image/png;base64
            throw new Error('Invalid screenshot.')
        }

        await this.feedbakcsRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img style="width:80%" src="${screenshot}">` : ``,
                `</div>`
            ].join('\n')
        })

        return {type, comment, screenshot}
    }
}