import { updateCasePrices } from "../services/hubs/case"

async function main() {
    await updateCasePrices()
    console.log("✔ Scraping Gabinete finalizado")
}

main().catch(console.error)