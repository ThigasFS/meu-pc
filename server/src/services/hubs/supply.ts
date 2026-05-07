import supplyJson from "../../data/power-supply.json"
import { atualizarComponente } from "./componentes"

export async function updateSupplyPrices() {
    await atualizarComponente(supplyJson, {
        tipo: "fonte",
        seletorKabum: "fonte",
        seletorPichau: "fonte",
        seletorTerabyte: "fonte"
    })
}