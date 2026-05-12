import { updateRamPrices } from "../services/hubs/ramHub"

async function main() {
    await updateRamPrices()
    console.log("✔ Scraping RAM finalizado")
}

main().catch(console.error)