import supplyJson from "../../data/power-supply.json"
import { atualizarComponente } from "./componentes"

export async function updateSupplyPrices() {
    const psuFiltradas = supplyJson.filter(psu => {
        const eficiencia = psu.efficiency?.toLowerCase()

        return (
            psu.wattage >= 500 &&
            ["bronze", "gold", "platinum"].includes(eficiencia)
        )
    }).slice(0, 100)
    await atualizarComponente(psuFiltradas, {
        tipo: "fonte",
        seletorKabum: "fonte",
        seletorPichau: "fonte",
        seletorTerabyte: "fonte",
        extracoes: ["conectores"]
    })
}