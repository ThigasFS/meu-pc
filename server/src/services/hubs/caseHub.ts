import { atualizarComponente } from "./componentes"

export async function updateCasePrices() {

    await atualizarComponente({

        tipo: "gabinete",

        urls: {
            Kabum:
                "https://www.kabum.com.br/perifericos/gabinetes",

            Pichau:
                "https://www.pichau.com.br/hardware/gabinete",

            Terabyte:
                "https://www.terabyteshop.com.br/gabinetes"
        }
    })
}