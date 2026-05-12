import { updateCasePrices } from "../services/hubs/caseHub"

async function main() {
    await updateCasePrices()
    console.log("✔ Scraping Gabinete finalizado")
}

main().catch(console.error)