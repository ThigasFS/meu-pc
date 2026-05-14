import "../config/env"

import connection from "../database/connection"

import {
    Processador,
    ProcessadorJSON
} from "../interfaces/componente"

import {
    definirMarca,
    definirSocket,
    menorPreco
} from "../utils/componenteUtils"

import {
    gerarFingerprintProduto
} from "../utils/fingerprint"

import {
    getData
} from "./dataLoader"

interface CpuBancoRow {
    id: number

    nome: string
    fingerprint: string

    marca: string
    imagem: string

    specs: string | null

    loja: string | null
    preco: number | null
    url: string | null
}

interface CpuBanco {
    id: number

    nome: string
    fingerprint: string

    marca: string
    imagem: string

    specs: Record<string, any>

    valores: {
        loja: string
        preco: number
        url: string
    }[]
}

export async function getCpusDB(): Promise<CpuBanco[]> {

    const [rows] = await connection.query(`
        SELECT
            p.id,
            p.nome,
            p.fingerprint,
            p.marca,
            p.imagem,
            p.specs,

            pp.loja,
            pp.preco,
            pp.url

        FROM produtos p

        LEFT JOIN precos_produto pp
            ON p.id = pp.produto_id

        WHERE p.tipo = 'cpu'

        ORDER BY p.id
    `)

    const mapa =
        new Map<number, CpuBanco>()

    for (const row of rows as CpuBancoRow[]) {

        if (!mapa.has(row.id)) {

            mapa.set(row.id, {

                id: row.id,

                nome: row.nome,
                fingerprint: row.fingerprint,

                marca: row.marca,
                imagem: row.imagem,

                specs:
                    typeof row.specs === "string"
                        ? JSON.parse(row.specs)
                        : row.specs ?? {},

                valores: []
            })
        }

        const produto =
            mapa.get(row.id)!

        if (
            row.loja &&
            row.preco &&
            row.url
        ) {

            produto.valores.push({

                loja: row.loja,

                preco:
                    Number(row.preco),

                url: row.url
            })
        }
    }

    return Array.from(
        mapa.values()
    )
}

export async function getCpus(): Promise<Processador[]> {

    const jsonData =
        getData("cpu") as ProcessadorJSON[]

    const dbData =
        await getCpusDB()

    const bancoMap =
        new Map(
            dbData.map(cpu => [
                cpu.fingerprint,
                cpu
            ])
        )

    const processadores =
        jsonData.map((cpuJson, index) => {

            const fingerprint =
                gerarFingerprintProduto(
                    "cpu",
                    cpuJson.name
                )

            const cpuBanco =
                bancoMap.get(fingerprint)

            const specs =
                cpuBanco?.specs ?? {}

            return {

                id:
                    cpuBanco?.id ??
                    index + 1,

                fingerprint,

                nome:
                    cpuBanco?.nome ??
                    cpuJson.name,

                marca:
                    cpuBanco?.marca ??
                    definirMarca(
                        cpuJson.name
                    ),

                socket:
                    specs.socket ??
                    definirSocket(
                        cpuJson.microarchitecture
                    ),

                velocidade:
                    specs.clock ??
                    cpuJson.core_clock,

                tdp:
                    specs.tdp ??
                    cpuJson.tdp,

                videoIntegrado:
                    specs.videoIntegrado ??
                    !!cpuJson.graphics,

                imagem:
                    cpuBanco?.imagem ??
                    "",

                preco:
                    menorPreco(
                        cpuBanco?.valores ?? []
                    ),

                valores:
                    cpuBanco?.valores ?? []
            }
        })

    return processadores.filter(cpu =>
        cpu.imagem.length > 0 &&
        cpu.preco > 0 &&
        (cpu.valores?.length ?? 0) > 0
    )
}