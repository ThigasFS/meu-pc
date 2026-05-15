import { atualizarComponente } from "./componentes"

export async function updateRamPrices() {

    await atualizarComponente({

        tipo: "ram",

        urls: {
            Kabum:
                "https://www.kabum.com.br/hardware/memoria-ram",

            Pichau:
                "https://www.pichau.com.br/hardware/memorias",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/memorias"
        }
    })
}