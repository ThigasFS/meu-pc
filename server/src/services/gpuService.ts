import { validarTDP } from "../enrichers/tdp"
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

            const tdp =
                validarTDP('gpu', specs.tdp)

            return {

                id:
                    banco?.id ??
                    index + 1,

                nome,

                fingerprint: banco?.fingerprint,

                marca:
                    banco?.marca ??
                    definirMarca(nome),

                vram:
                    specs.vram ??
                    json.memory,

                tdp:
                    tdp.valor,

                tdpEstimado:
                    tdp.estimado,

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