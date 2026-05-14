import gpusJson from "../../data/video-card.json"
import { atualizarComponente } from "./componentes"

export async function updateGpuPrices() {
    const gpusFiltradas = gpusJson.filter(gpu => {
    const nome = gpu.name.toLowerCase()

    return (
        nome.includes("rtx") ||
        nome.includes("gtx 16") ||
        nome.includes("rx 5") ||
        nome.includes("rx 6") ||
        nome.includes("rx 7") ||
        nome.includes("rx 9")
    )
}).slice(0, 150)

    await atualizarComponente(gpusFiltradas, {
        tipo: "gpu",
        seletorKabum: "produto",
        seletorPichau: "placa-de-video",
        seletorTerabyte: "placa-de-video",
        extracoes: ["tdp", "gddr"]
    })
}