import caseJson from "../../data/case.json"
import { atualizarComponente } from "./componentes"

export async function updateCasePrices() {
    const gabinetesFiltrados = caseJson.filter(gab => {
        return (
            gab.type?.includes("Tower") &&
            gab.external_volume &&
            gab.external_volume <= 75
        )
    }).slice(0, 100)
    await atualizarComponente(gabinetesFiltrados, {
        tipo: "gabinete",
        seletorKabum: "gabinete",
        seletorPichau: "gabinete",
        seletorTerabyte: "gabinete",
        extracoes: ["fans"]
    })
}