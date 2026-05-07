import ramJson from "../../data/memory.json"
import { atualizarComponente } from "./componentes"

export async function updateRamPrices() {
    await atualizarComponente(ramJson, {
        tipo: "ram",
        seletorKabum: "memoria",
        seletorPichau: "memoria",
        seletorTerabyte: "memoria"
    })
}