import '../config/env'
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    PlacaVideo,
    PlacaVideoJson
} from "../interfaces/componente"

import {
    definirMarca,
    menorPreco
} from "../utils/componenteUtils"

export async function getGpusDB(): Promise<PlacaVideo[]> {
    const [rows] = await connection.query(`
        SELECT
            p.id,
            p.nome,
            p.marca,
            p.imagem,
            p.tdp,
            p.gddr,
            pp.loja,
            pp.preco,
            pp.url
        FROM produtos p
        LEFT JOIN precos_produto pp
            ON p.id = pp.produto_id
        WHERE p.tipo = 'gpu'
        ORDER BY p.id
    `)

    const mapa = new Map<number, PlacaVideo>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                vram: 0,
                tdp: row.tdp,
                gddr: row.gddr,
                imagem: row.imagem,
                preco: Number(row.preco) || 0,
                valores: []
            })
        }

        const gpu = mapa.get(row.id)!

        if (row.loja) {
            gpu.valores.push({
                loja: row.loja,
                preco: Number(row.preco),
                url: row.url
            })
        }
    }

    return Array.from(mapa.values())
}

export async function getGpus(): Promise<PlacaVideo[]> {
    const jsonData: PlacaVideoJson[] = getData("video-card")
    const dbData = await getGpusDB()

    const gpuMap = new Map(
        dbData.map(gpu => [gpu.nome, gpu])
    )

    const gpus: PlacaVideo[] = jsonData.map((gpuJson, index) => {
        const gpuBanco = dbData.find(gpu =>
            gpu.nome.toLowerCase() === gpuJson.name.toLowerCase()
        )

        return {
            id: gpuBanco?.id ?? index + 1,
            nome: gpuJson.name,
            marca: definirMarca(gpuJson.name),
            vram: gpuJson.memory ?? 0,
            gddr: gpuBanco?.gddr ?? 0,
            tdp: gpuBanco?.tdp ?? 0,
            imagem: gpuBanco?.imagem ?? "",
            preco: menorPreco(gpuBanco?.valores ?? []),
            valores: gpuBanco?.valores ?? []
        }
    }).filter(data => 
        data.imagem.length > 0 &&
        data.preco > 0 &&
        data.valores.length > 0
    )

    return gpus
}