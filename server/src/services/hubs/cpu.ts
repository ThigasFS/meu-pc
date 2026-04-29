import cpusJson from "../../data/cpu.json"
import { atualizarComponente } from "./componentes"

export async function updateCpuPrices() {
    await atualizarComponente(cpusJson, {
        tipo: "cpu",
        seletorKabum: "produto",
        seletorPichau: "processador",
        seletorTerabyte: "processador"
    })
}