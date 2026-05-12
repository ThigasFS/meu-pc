import { updateSupplyPrices } from "../services/hubs/supplyHub"

async function main() {
    await updateSupplyPrices()
    console.log("✔ Scraping Fontes finalizado")
}

main().catch(console.error)