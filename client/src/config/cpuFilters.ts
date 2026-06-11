import { ConfigFiltro } from "../components/FiltroProduto/FiltroProduto.type"

export const cpuFilters: ConfigFiltro[] = [
    {
        id: "marca",
        titulo: "Marca",
        opcoes: [
            {
                label: "AMD",
                value: "AMD"
            },
            {
                label: "Intel",
                value: "Intel"
            }
        ]
    },

    {
        id: "socket",
        titulo: "Socket",
        opcoes: [
            {
                label: "AM4",
                value: "AM4"
            },
            {
                label: "AM5",
                value: "AM5"
            },
            {
                label: "LGA1700",
                value: "LGA1700"
            }
        ]
    }
]