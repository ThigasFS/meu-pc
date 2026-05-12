import {
    extrairModeloCPU,
    normalizarTexto
} from "../utils/componenteUtils"

export function cpuCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const modeloBuscado =
        extrairModeloCPU(nomeBuscado)

    const modeloEncontrado =
        extrairModeloCPU(nomeEncontrado)

    if (!modeloBuscado || !modeloEncontrado) {
        return false
    }

    return (
        normalizarTexto(modeloBuscado) ===
        normalizarTexto(modeloEncontrado)
    )
}