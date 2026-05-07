import { updateStoragePrices } from "../services/hubs/storage"

async function main() {
    await updateStoragePrices()
    console.log("✔ Scraping Armazenamento finalizado")
}

main().catch(console.error)