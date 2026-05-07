import caseJson from "../../data/case.json"
import { atualizarComponente } from "./componentes"

export async function updateCasePrices() {
    await atualizarComponente(caseJson, {
        tipo: "gabinete",
        seletorKabum: "gabinete",
        seletorPichau: "gabinete",
        seletorTerabyte: "gabinete"
    })
}