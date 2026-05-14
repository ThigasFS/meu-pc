import { updateCpuPrices } from "../services/hubs/cpuHub"

async function run() {
  console.log("Iniciando atualização...")

  await updateCpuPrices()

  console.log("Atualização finalizada")
}

run()