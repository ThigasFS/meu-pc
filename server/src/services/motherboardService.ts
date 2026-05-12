import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    PlacaMae,
    PlacaMaeJson,
    PrecoLoja
} from "../interfaces/componente"
import { definirChipset, definirDDR, definirFormato, definirMarca, menorPreco } from "../utils/componenteUtils"

export async function getMotherboardsDB(): Promise<PlacaMae[]> {
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
        WHERE p.tipo = 'placamae'
        ORDER BY p.id
    `)

    const mapa = new Map<number, PlacaMae>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                socket: "",
                chipset: "",
                formato: "ATX",
                maxRam: 0,
                ddr: 0,
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

export async function getMotherboards(): Promise<PlacaMae[]> {
    const jsonData: PlacaMaeJson[] = getData("motherboard")
    const dbData = await getMotherboardsDB()

    const bancoMap = new Map(
        dbData.map((mb) => [mb.nome, mb])
    )

    return jsonData.map((mbJson, index) => {
        const mbBanco = bancoMap.get(mbJson.name)
        const chipset = definirChipset(mbJson.name)

        return {
            id: mbBanco?.id ?? index + 1,
            nome: mbJson.name,
            marca: definirMarca(mbJson.name),
            socket: mbJson.socket,
            chipset,
            formato: definirFormato(mbJson.form_factor),
            maxRam: mbJson.max_memory,
            ddr: definirDDR(mbJson.socket, chipset),
            imagem: mbBanco?.imagem ?? "",
            preco: menorPreco(mbBanco?.valores ?? []),
            valores: mbBanco?.valores ?? []
        }
    })
}