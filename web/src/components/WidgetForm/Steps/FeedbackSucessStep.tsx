import { CloseButton } from "../../CloseButton";
import sucessImg from '../../../assets/sucess.svg'

interface FeedSucessTypeStepProp {
    onFeedbackRestartRequested: () => void;
}
export function FeedSucessTypeStep({onFeedbackRestartRequested}:FeedSucessTypeStepProp) {
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]">
                <img src={sucessImg} alt="Imagem de confirmação" />

                <span className="text-xl mt-2">Agradecemos o feedback!</span>

                <button 
                    type="button"
                    title="Enviar outro feedback"
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onFeedbackRestartRequested}
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    )
}