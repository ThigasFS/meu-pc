import {
    extrairCapacidadeRAM,
    extrairDDR,
    extrairModulosRAM,
    extrairVelocidadeRAM,
    extrairCL
} from "../utils/componenteUtils"

export function ramCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const capacidadeBuscada =
        extrairCapacidadeRAM(nomeBuscado)

    const capacidadeEncontrada =
        extrairCapacidadeRAM(nomeEncontrado)

    if (
        capacidadeBuscada !==
        capacidadeEncontrada
    ) {
        return false
    }

    const velocidadeBuscada =
        extrairVelocidadeRAM(nomeBuscado)

    const velocidadeEncontrada =
        extrairVelocidadeRAM(nomeEncontrado)

    if (
        velocidadeBuscada &&
        velocidadeEncontrada &&
        velocidadeBuscada !==
        velocidadeEncontrada
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

    const clBuscado =
        extrairCL(nomeBuscado)

    const clEncontrado =
        extrairCL(nomeEncontrado)

    if (
        clBuscado &&
        clEncontrado &&
        clBuscado !== clEncontrado
    ) {
        return false
    }

    const modulosBuscados =
        extrairModulosRAM(nomeBuscado)

    const modulosEncontrados =
        extrairModulosRAM(nomeEncontrado)

    if (
        modulosBuscados.length &&
        modulosEncontrados.length
    ) {

        if (
            modulosBuscados[0] !==
            modulosEncontrados[0]
        ) {
            return false
        }

        if (
            modulosBuscados[1] !==
            modulosEncontrados[1]
        ) {
            return false
        }
    }

    return true
}