import {
    Armazenamento,
    ArmazenamentoJson
} from "../interfaces/componente"

import {
    definirMarca,
    menorPreco
} from "../utils/componenteUtils"

import { gerarFingerprintProduto } from "../utils/fingerprint"

import { BaseProdutoService } from "./BaseProdutoService"

export async function getStorages(): Promise<Armazenamento[]> {

    return BaseProdutoService<
        ArmazenamentoJson,
        Armazenamento
    >({
        tabelaTipo: "armazenamento",

        gerarFingerprint: (storage) =>
            gerarFingerprintProduto(
                "storage",
                storage.name
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

                capacidade:
                    specs.capacidade ??
                    json.capacity,

                unidade:
                    specs.unidade ??
                    "GB",

                tipoArmazenamento:
                    specs.tipoArmazenamento ??
                    "SSD",

                interface:
                    specs.interface ??
                    "SATA",

                formato:
                    specs.formato ??
                    "2.5",

                velocidadeLeitura:
                    specs.velocidadeLeitura ??
                    0,

                velocidadeGravacao:
                    specs.velocidadeGravacao ??
                    0,

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

        filtro: (storage) =>
            storage.imagem.length > 0 &&
            storage.preco > 0 &&
            storage.valores.length > 0
    })
}