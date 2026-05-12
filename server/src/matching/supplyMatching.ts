import {
    extrairPotenciaFonte,
    extrairCertificacaoFonte
} from "../utils/componenteUtils"

export function psuCompativel(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {

    const potenciaBuscada =
        extrairPotenciaFonte(
            nomeBuscado
        )

    const potenciaEncontrada =
        extrairPotenciaFonte(
            nomeEncontrado
        )

    if (
        potenciaBuscada !==
        potenciaEncontrada
    ) {
        return false
    }

    const certBuscada =
        extrairCertificacaoFonte(
            nomeBuscado
        )

    const certEncontrada =
        extrairCertificacaoFonte(
            nomeEncontrado
        )

    if (
        certBuscada &&
        certEncontrada &&
        certBuscada !== certEncontrada
    ) {
        return false
    }

    return true
}