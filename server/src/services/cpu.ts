import '../config/env'
import { getData } from "./dataLoader"
import connection from "../database/connection"
import { PrecoLoja, Processador, ProcessadorJSON } from "../interfaces/componente"

export async function getCpus(): Promise<Processador[]> {
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

export const SOCKET_MAP: Record<string, string> = {
    // AMD
    "zen 5": "AM5",
    "zen 4": "AM5",
    "zen 3": "AM4",
    "zen 2": "AM4",
    "zen+": "AM4",
    "zen": "AM4",

    "bulldozer": "AM3+",
    "piledriver": "AM3+",
    "steamroller": "FM2+",
    "excavator": "FM2+",
    "jaguar": "AM1",

    "k10": "AM3",
    
    // Intel Desktop Mainstream
    "arrow lake": "LGA1851",
    "raptor lake refresh": "LGA1700",
    "raptor lake": "LGA1700",
    "alder lake": "LGA1700",
    "rocket lake": "LGA1200",
    "comet lake": "LGA1200",

    "coffee lake refresh": "LGA1151",
    "coffee lake": "LGA1151",
    "kaby lake": "LGA1151",
    "skylake": "LGA1151",

    "broadwell": "LGA1150",
    "haswell refresh": "LGA1150",
    "haswell": "LGA1150",

    "ivy bridge": "LGA1155",
    "sandy bridge": "LGA1155",

    "westmere": "LGA1156",
    "nehalem": "LGA1156",

    "wolfdale": "LGA775",
    "yorkfield": "LGA775",
    "core": "LGA775",

    // Intel HEDT / Enthusiast
    "cascade lake": "LGA2066"
}

export function definirSocket(microarquitetura: string): string {
    const arch = microarquitetura.toLowerCase().trim()

    for (const key in SOCKET_MAP) {
        if (arch.includes(key)) {
            return SOCKET_MAP[key]
        }
    }

    return "Desconhecido"
}

function definirMarca(nome: string): string {
    const n = nome.toLowerCase()

    if (n.includes('amd')) return 'AMD'
    if (n.includes('intel')) return 'Intel'

    return 'Desconhecida'
}

function menorPreco(valores: PrecoLoja[]): number {
    if (!valores.length) return 0

    return Math.min(...valores.map(v => v.preco))
}

export async function getProcessadoresCompletos(): Promise<Processador[]> {
    const jsonData: ProcessadorJSON[] = getData("cpu")
    const dbData = await getCpus()

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
    })

    return processadores
}