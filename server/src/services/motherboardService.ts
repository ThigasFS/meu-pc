import {
    PlacaMae
} from "../interfaces/componente"

import {
    definirDDR,
    definirMarca,
    menorPreco,

    extrairSocketMB,
    extrairChipsetMB,
    extrairFormatoMB

} from "../utils/componenteUtils"

import {
    BaseProdutoService
} from "./BaseProdutoService"

export async function getMotherboards(): Promise<PlacaMae[]> {

    return BaseProdutoService<never, PlacaMae>({
        tabelaTipo: "placamae",

        mapear: ({ banco, index }) => {

            const specs =
                banco?.specs ?? {}

            const nome =
                banco?.nome ?? ""

            const chipset =
                specs.chipset ??
                extrairChipsetMB(nome)

            const socket =
                specs.socket ??
                extrairSocketMB(nome)

            return {

                id:
                    banco?.id ??
                    index + 1,

                nome,

                marca:
                    banco?.marca ??
                    definirMarca(nome),

                socket,

                chipset,

                formato:
                    specs.formato ??
                    extrairFormatoMB(nome),

                maxRam:
                    specs.maxRam ??
                    128,

                ddr:
                    specs.ddr ??
                    definirDDR(
                        socket,
                        chipset
                    ),

                imagem:
                    banco?.imagem ?? "",

                preco:
                    menorPreco(
                        banco?.valores ?? []
                    ),

                valores:
                    banco?.valores ?? []
            }
        },

        filtro: (mb) =>
            mb.imagem.length > 0 &&
            mb.preco > 0 &&
            mb.valores.length > 0
    })
}