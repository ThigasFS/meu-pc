import fs from "fs"
import path from "path"
import readline from "readline"

export interface DatasetRecord {
    source: string
    source_id: string
    category: string
    name: string
    brand: string
    url: string
    image_url: string
    price_eur: number
    rating_count: number
    specs: Record<string, string>
}

const DATASET_PATH = path.join(
    __dirname,
    "../data/dataset.jsonl"
)

let dataset: DatasetRecord[] | null = null

async function loadDataset(): Promise<DatasetRecord[]> {
    if (dataset) {
        return dataset
    }

    const records: DatasetRecord[] = []

    const fileStream = fs.createReadStream(DATASET_PATH, {
        encoding: "utf-8"
    })

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of rl) {
        if (!line.trim()) {
            continue
        }

        try {
            const record = JSON.parse(line) as DatasetRecord

            records.push(record)
        } catch {
            console.error("Linha inválida encontrada no dataset")
        }
    }

    dataset = records

    console.log(
        `Dataset carregado: ${dataset.length} registros`
    )

    return dataset
}

export async function getDataset(): Promise<DatasetRecord[]> {
    return loadDataset()
}

export async function getDatasetCategories(): Promise<string[]> {
    const data = await loadDataset()

    return [
        ...new Set(
            data.map(record => record.category)
        )
    ]
}

export async function getDatasetByCategory(
    category: string
): Promise<DatasetRecord[]> {
    const data = await loadDataset()

    return data.filter(
        record => record.category === category
    )
}

export async function getDatasetRecord(
    sourceId: string
): Promise<DatasetRecord | undefined> {
    const data = await loadDataset()

    return data.find(
        record => record.source_id === sourceId
    )
}