import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//Spys
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

//Mock 
const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,jdksljflaj'
        })).resolves.not.toThrow() //Espera resolver sem encontrar um erro

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64fklajsdkj'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64kfjalksdj'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: '123'
        })).rejects.toThrow()
    })
})