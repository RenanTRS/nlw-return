import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbakcsRepository: FeedbacksRepository
    ){}
    async execute(req: SubmitFeedbackUseCaseRequest) {
        const {type, comment, screenshot} = req

        await this.feedbakcsRepository.create({
            type,
            comment,
            screenshot
        })
        return {type, comment, screenshot}
    }
}