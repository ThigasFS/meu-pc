import { atualizarComponente } from "./componentes"

export async function updateGpuPrices() {

    await atualizarComponente({

        tipo: "gpu",

        urls: {
            Kabum:
                "https://www.kabum.com.br/hardware/placa-de-video-vga",

            Pichau:
                "https://www.pichau.com.br/hardware/placa-de-video",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/placas-de-video"
        }
    })
}