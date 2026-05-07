import { updateSupplyPrices } from "../services/hubs/supply"

async function main() {
    await updateSupplyPrices()
    console.log("✔ Scraping Fontes finalizado")
}

main().catch(console.error)