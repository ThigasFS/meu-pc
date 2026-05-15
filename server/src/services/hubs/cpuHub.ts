import { atualizarComponente } from "./componentes"

export async function updateCpuPrices() {

    await atualizarComponente({

        tipo: "cpu",

        urls: {
            Kabum:
                "https://www.kabum.com.br/hardware/processadores",

            Pichau:
                "https://www.pichau.com.br/hardware/processadores",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/processadores"
        }
    })
}