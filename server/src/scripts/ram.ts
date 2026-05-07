import { updateRamPrices } from "../services/hubs/ram"

async function main() {
    await updateRamPrices()
    console.log("✔ Scraping RAM finalizado")
}

main().catch(console.error)