import { updateCpuPrices } from "../services/hubs/cpuHub"
import { updateGpuPrices } from "../services/hubs/gpuHub"
import { updateMotherboardPrices } from "../services/hubs/motherboardHub"
import { updateRamPrices } from "../services/hubs/ramHub"
import { updateStoragePrices } from "../services/hubs/storageHub"
import { updateSupplyPrices } from "../services/hubs/supplyHub"
import { updateCasePrices } from "../services/hubs/caseHub"

async function run() {
    console.log("Iniciando scraping geral")

    await updateCpuPrices()

    await updateGpuPrices()

    await updateMotherboardPrices()

    await updateRamPrices()

    await updateStoragePrices()

    await updateSupplyPrices()

    await updateCasePrices()

    console.log("Scraping geral finalizado")
}

run()