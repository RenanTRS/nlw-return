import { CloseButton } from "./CloseButton";

import bugImgUrl from '../assets/bug.svg'
import ideaImgUrl from '../assets/idea.svg'
import thoughtImgUrl from '../assets/thought.svg'
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
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            Hello World
        </div>
    )
}