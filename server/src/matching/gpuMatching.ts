import {
    extrairModeloGPU,
    extrairVRAM,
    extrairGddr
} from "../utils/componenteUtils"

export function gpuCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const modeloBuscado =
        extrairModeloGPU(nomeBuscado)

    const modeloEncontrado =
        extrairModeloGPU(nomeEncontrado)

    if (
        modeloBuscado !== modeloEncontrado
    ) {
        return false
    }

    const vramBuscada =
        extrairVRAM(nomeBuscado)

    const vramEncontrada =
        extrairVRAM(nomeEncontrado)

    if (
        vramBuscada &&
        vramEncontrada &&
        vramBuscada !== vramEncontrada
    ) {
        return false
    }

    const gddrBuscada =
        extrairGddr(nomeBuscado)

    const gddrEncontrada =
        extrairGddr(nomeEncontrado)

    if (
        gddrBuscada &&
        gddrEncontrada &&
        gddrBuscada !== gddrEncontrada
    ) {
        return false
    }

    return true
}