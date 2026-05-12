import {
    extrairCapacidadeStorage,
    extrairInterfaceStorage,
    extrairTipoStorage,
    normalizarTexto
} from "../utils/componenteUtils"

export function storageCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const capacidadeBuscada =
        extrairCapacidadeStorage(
            nomeBuscado
        )

    const capacidadeEncontrada =
        extrairCapacidadeStorage(
            nomeEncontrado
        )

    if (
        capacidadeBuscada &&
        capacidadeEncontrada &&
        capacidadeBuscada !==
        capacidadeEncontrada
    ) {
        return false
    }

    const interfaceBuscada =
        extrairInterfaceStorage(
            nomeBuscado
        )

    const interfaceEncontrada =
        extrairInterfaceStorage(
            nomeEncontrado
        )

    if (
        interfaceBuscada !==
        interfaceEncontrada
    ) {
        return false
    }

    const tipoBuscado =
        extrairTipoStorage(
            nomeBuscado
        )

    const tipoEncontrado =
        extrairTipoStorage(
            nomeEncontrado
        )

    if (
        tipoBuscado !== tipoEncontrado
    ) {
        return false
    }

    const buscado =
        normalizarTexto(nomeBuscado)

    const encontrado =
        normalizarTexto(nomeEncontrado)

    const palavrasImportantes =
        buscado
            .split(" ")
            .filter(p => p.length >= 4)

    const acertos =
        palavrasImportantes.filter(p =>
            encontrado.includes(p)
        )

    return (
        acertos.length >=
        Math.ceil(
            palavrasImportantes.length * 0.7
        )
    )
}