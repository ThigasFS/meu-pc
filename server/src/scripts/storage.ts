import { updateStoragePrices } from "../services/hubs/storageHub"

async function main() {
    await updateStoragePrices()
    console.log("✔ Scraping Armazenamento finalizado")
}

main().catch(console.error)