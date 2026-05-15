import { atualizarComponente } from "./componentes"

export async function updateSupplyPrices() {

    await atualizarComponente({

        tipo: "fonte",

        urls: {
            Kabum:
                "https://www.kabum.com.br/hardware/fontes",

            Pichau:
                "https://www.pichau.com.br/hardware/fonte",

            Terabyte:
                "https://www.terabyteshop.com.br/fontes"
        }
    })
}