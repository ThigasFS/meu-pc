// services/caseService.ts

import {
    Gabinete,
    GabineteJson
} from "../interfaces/componente"

import {
    definirMarca,
    menorPreco
} from "../utils/componenteUtils"

import { gerarFingerprintProduto } from "../utils/fingerprint"

import { BaseProdutoService } from "./BaseProdutoService"

export async function getCases(): Promise<Gabinete[]> {

    return BaseProdutoService<GabineteJson, Gabinete>({
        tabelaTipo: "gabinete",

        gerarFingerprint: (gabinete) =>
            gerarFingerprintProduto(
                "case",
                gabinete.name
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

                qtdFans:
                    specs.qtdFans ??
                    0,

                cor:
                    specs.cor ??
                    json.color,

                formato:
                    specs.formato ??
                    "Mid Tower",

                suportePlacaMae:
                    specs.suportePlacaMae ??
                    "ATX",

                painelLateral:
                    specs.painelLateral ??
                    json.side_panel,

                baiasHD:
                    specs.baiasHD ??
                    json.internal_35_bays,

                tamanho:
                    specs.tamanho ??
                    "Médio",

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

        filtro: (gabinete) =>
            gabinete.imagem.length > 0 &&
            gabinete.preco > 0 &&
            gabinete.valores.length > 0
    })
}