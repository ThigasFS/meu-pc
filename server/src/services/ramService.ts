import {
    MemoriaRam,
    MemoriaRamJson
} from "../interfaces/componente"

import {
    definirDDR,
    definirMarca,
    extrairCapacidadeRAM,
    extrairCL,
    extrairClockRAM,
    extrairModulosRAM,
    menorPreco
} from "../utils/componenteUtils"

import {
    gerarFingerprintProduto
} from "../utils/fingerprint"

import {
    BaseProdutoService
} from "./BaseProdutoService"

export async function getRams(): Promise<MemoriaRam[]> {

    return BaseProdutoService<
        MemoriaRamJson,
        MemoriaRam
    >({
        tabelaTipo: "ram",

        gerarFingerprint: (ram) =>
            gerarFingerprintProduto(
                "ram",
                ram.name
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
                json?.name ??
                ""

            return {

                id:
                    banco?.id ??
                    index + 1,

                nome,

                marca:
                    banco?.marca ??
                    definirMarca(nome),

                capacidade:
                    specs.capacidade ??
                    extrairCapacidadeRAM(nome),

                modulos:
                    specs.modulos ??
                    extrairModulosRAM(nome),

                velocidade:
                    specs.velocidade ??
                    extrairClockRAM(nome),

                ddr:
                    specs.ddr ??
                    definirDDR("", nome),

                cl:
                    specs.cl ??
                    extrairCL(nome),

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

        filtro: (ram) =>
            ram.imagem.length > 0 &&
            ram.preco > 0 &&
            ram.valores.length > 0
    })
}