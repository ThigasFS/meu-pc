import {
    Processador,
    ProcessadorJSON
} from "../interfaces/componente"

import {
    definirMarca,
    definirSocket,
    menorPreco
} from "../utils/componenteUtils"

import { gerarFingerprintProduto } from "../utils/fingerprint"

import { BaseProdutoService } from "./BaseProdutoService"

export async function getCpus(): Promise<Processador[]> {

    return BaseProdutoService<ProcessadorJSON, Processador>({
        tipo: "cpu",
        tabelaTipo: "cpu",

        gerarFingerprint: (cpu) =>
            gerarFingerprintProduto(
                "cpu",
                cpu.name
            ),

        mapear: ({ json, banco, index }) => {

            const specs =
                banco?.specs ?? {}

            return {
                id:
                    banco?.id ??
                    index + 1,

                fingerprint:
                    banco?.fingerprint ??
                    gerarFingerprintProduto(
                        "cpu",
                        json.name
                    ),

                nome:
                    banco?.nome ??
                    json.name,

                marca:
                    banco?.marca ??
                    definirMarca(json.name),

                socket:
                    specs.socket ??
                    definirSocket(
                        json.microarchitecture
                    ),

                velocidade:
                    specs.clock ??
                    json.core_clock,

                tdp:
                    specs.tdp ??
                    json.tdp,

                videoIntegrado:
                    specs.videoIntegrado ??
                    !!json.graphics,

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

        filtro: (cpu) =>
            cpu.imagem.length > 0 &&
            cpu.preco > 0 &&
            (cpu.valores?.length ?? 0) > 0
    })
}