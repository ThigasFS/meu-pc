import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    Gabinete,
    GabineteJson,
    PrecoLoja
} from "../interfaces/componente"
import { definirCor, definirMarca, menorPreco } from "../utils/componenteUtils"

export async function getCaseDB(): Promise<Gabinete[]> {
    const [rows] = await connection.query(`
        SELECT
            p.id,
            p.nome,
            p.marca,
            p.imagem,
            pp.loja,
            pp.preco,
            pp.url
        FROM produtos p
        LEFT JOIN precos_produto pp
            ON p.id = pp.produto_id
        WHERE p.tipo = 'gabinete'
        ORDER BY p.id
    `)

    const mapa = new Map<number, Gabinete>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                baiasHD: 0,
                cor: '',
                formato: 'Full Tower',
                painelLateral: '',
                suportePlacaMae: '',
                tamanho: 'Compacto',
                qtdFans: row.qtdFans,
                imagem: row.imagem,
                preco: Number(row.preco) || 0,
                valores: []
            })
        }

        const placa = mapa.get(row.id)!

        if (row.loja) {
            placa.valores.push({
                loja: row.loja,
                preco: Number(row.preco),
                url: row.url
            })
        }
    }

    return Array.from(mapa.values())
}

export async function getCases(): Promise<Gabinete[]> {
    const jsonData: GabineteJson[] = getData("case")
    const dbData = await getCaseDB()

    const bancoMap = new Map(
        dbData.map((gab) => [gab.nome, gab])
    )

    return jsonData.map((gabJson, index) => {
        const gabBanco = bancoMap.get(gabJson.name)
        const suportePlacaMae: Gabinete['suportePlacaMae']= gabJson.type.includes('MicroATX') ? 'MicroATX' : gabJson.type.includes('Mini ITX') ? 'MiniITX' : 'ATX' 
        const formato: Gabinete['formato']= gabJson.type.includes('Mini Tower') ? 'Mini Tower' : gabJson.type.includes('Mid Tower') ? 'Mid Tower' : 'Full Tower'
        const volume = gabJson.external_volume ?? 0
        const tamanho: Gabinete['tamanho']= volume >= 40 ? 'Grande' : volume >= 25 ? 'Médio' : 'Compacto'

        return {
            id: gabBanco?.id ?? index + 1,
            nome: gabJson.name,
            marca: definirMarca(gabJson.name),
            baiasHD: gabJson.internal_35_bays,
            formato,
            suportePlacaMae,
            painelLateral: gabJson.side_panel ?? "Não informado",
            tamanho,
            cor: definirCor(gabJson.color),
            qtdFans: gabBanco?.qtdFans ?? 0,
            imagem: gabBanco?.imagem ?? "",
            preco: menorPreco(gabBanco?.valores ?? []),
            valores: gabBanco?.valores ?? []
        }
    }).filter(data =>
        data.imagem.length > 0 &&
        data.valores.length > 0 &&
        data.preco > 0
    )
}