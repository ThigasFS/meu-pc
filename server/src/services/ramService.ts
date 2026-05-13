import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    MemoriaRam,
    MemoriaRamJson,
    PrecoLoja
} from "../interfaces/componente"
import { definirMarca, menorPreco, normalizarTexto } from "../utils/componenteUtils"

export async function getRamDB(): Promise<MemoriaRam[]> {
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
        WHERE p.tipo = 'ram'
        ORDER BY p.id
    `)

    const mapa = new Map<number, MemoriaRam>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                capacidade: 0,
                cl: 0,
                modulos: [],
                ddr: 0,
                velocidade: 0,
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

export async function getRams(): Promise<MemoriaRam[]> {
    const jsonData: MemoriaRamJson[] = getData("memory")
    const dbData = await getRamDB()

    console.log(dbData.splice(0,10))
    console.log(jsonData.splice(0,10))

    const bancoMap = new Map(
        dbData.map((ram) => [normalizarTexto(ram.nome), ram])
    )

    return jsonData.map((ramJson, index) => {
        const nomeJson = normalizarTexto(ramJson.name)

        const ramBanco = dbData.find(ram => {
            const nomeBanco = normalizarTexto(ram.nome)

            return (
                nomeBanco.includes(nomeJson) ||
                nomeJson.includes(nomeBanco)
            )
        })
        const modulos = ramJson.modules
        const capacidade = modulos[0] * modulos[1]
        const ddr = ramJson.speed[0]
        const velocidade = ramJson.speed[1]

        return {
            id:  ramBanco?.id ?? index + 1,
            nome: ramJson.name,
            marca: definirMarca(ramJson.name),
            capacidade,
            modulos,
            cl: ramJson.cas_latency,
            ddr,
            velocidade,
            imagem: ramBanco?.imagem ?? "",
            preco: menorPreco(ramBanco?.valores ?? []),
            valores: ramBanco?.valores ?? []
        }
    }).filter(data =>
        data.imagem.length > 0 &&
        data.valores.length > 0 &&
        data.preco > 0
    )
}