import motherboardJson from "../../data/motherboard.json"
import { atualizarComponente } from "./componentes"

export async function updateMotherboardPrices() {
    await atualizarComponente(motherboardJson, {
        tipo: "placamae",
        seletorKabum: "produto",
        seletorPichau: "placa-mae",
        seletorTerabyte: "placa-mae"
    })
}