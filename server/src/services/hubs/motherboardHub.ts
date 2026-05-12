import motherboardJson from "../../data/motherboard.json"
import { definirChipset } from "../../utils/componenteUtils"
import { atualizarComponente } from "./componentes"

export async function updateMotherboardPrices() {
    const placasFiltradas = motherboardJson.filter(mb => {
        const chipset = definirChipset(mb.name).toLowerCase()

        return (
            chipset?.includes("b550") ||
            chipset?.includes("b650") ||
            chipset?.includes("x570") ||
            chipset?.includes("x670") ||
            chipset?.includes("b660") ||
            chipset?.includes("b760") ||
            chipset?.includes("z690") ||
            chipset?.includes("z790")
        )
    }).slice(0, 120)

    await atualizarComponente(placasFiltradas, {
        tipo: "placamae",
        seletorKabum: "produto",
        seletorPichau: "placa-mae",
        seletorTerabyte: "placa-mae"
    })
}