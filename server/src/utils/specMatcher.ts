import { normalizarTexto } from "./componenteUtils"

export function encontrarProdutoBase<T>(
    nome: string,
    base: T[],
    campo: keyof T
): T | undefined {

    const nomeNormalizado =
        normalizarTexto(nome)

    return base.find(item => {

        const valor =
            String(item[campo])

        const valorNormalizado =
            normalizarTexto(valor)

        return (
            nomeNormalizado.includes(valorNormalizado) ||
            valorNormalizado.includes(nomeNormalizado)
        )
    })
}