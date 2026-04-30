import { updateMotherboardPrices } from "../services/hubs/motherboard"

async function main() {
    await updateMotherboardPrices()
    console.log("✔ Scraping Placas Mãe finalizado")
}

main().catch(console.error)