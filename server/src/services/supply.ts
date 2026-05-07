import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    Fonte,
    FonteJson,
    PrecoLoja
} from "../interfaces/componente"
import { definirMarca, menorPreco } from "../utils/componenteUtils"

export async function getSupplyDB(): Promise<Fonte[]> {
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
        WHERE p.tipo = 'fonte'
        ORDER BY p.id
    `)

    const mapa = new Map<number, Fonte>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                certificacao: '',
                formato: 'ATX',
                potencia: 0,
                modularidade: 'Não',
                epsConectores: 0,
                pcieConectores: 0,
                sataConectores: 0,
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

export async function getSupply(): Promise<Fonte[]> {
    const jsonData: FonteJson[] = getData("power-supply")
    const dbData = await getSupplyDB()

    const bancoMap = new Map(
        dbData.map((supply) => [supply.nome, supply])
    )

    return jsonData.map((supplyJson, index) => {
        const supplyBanco = bancoMap.get(supplyJson.name)
        const modularidade = supplyJson.modular === 'Full' ? 'Full' : supplyJson.modular === 'Semi' ? 'Semi' : 'Não'

        return {
            id: supplyBanco?.id ?? index + 1,
            nome: supplyJson.name,
            marca: definirMarca(supplyJson.name),
            certificacao: supplyJson.efficiency,
            formato: supplyJson.type,
            modularidade,
            potencia: supplyJson.wattage,
            pcieConectores: supplyBanco?.pcieConectores ?? 0,
            sataConectores: supplyBanco?.sataConectores ?? 0,
            epsConectores: supplyBanco?.epsConectores ?? 0,
            imagem: supplyBanco?.imagem ?? "",
            preco: menorPreco(supplyBanco?.valores ?? []),
            valores: supplyBanco?.valores ?? []
        }
    })
}