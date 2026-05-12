import ramJson from "../../data/memory.json"
import { extrairCapacidadeRAM, extrairClockRAM, extrairDDRRAM } from "../../utils/componenteUtils"
import { atualizarComponente } from "./componentes"

export async function updateRamPrices() {
    const ramFiltradas = ramJson
        .filter(ram => {
            return (
                extrairClockRAM(ram.speed) >= 3200 &&
                extrairCapacidadeRAM(ram.modules) >= 8 &&
                [4, 5].includes(extrairDDRRAM(ram.speed))
            )
        })
        .map(ram => ({
            ...ram,
            name: `
            ${ram.name}
            DDR${extrairDDRRAM(ram.speed)}
            ${extrairClockRAM(ram.speed)}MHz
            (${ram.modules[0]}x${ram.modules[1]}GB)
        `.replace(/\s+/g, " ").trim()
        })).slice(0, 120)

    await atualizarComponente(ramFiltradas, {
        tipo: "ram",
        seletorKabum: "memoria",
        seletorPichau: "memoria",
        seletorTerabyte: "memoria"
    })
}