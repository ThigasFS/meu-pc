import {
    extrairCapacidadeRAM,
    extrairChipset,
    extrairClockRAM,
    extrairDDRRAM,
    extrairGddr,
    extrairModeloCPU,
    extrairModeloGPU,
    extrairModulosRAM
} from "../utils/componenteUtils"
import { matchStorage } from "./storageMatching"

function normalizar(texto: string): string {
    return texto
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
}

function matchCPU(
    buscado: string,
    encontrado: string
): boolean {
    return (
        extrairModeloCPU(buscado) ===
        extrairModeloCPU(encontrado)
    )
}

function matchGPU(
    buscado: string,
    encontrado: string
): boolean {
    return (
        extrairModeloGPU(buscado) ===
            extrairModeloGPU(encontrado) &&
        extrairGddr(buscado) ===
            extrairGddr(encontrado)
    )
}

function matchRAM(
    buscado: string,
    encontrado: string
): boolean {

    const capacidadeMatch =
        extrairCapacidadeRAM(buscado) ===
        extrairCapacidadeRAM(encontrado)

    const clockMatch =
        extrairClockRAM(buscado) ===
        extrairClockRAM(encontrado)

    const ddrMatch =
        extrairDDRRAM(buscado) ===
        extrairDDRRAM   (encontrado)

    const modulosBuscado =
        extrairModulosRAM(buscado)

    const modulosEncontrado =
        extrairModulosRAM(encontrado)

    const moduloMatch =
        modulosBuscado[0] === modulosEncontrado[0] &&
        modulosBuscado[1] === modulosEncontrado[1]

    return (
        capacidadeMatch &&
        clockMatch &&
        ddrMatch &&
        moduloMatch
    )
}

function matchPlacaMae(
    buscado: string,
    encontrado: string
): boolean {
    return (
        extrairChipset(buscado) ===
        extrairChipset(encontrado)
    )
}

function matchGenerico(
    buscado: string,
    encontrado: string
): boolean {
    const b = normalizar(buscado)
    const e = normalizar(encontrado)

    return e.includes(b) || b.includes(e)
}

export function validarMatching(
    tipo: string,
    buscado: string,
    encontrado: string
): boolean {
    switch (tipo) {
        case "cpu":
            return matchCPU(
                buscado,
                encontrado
            )

        case "gpu":
            return matchGPU(
                buscado,
                encontrado
            )

        case "ram":
            return matchRAM(
                buscado,
                encontrado
            )

        case "placamae":
            return matchPlacaMae(
                buscado,
                encontrado
            )

        case "armazenamento":
            return matchStorage(
                buscado,
                encontrado
            )

        default:
            return matchGenerico(
                buscado,
                encontrado
            )
    }
}