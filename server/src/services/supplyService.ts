import {
    Fonte,
    FonteJson
} from "../interfaces/componente"

import {
    definirMarca,
    menorPreco
} from "../utils/componenteUtils"

import { gerarFingerprintProduto } from "../utils/fingerprint"

import { BaseProdutoService } from "./BaseProdutoService"

export async function getPsus(): Promise<Fonte[]> {

    return BaseProdutoService<FonteJson, Fonte>({
        tabelaTipo: "fonte",

        gerarFingerprint: (psu) =>
            gerarFingerprintProduto(
                "psu",
                psu.name
            ),

        mapear: ({ json, banco, index }) => {

            const specs =
                banco?.specs ?? {}

            return {
                id:
                    banco?.id ??
                    index + 1,

                nome:
                    banco?.nome ??
                    json.name,

                marca:
                    banco?.marca ??
                    definirMarca(json.name),

                potencia:
                    specs.potencia ??
                    json.wattage,

                certificacao:
                    specs.certificacao ??
                    json.efficiency,

                pcieConectores:
                    specs.pcieConectores ??
                    0,

                sataConectores:
                    specs.sataConectores ??
                    0,

                epsConectores:
                    specs.epsConectores ??
                    0,

                modularidade:
                    specs.modularidade ??
                    json.modular,

                formato:
                    specs.formato ??
                    json.type,

                imagem:
                    banco?.imagem ?? "",

                preco:
                    menorPreco(
                        banco?.valores ?? []
                    ),

                valores:
                    banco?.valores ?? []
            }
        },

        filtro: (psu) =>
            psu.imagem.length > 0 &&
            psu.preco > 0 &&
            psu.valores.length > 0
    })
}