import { PlacaMae, PrecoLoja } from "../interfaces/componente"

export const SOCKET_MAP: Record<string, string> = {

    "zen 5": "AM5",
    "zen 4": "AM5",
    "zen 3": "AM4",
    "zen 2": "AM4",
    "zen+": "AM4",
    "zen": "AM4",

    "arrow lake": "LGA1851",
    "raptor lake refresh": "LGA1700",
    "raptor lake": "LGA1700",
    "alder lake": "LGA1700",
    "rocket lake": "LGA1200",
    "comet lake": "LGA1200",

    "coffee lake refresh": "LGA1151",
    "coffee lake": "LGA1151",
    "kaby lake": "LGA1151",
    "skylake": "LGA1151"
}

export function normalizarTexto(
    texto: string
): string {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "")
        .toLowerCase()
        .trim()
}

export function produtoEhKitUpgrade(
    nome: string
): boolean {

    const texto =
        normalizarTexto(nome)

    return [
        "kit upgrade",
        "upgrade kit",
        "combo",
        "pc gamer",
        "setup",
        "montado",
        "com memoria",
        "com placa mae",
        "com water cooler"
    ].some(item =>
        texto.includes(item)
    )
}

export function precoSuspeito(
    tipo: string,
    preco: number
): boolean {

    const limites: Record<
        string,
        {
            min: number
            max: number
        }
    > = {

        cpu: {
            min: 250,
            max: 12000
        },

        gpu: {
            min: 500,
            max: 25000
        },

        ram: {
            min: 80,
            max: 6000
        },

        armazenamento: {
            min: 70,
            max: 5000
        },

        fonte: {
            min: 150,
            max: 4000
        },

        gabinete: {
            min: 150,
            max: 4000
        },

        placamae: {
            min: 400,
            max: 8000
        }
    }

    const limite =
        limites[tipo]

    if (!limite) {
        return false
    }

    return (
        preco < limite.min ||
        preco > limite.max
    )
}

export function menorPreco(
    valores: PrecoLoja[]
): number {

    if (!valores?.length) {
        return 0
    }

    return Math.min(
        ...valores.map(
            valor => valor.preco
        )
    )
}

export function definirSocket(
    microarquitetura: string
): string {

    const texto =
        normalizarTexto(
            microarquitetura
        )

    for (const key in SOCKET_MAP) {

        if (texto.includes(key)) {
            return SOCKET_MAP[key]
        }
    }

    return "Desconhecido"
}

export function definirMarca(
    nome: string
): string {

    const texto =
        nome.toUpperCase()

    const marcas = [

        "AMD",
        "INTEL",
        "NVIDIA",
        "ASUS",
        "MSI",
        "GIGABYTE",
        "ASROCK",
        "CORSAIR",
        "KINGSTON",
        "SAMSUNG",
        "PNY"
    ]

    for (const marca of marcas) {

        if (texto.includes(marca)) {
            return marca
        }
    }

    if (
        texto.includes("RYZEN")
    ) {
        return "AMD"
    }

    if (
        texto.includes("CORE")
    ) {
        return "Intel"
    }

    if (
        texto.includes("RTX") ||
        texto.includes("GTX")
    ) {
        return "NVIDIA"
    }

    return "Genérico"
}

export function definirChipset(
    nome: string
): string {

    const match =
        nome.match(
            /\b(B650|B550|X670|X570|A620|A520|Z790|Z690|B760|B660|H610|H510|X870|B850)\b/i
        )

    return match?.[0]
        ?.toUpperCase() ?? ""
}

export function definirDDR(
    socket: string,
    chipset: string
): number {

    if (socket === "AM5") {
        return 5
    }

    if (socket === "AM4") {
        return 4
    }

    if (
        chipset.startsWith("Z7") ||
        chipset.startsWith("B7")
    ) {
        return 5
    }

    return 4
}

export function definirFormato(
    formato: string
): PlacaMae["formato"] {

    const texto =
        formato.toLowerCase()

    if (
        texto.includes("micro")
    ) {
        return "MicroATX"
    }

    if (
        texto.includes("mini")
    ) {
        return "MiniATX"
    }

    return "ATX"
}

export function definirCor(
    cor: string
): string {

    if (!cor) {
        return ""
    }

    const cores: Record<
        string,
        string
    > = {

        black: "Preto",
        white: "Branco",
        blue: "Azul",
        green: "Verde",
        red: "Vermelho",
        silver: "Prata",
        gray: "Cinza",
        grey: "Cinza",
        pink: "Rosa",
        purple: "Roxo",
        yellow: "Amarelo",
        orange: "Laranja",
        brown: "Marrom",
        gold: "Dourado",
        beige: "Bege"
    }

    return cor
        .split("/")
        .map(item => {

            const chave =
                item
                    .trim()
                    .toLowerCase()

            return (
                cores[chave] ??
                item.trim()
            )
        })
        .join(" / ")
}

export function extrairNumero(
    texto: string,
    regex: RegExp
): number {

    const match =
        texto.match(regex)

    return match
        ? Number(
            match[1]
                .replace(",", ".")
        )
        : 0
}

export function extrairTexto(
    texto: string,
    regex: RegExp
): string {

    const match =
        texto.match(regex)

    return match?.[1] ?? ""
}

export function extrairSocketCPU(
    texto: string
): string {

    const match =
        texto.match(
            /(AM4|AM5|LGA\s?1700|LGA\s?1851|LGA\s?1200)/i
        )

    return match
        ? match[0]
            .replace(/\s/g, "")
            .toUpperCase()
        : ""
}

export function extrairCoresCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /(\d+)\s*n[uú]cleos?/i
    )
}

export function extrairThreadsCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /(\d+)\s*threads?/i
    )
}

export function extrairClockCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /(\d+[,.]?\d*)\s*ghz/i
    )
}

export function extrairClockBoostCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /\(?(\d+[,.]?\d*)\s*ghz\)?\s*(max turbo|boost|max boost)/i
    )
}

export function extrairCacheCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /cache\s*(\d+)\s*mb/i
    )
}

export function extrairTDPCPU(
    texto: string
): number {

    return extrairNumero(
        texto,
        /(\d+)\s*w/i
    )
}

export function extrairVideoIntegradoCPU(
    texto: string
): boolean {

    const normalizado =
        normalizarTexto(texto)

    if (
        normalizado.includes(
            "sem video"
        )
    ) {
        return false
    }

    return (
        normalizado.includes(
            "video integrado"
        )
    )
}

export function extrairGddr(
    texto: string
): number {

    return extrairNumero(
        texto.toUpperCase(),
        /GDDR(\d)/i
    )
}

export function extrairVRAM(
    texto: string
): number {

    return extrairNumero(
        texto,
        /(\d+)\s?GB/i
    )
}

export function extrairModeloGPU(
    texto: string
): string {

    const match =
        texto.match(
            /(RTX|GTX|RX)\s?\d{3,4}(\s?TI)?/i
        )

    return match?.[0]
        ?.toUpperCase() ?? ""
}

export function extrairTDPGPU(
    texto: string
): number {

    const modelos: Record<
        string,
        number
    > = {

        "RTX 4090": 450,
        "RTX 4080": 320,
        "RTX 4070": 200,
        "RTX 4060": 115,

        "RX 7900 XTX": 355,
        "RX 7800 XT": 263,
        "RX 7700 XT": 245
    }

    const upper =
        texto.toUpperCase()

    for (const modelo in modelos) {

        if (
            upper.includes(modelo)
        ) {
            return modelos[modelo]
        }
    }

    return 0
}