import "../config/env"

import connection from "../database/connection"

import {
    getData
} from "./dataLoader"

export interface ProdutoBancoRow {
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

export interface ProdutoBancoBase {
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

export type TipoProduto =
    | "cpu"
    | "placamae"
    | "gpu"
    | "ram"
    | "armazenamento"
    | "fonte"
    | "gabinete"

export interface BaseProdutoOptions<
    TJson,
    TResult
> {

    tipo?: TipoProduto

    tabelaTipo: string

    gerarFingerprint?: (
        json: TJson
    ) => string

    mapear: (params: {
        json: TJson
        banco?: ProdutoBancoBase
        index: number
    }) => TResult

    filtro?: (
        item: TResult
    ) => boolean
}

export async function BaseProdutoService<
    TJson,
    TResult
>(
    options: BaseProdutoOptions<
        TJson,
        TResult
    >
): Promise<TResult[]> {

    const jsonData =
        options.tipo
            ? getData(
                options.tipo
            ) as TJson[]
            : []

    const [rows] =
        await connection.query(`
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

            WHERE p.tipo = ?

            ORDER BY p.id
        `, [options.tabelaTipo])

    const mapa =
        new Map<
            number,
            ProdutoBancoBase
        >()

    for (const row of rows as ProdutoBancoRow[]) {

        if (!mapa.has(row.id)) {

            mapa.set(row.id, {

                id:
                    row.id,

                nome:
                    row.nome,

                fingerprint:
                    row.fingerprint,

                marca:
                    row.marca,

                imagem:
                    row.imagem,

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

                loja:
                    row.loja,

                preco:
                    Number(row.preco),

                url:
                    row.url
            })
        }
    }

    const bancoMap =
        new Map(
            Array
                .from(mapa.values())
                .map(item => [
                    item.fingerprint,
                    item
                ])
        )

    // =========================
    // SEM JSON
    // =========================

    if (jsonData.length === 0) {

        const result =
            Array
                .from(
                    bancoMap.values()
                )
                .map((banco, index) => {

                    return options.mapear({

                        json:
                            {} as TJson,

                        banco,

                        index
                    })
                })

        return options.filtro
            ? result.filter(
                options.filtro
            )
            : result
    }

    // =========================
    // COM JSON
    // =========================

    const result =
        jsonData.map((
            json,
            index
        ) => {

            const fingerprint =
                options
                    .gerarFingerprint
                    ?.(
                        json
                    )

            const banco =
                fingerprint
                    ? bancoMap.get(
                        fingerprint
                    )
                    : undefined

            return options.mapear({

                json,

                banco,

                index
            })
        })

    return options.filtro
        ? result.filter(
            options.filtro
        )
        : result
}