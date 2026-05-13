import "../config/env"
import { getData } from "./dataLoader"
import connection from "../database/connection"
import {
    Armazenamento,
    ArmazenamentoJson,
    PrecoLoja
} from "../interfaces/componente"
import { definirMarca, menorPreco } from "../utils/componenteUtils"

export async function getStorageDB(): Promise<Armazenamento[]> {
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
        WHERE p.tipo = 'armazenamento'
        ORDER BY p.id
    `)

    const mapa = new Map<number, Armazenamento>()

    for (const row of rows as any[]) {
        if (!mapa.has(row.id)) {
            mapa.set(row.id, {
                id: row.id,
                nome: row.nome,
                marca: row.marca,
                capacidade: 0,
                formato: '2.5',
                interface: "NVME",
                tipoArmazenamento: "HD",
                unidade: "GB",
                velocidadeGravacao: 0,
                velocidadeLeitura: 0,
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

export async function getStorages(): Promise<Armazenamento[]> {
    const jsonData: ArmazenamentoJson[] = getData("internal-hard-drive")
    const dbData = await getStorageDB()

    const bancoMap = new Map(
        dbData.map((storage) => [storage.nome, storage])
    )

    return jsonData.map((storageJson, index) => {
        const storageBanco = bancoMap.get(storageJson.name)
        const capacidadeTB = storageJson.capacity >= 1000
        const capacidade = capacidadeTB ? storageJson.capacity/1000 : storageJson.capacity
        const tipoArmazenamento: "SSD" | "HD" = storageJson.type === 'SSD' ? 'SSD' : 'HD'
        const interfaceStorage: "NVME" | "SATA" = storageJson.interface?.includes("M.2") ? 'NVME' : 'SATA'
        const unidade: "TB" | "GB" = capacidadeTB ? "TB" : "GB"
        const formato: "2.5" | "3.5" | "M2" = String(storageJson.form_factor)?.includes('2.5') ? '2.5' : String(storageJson.form_factor).includes('3.5') ? '3.5' : 'M2'

        return {
            id:  storageBanco?.id ?? index + 1,
            nome: storageJson.name,
            marca: definirMarca(storageJson.name),
            capacidade,
            formato,
            interface: interfaceStorage,
            tipoArmazenamento,
            unidade,
            velocidadeGravacao: storageBanco?.velocidadeGravacao ?? 0,
            velocidadeLeitura: storageBanco?.velocidadeLeitura ?? 0,
            imagem: storageBanco?.imagem ?? "",
            preco: menorPreco(storageBanco?.valores ?? []),
            valores: storageBanco?.valores ?? []
        }
    }).filter((data) => 
        data.imagem.length > 0 &&
        data.preco > 0 &&
        data.valores.length > 0
    )
}