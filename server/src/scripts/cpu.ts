import { updateCpuPrices } from "../services/hubs/cpu"

async function main() {
    await updateCpuPrices()
    console.log("✔ Scraping CPU finalizado")
}

main().catch(console.error)