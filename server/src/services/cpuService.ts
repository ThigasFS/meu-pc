import '../config/env'
import { getData } from "./dataLoader"
import connection from "../database/connection"
import { PrecoLoja, Processador, ProcessadorJSON } from "../interfaces/componente"
import { definirMarca, definirSocket, menorPreco } from '../utils/componenteUtils'

export async function getCpusDB(): Promise<Processador[]> {
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
        WHERE p.tipo = 'cpu'
        ORDER BY p.id
    `)

    const mapa = new Map<number, Processador>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                socket: "",
                velocidade: 0,
                tdp: 0,
                videoIntegrado: false,
                imagem: row.imagem,
                preco: Number(row.preco) || 0,
                valores: []
            })
        }

        const processador = mapa.get(row.id)!

        if (row.loja) {
            processador.valores!.push({
                loja: row.loja,
                preco: Number(row.preco),
                url: row.url
            })
        }
    }

    return Array.from(mapa.values())
}

export async function getCpus(): Promise<Processador[]> {
    const jsonData: ProcessadorJSON[] = getData("cpu")
    const dbData = await getCpusDB()

    const bancoMap = new Map(
        dbData.map((cpu) => [cpu.nome, cpu])
    )

    const processadores: Processador[] = jsonData.map((cpuJson, index) => {
        const cpuBanco = bancoMap.get(cpuJson.name)

        return {
            id: cpuBanco?.id ?? index + 1,
            nome: cpuJson.name,
            marca: definirMarca(cpuJson.name),
            socket: definirSocket(cpuJson.microarchitecture),
            velocidade: cpuJson.core_clock,
            tdp: cpuJson.tdp,
            videoIntegrado: !!cpuJson.graphics,
            imagem: cpuBanco?.imagem ?? "",
            preco: menorPreco(cpuBanco?.valores ?? []),
            valores: cpuBanco?.valores ?? []
        }
    }).filter((data) => 
        data.imagem.length > 0 &&
        data.preco > 0 &&
        data.valores.length > 0
    )

    return processadores
}