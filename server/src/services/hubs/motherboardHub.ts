import { atualizarComponente } from "./componentes"

export async function updateMotherboardPrices() {

    await atualizarComponente({

        tipo: "placamae",

        urls: {
            Kabum:
                "https://www.kabum.com.br/hardware/placas-mae",

            Pichau:
                "https://www.pichau.com.br/hardware/placa-m-e",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/placas-mae"
        }
    })
}