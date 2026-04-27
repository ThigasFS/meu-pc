import { updateCpuPrices } from "../services/hubs/cpu"

async function run() {
  console.log("Iniciando atualização...")

  await updateCpuPrices()

  console.log("Atualização finalizada")
}

run()