import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedBackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProp {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}
export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProp) {

  const [screeshot, setScreenshot] = useState<string | null>(null) //screenshot
  const [comment, setComemnt] = useState('') //Comentário feedback
  const [isSendingFeedback, setIsSendingFeedback] = useState(false) //button loading
  
  const feedBackTypeInfo = feedBackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)
    
    //Send feedback
    await api.post('/feedbacks', {
      type: feedbackType,
      comment: comment,
      screenshot: screeshot
    })

    setIsSendingFeedback(false)
    onFeedbackSent()
  }
  
  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedBackTypeInfo.image.source}
            alt={feedBackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedBackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
          <textarea
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Conte com detalhes o que está acontecendo"
            onChange={event => setComemnt(event.target.value)}
          />

          <footer className="flex gap-2 mt-2">
              <ScreenShotButton screenshot={screeshot!} onScreenshotTook={setScreenshot}/>
              
              <button 
                type="submit"
                title="Enviar feedback"
                disabled={comment.length === 0 || isSendingFeedback}
                className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
              >
                  {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}

              </button>
          </footer>
      </form>
    </>
  );
}
