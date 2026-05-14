import { extrairCapacidadeStorage, extrairFormatoStorage, extrairInterfaceStorage, extrairTipoStorage } from "../utils/componenteUtils"

export function matchStorage(
    buscado: string,
    encontrado: string
): boolean {

    const capacidadeMatch =
        extrairCapacidadeStorage(buscado) ===
        extrairCapacidadeStorage(encontrado)

    const interfaceMatch =
        extrairInterfaceStorage(buscado) ===
        extrairInterfaceStorage(encontrado)

    const formatoMatch =
        extrairFormatoStorage(buscado) ===
        extrairFormatoStorage(encontrado)

    const tipoMatch =
        extrairTipoStorage(buscado) ===
        extrairTipoStorage(encontrado)

    return (
        capacidadeMatch &&
        interfaceMatch &&
        formatoMatch &&
        tipoMatch
    )
}