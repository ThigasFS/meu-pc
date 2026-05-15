import { updateGpuPrices } from "../services/hubs/gpuHub"

async function main() {
    await updateGpuPrices()
    console.log("✔ Scraping GPU finalizado")
}

main().catch(console.error)