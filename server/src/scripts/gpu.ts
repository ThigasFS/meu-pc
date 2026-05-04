import { updateGpuPrices } from "../services/hubs/gpu"

async function main() {
    await updateGpuPrices()
    console.log("✔ Scraping GPU finalizado")
}

main().catch(console.error)