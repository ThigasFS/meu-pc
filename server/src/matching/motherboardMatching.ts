import {
    definirChipset,
    extrairDDR,
    normalizarTexto
} from "../utils/componenteUtils"

export function motherboardCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const chipsetBuscado =
        definirChipset(nomeBuscado)

    const chipsetEncontrado =
        definirChipset(nomeEncontrado)

    if (
        chipsetBuscado !==
        chipsetEncontrado
    ) {
        return false
    }

    const ddrBuscado =
        extrairDDR(nomeBuscado)

    const ddrEncontrado =
        extrairDDR(nomeEncontrado)

    if (
        ddrBuscado &&
        ddrEncontrado &&
        ddrBuscado !== ddrEncontrado
    ) {
        return false
    }

    return (
        normalizarTexto(nomeEncontrado)
            .includes(
                normalizarTexto(
                    chipsetBuscado
                )
            )
    )
}