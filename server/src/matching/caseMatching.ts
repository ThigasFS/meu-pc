import {
    normalizarTexto
} from "../utils/componenteUtils"

export function caseCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const buscado =
        normalizarTexto(nomeBuscado)

    const encontrado =
        normalizarTexto(nomeEncontrado)

    const palavras =
        buscado
            .split(" ")
            .filter(p => p.length >= 3)

    const acertos =
        palavras.filter(p =>
            encontrado.includes(p)
        )

    return (
        acertos.length >=
        Math.ceil(
            palavras.length * 0.7
        )
    )
}