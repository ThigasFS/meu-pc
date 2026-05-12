import { updateMotherboardPrices } from "../services/hubs/motherboardHub"

async function main() {
    await updateMotherboardPrices()
    console.log("✔ Scraping Placas Mãe finalizado")
}

main().catch(console.error)