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
                `</div>`
            ].join('\n')
        })
        
        return {type, comment, screenshot}
    }
}