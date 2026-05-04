import gpusJson from "../../data/video-card.json"
import { atualizarComponente } from "./componentes"

export async function updateGpuPrices() {
    await atualizarComponente(gpusJson, {
        tipo: "gpu",
        seletorKabum: "produto",
        seletorPichau: "placa-de-video",
        seletorTerabyte: "placa-de-video",
        extrairGddr: true,
        extrairTdp: true
    })
}