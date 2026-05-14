import { updateCpuPrices } from "../services/hubs/cpuHub"

async function main() {
    await updateCpuPrices()
    console.log("✔ Scraping CPU finalizado")
}

main().catch(console.error)