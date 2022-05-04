import { CloseButton } from "../CloseButton";

import bugImgUrl from '../../assets/bug.svg'
import ideaImgUrl from '../../assets/idea.svg'
import thoughtImgUrl from '../../assets/thought.svg'
import { useState } from "react";

const feedBackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImgUrl,
            alt: "Image de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImgUrl,
            alt: "Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImgUrl,
            alt: "Imagem de um balão de pensamento"
        }
    }
}
type FeedbackType = keyof typeof feedBackTypes //Tipagem para o estado saber as chaves do objeto

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
                
                <CloseButton />
            </header>
            
            {!feedbackType ? (
                <div className="flex py-8 gap-2 w-full">
                    { Object.entries(feedBackTypes).map(([index, value])=>{
                        return (
                            <button
                                key={index}
                                className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                                onClick={() => setFeedbackType(index as FeedbackType)} //Err Argument of type string is not assignable to parameter of type
                                type="button"
                            >
                                <img src={value.image.source} alt={value.image.alt} />
                                
                                <span>{value.title}</span>
                            </button>
                        )
                    }) }
                </div>
            ):(
                <p>Hello World</p>
            ) }

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank">Rocketseat</a>
            </footer>
        </div>
    )
}