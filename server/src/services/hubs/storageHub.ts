import {
    atualizarComponente
} from "./componentes"

export async function updateStoragePrices() {


    await atualizarComponente({

        tipo: "armazenamento",


        urls: {

            Kabum:
                "https://www.kabum.com.br/hardware/ssd-2-5",

            Pichau:
                "https://www.pichau.com.br/hardware/ssd",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/hard-disk"
        },

    })

    await atualizarComponente({

        tipo: "armazenamento",

        urls: {

            Kabum:
                "https://www.kabum.com.br/hardware/disco-rigido-hd",

            Pichau:
                "https://www.pichau.com.br/hardware/hard-disk-e-ssd",

            Terabyte:
                "https://www.terabyteshop.com.br/hardware/hard-disk"
        }
    })
}