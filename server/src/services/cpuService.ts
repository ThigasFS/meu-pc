import { getDataset } from "./datasetService"

export interface CPU {
    id: string
    type: "cpu"

    source: string
    name: string
    brand: string

    url: string
    image: string

    price: number
    ratingCount: number

    specs: Record<string, string>
}

let cpus: CPU[] | null = null

async function loadCPUs(): Promise<CPU[]> {
    if (cpus) {
        return cpus
    }

    const dataset = await getDataset()

    cpus = dataset
        .filter(record => record.category === "cpu")
        .map(record => ({
            id: record.source_id,
            type: "cpu",

            source: record.source,
            name: record.name,
            brand: record.brand,

            url: record.url,
            image: record.image_url,

            price: record.price_eur,
            ratingCount: record.rating_count,

            specs: record.specs
        }))

    console.log(`CPUs carregadas: ${cpus.length}`)

    return cpus
}

export async function getCPUs(): Promise<CPU[]> {
    return loadCPUs()
}