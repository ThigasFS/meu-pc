import ramJson from "../../data/memory.json"
import { atualizarComponente } from "./componentes"

export async function updateRamPrices() {
    await atualizarComponente(ramJson, {
        tipo: "ram",
        seletorKabum: "produto",
        seletorPichau: "memoria-ram",
        seletorTerabyte: "memoria-ram"
    })
}