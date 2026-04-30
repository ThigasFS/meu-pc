import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    PlacaMae,
    PlacaMaeJson,
    PrecoLoja
} from "../interfaces/componente"

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

function definirMarca(nome: string): string {
    const n = nome.toLowerCase()

    if (n.includes("asus")) return "ASUS"
    if (n.includes("gigabyte")) return "Gigabyte"
    if (n.includes("msi")) return "MSI"
    if (n.includes("asrock")) return "ASRock"

    return "Desconhecida"
}

function definirChipset(nome: string): string {
    const match = nome.match(
        /\b(B650|B550|X670|X570|A620|Z790|Z690|B760|B660|H610)\b/i
    )

    return match?.[0].toUpperCase() ?? "Desconhecido"
}

function definirDDR(socket: string, chipset: string): number {
    if (socket === "AM5") return 5
    if (socket === "AM4") return 4

    if (chipset.startsWith("Z7")) return 5
    if (chipset.startsWith("B7")) return 5

    return 4
}

function definirFormato(form: string): PlacaMae["formato"] {
    const f = form.toLowerCase()

    if (f.includes("micro")) return "MicroATX"
    if (f.includes("mini")) return "MiniATX"

    return "ATX"
}

function menorPreco(valores: PrecoLoja[]): number {
    if (!valores.length) return 0

    return Math.min(...valores.map((v) => v.preco))
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