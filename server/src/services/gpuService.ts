// services/gpuService.ts

import {
    PlacaVideo,
    PlacaVideoJson
} from "../interfaces/componente"

import {
    definirMarca,
    extrairTDPGPU,
    menorPreco
} from "../utils/componenteUtils"

import {
    gerarFingerprintProduto
} from "../utils/fingerprint"

import {
    BaseProdutoService
} from "./BaseProdutoService"

export async function getGpus(): Promise<PlacaVideo[]> {

    return BaseProdutoService<
        PlacaVideoJson,
        PlacaVideo
    >({

        tipo: "gpu",

        tabelaTipo: "gpu",

        gerarFingerprint: (gpu) =>
            gerarFingerprintProduto(
                "gpu",
                gpu.name
            ),

        mapear: ({
            json,
            banco,
            index
        }) => {

            const specs =
                banco?.specs ?? {}

            const nome =
                banco?.nome ??
                json.name

            return {

                id:
                    banco?.id ??
                    index + 1,

                nome,

                marca:
                    banco?.marca ??
                    definirMarca(nome),

                vram:
                    specs.vram ??
                    json.memory,

                tdp:
                    specs.tdp ??
                    extrairTDPGPU(
                        json.name
                    ),

                gddr:
                    specs.gddr ??
                    6,

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

        filtro: (gpu) =>
            gpu.imagem.length > 0 &&
            gpu.preco > 0 &&
            gpu.valores.length > 0
    })
}