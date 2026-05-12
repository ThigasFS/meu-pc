import { PlacaMae, PrecoLoja } from "../interfaces/componente"

export const SOCKET_MAP: Record<string, string> = {
    // AMD
    "zen 5": "AM5",
    "zen 4": "AM5",
    "zen 3": "AM4",
    "zen 2": "AM4",
    "zen+": "AM4",
    "zen": "AM4",

    "bulldozer": "AM3+",
    "piledriver": "AM3+",
    "steamroller": "FM2+",
    "excavator": "FM2+",
    "jaguar": "AM1",

    "k10": "AM3",

    // Intel Desktop Mainstream
    "arrow lake": "LGA1851",
    "raptor lake refresh": "LGA1700",
    "raptor lake": "LGA1700",
    "alder lake": "LGA1700",
    "rocket lake": "LGA1200",
    "comet lake": "LGA1200",

    "coffee lake refresh": "LGA1151",
    "coffee lake": "LGA1151",
    "kaby lake": "LGA1151",
    "skylake": "LGA1151",

    "broadwell": "LGA1150",
    "haswell refresh": "LGA1150",
    "haswell": "LGA1150",

    "ivy bridge": "LGA1155",
    "sandy bridge": "LGA1155",

    "westmere": "LGA1156",
    "nehalem": "LGA1156",

    "wolfdale": "LGA775",
    "yorkfield": "LGA775",
    "core": "LGA775",

    // Intel HEDT / Enthusiast
    "cascade lake": "LGA2066"
}

// Normalização
export function normalizarTexto(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
}

export function removerCaracteresEspeciais(texto: string): string {
    return texto.replace(/[^\w\s]/gi, "")
}

// Definir

export function definirSocket(microarquitetura: string): string {
    const arch = microarquitetura.toLowerCase().trim()

    for (const key in SOCKET_MAP) {
        if (arch.includes(key)) {
            return SOCKET_MAP[key]
        }
    }

    return "Desconhecido"
}

export function definirMarca(nome: string): string {
    const upper = nome.toUpperCase()

    if (upper.includes("AMD") || upper.includes("RYZEN"))
        return "AMD"

    if (upper.includes("INTEL") || upper.includes("CORE"))
        return "Intel"

    if (
        upper.includes("NVIDIA") ||
        upper.includes("RTX") ||
        upper.includes("GTX")
    )
        return "NVIDIA"

    if (upper.includes("ASUS")) return "ASUS"
    if (upper.includes("MSI")) return "MSI"
    if (upper.includes("GIGABYTE")) return "Gigabyte"
    if (upper.includes("ASROCK")) return "ASRock"
    if (upper.includes("CORSAIR")) return "Corsair"
    if (upper.includes("T-FORCE")) return "T-Force"
    if (upper.includes("KINGSTON")) return "Kingston"
    if (upper.includes("SAMSUNG")) return "Samsung"
    if (upper.includes("G.SKILL")) return "G.Skill"
    if (upper.includes("PNY")) return "PNY"

    return "Genérico"
}

export function definirChipset(nome: string): string {
    const match = nome.match(
        /\b(B650|B550|X670|X570|A620|Z790|Z690|B760|B660|H610)\b/i
    )

    return match?.[0].toUpperCase() ?? "Desconhecido"
}

export function definirDDR(socket: string, chipset: string): number {
    if (socket === "AM5") return 5
    if (socket === "AM4") return 4

    if (chipset.startsWith("Z7")) return 5
    if (chipset.startsWith("B7")) return 5

    return 4
}

export function definirFormato(form: string): PlacaMae["formato"] {
    const f = form.toLowerCase()

    if (f.includes("micro")) return "MicroATX"
    if (f.includes("mini")) return "MiniATX"

    return "ATX"
}

export function definirCor(color: string): string {
    if (!color) return ''

    const cores: Record<string, string> = {
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

    return color
        .split("/")
        .map(cor => {
            const corFormatada = cor.trim().toLowerCase()
            return cores[corFormatada] ?? cor.trim()
        })
        .join(" / ")
}

export function menorPreco(valores: PrecoLoja[]): number {
    if (!valores?.length) return 0
    return Math.min(...valores.map(v => v.preco))
}

// Extrair

export function extrairGddr(nome: string): number {
    const match = nome.toUpperCase().match(/GDDR(\d)/)
    return match ? Number(match[1]) : 0
}

export function extrairTdp(texto: string): number | undefined {
    const match = texto.match(/(\d{2,4})\s?W/i)
    return match ? Number(match[1]) : undefined
}

export function extrairVRAM(texto: string): number {
    const match = texto.match(/(\d+)\s?GB/i)
    return match ? Number(match[1]) : 0
}

export function extrairModeloGPU(texto: string): string {
    const match = texto.match(
        /(RTX|GTX|RX)\s?\d{3,4}(\s?TI)?/i
    )

    return match?.[0]?.toUpperCase() ?? ""
}

export function extrairModeloCPU(texto: string): string {
    const match = texto.match(
        /(i[3579]-\d{4,5}[A-Z]*|RYZEN\s?[3579]\s?\d{4,5}[A-Z0-9]*)/i
    )

    return match?.[0]?.toUpperCase() ?? ""
}

export function extrairGeracaoIntel(texto: string): number {
    const match = texto.match(/i[3579]-(\d{4,5})/i)

    if (!match) return 0

    const numero = match[1]

    return numero.length === 5
        ? Number(numero[0] + numero[1])
        : Number(numero[0])
}

export function extrairSerieRyzen(texto: string): number {
    const match = texto.match(/RYZEN\s?[3579]\s(\d{4})/i)

    return match ? Number(match[1][0]) : 0
}

export function extrairDDRRAM(
    valor: string | number[] | undefined | null
): number {

    if (!valor) return 0

    if (Array.isArray(valor)) {
        return valor?.[0] ?? 0
    }

    if (typeof valor !== "string") {
        return 0
    }

    const match = valor.match(/DDR(\d)/i)

    return match ? Number(match[1]) : 0
}

export function extrairClockRAM(
    valor: string | number[] | undefined | null
): number {

    if (!valor) return 0

    if (Array.isArray(valor)) {
        return valor?.[1] ?? 0
    }

    if (typeof valor !== "string") {
        return 0
    }

    const match =
        valor.match(/(\d{4,5})\s?(MHz|MT\/s)?/i)

    return match ? Number(match[1]) : 0
}

export function extrairModulosRAM(
    valor: string | number[] | undefined | null
): number[] {

    if (!valor) return []

    if (Array.isArray(valor)) {
        return valor
    }

    if (typeof valor !== "string") {
        return []
    }

    const match =
        valor.match(/(\d+)x(\d+)/i)

    if (!match) return []

    return [
        Number(match[1]),
        Number(match[2])
    ]
}

export function extrairCapacidadeRAM(
    valor: string | number[] | undefined | null
): number {

    if (!valor) return 0

    if (Array.isArray(valor)) {
        const quantidade = valor?.[0] ?? 0
        const capacidade = valor?.[1] ?? 0

        return quantidade * capacidade
    }

    if (typeof valor !== "string") {
        return 0
    }

    const match =
        valor.match(/(\d+)\s?GB/i)

    return match ? Number(match[1]) : 0
}

export function extrairChipset(nome: string): string {
    const match = nome.match(
        /\b(B650|B550|X670|X570|A620|A520|Z790|Z690|B760|B660|H610|H510|X870|B850)\b/i
    )

    return match?.[0].toUpperCase() ?? ""
}

export function extrairVelocidadeRAM(texto: string): number {
    const match = texto.match(/(\d{4,5})\s?MHZ/i)

    return match ? Number(match[1]) : 0
}

export function extrairDDRMB(texto: string): number {
    const match = texto.match(/DDR(\d)/i)

    return match ? Number(match[1]) : 0
}

export function extrairCL(texto: string): number {
    const match = texto.match(/CL(\d+)/i)

    return match ? Number(match[1]) : 0
}

export function extrairCapacidadeStorage(
    texto: string
): number {

    const matchTB = texto.match(/(\d+)\s?TB/i)

    if (matchTB) {
        return Number(matchTB[1]) * 1000
    }

    const matchGB = texto.match(/(\d+)\s?GB/i)

    return matchGB ? Number(matchGB[1]) : 0
}

export function extrairInterfaceStorage(
    texto: string
): string {

    const normalizado =
        normalizarTexto(texto)

    if (
        normalizado.includes("nvme") ||
        normalizado.includes("m.2")
    ) {
        return "NVME"
    }

    return "SATA"
}

export function extrairFormatoStorage(
    texto: string
): string {

    if (texto.includes("2.5")) {
        return "2.5"
    }

    if (texto.includes("3.5")) {
        return "3.5"
    }

    return "M2"
}

export function extrairTipoStorage(
    texto: string
): string {

    const normalizado =
        normalizarTexto(texto)

    if (
        normalizado.includes("ssd") ||
        normalizado.includes("nvme")
    ) {
        return "SSD"
    }

    return "HD"
}

export function extrairPotenciaFonte(
    texto: string
): number {

    const match =
        texto.match(/(\d{3,4})\s?W/i)

    return match ? Number(match[1]) : 0
}

export function extrairCertificacaoFonte(
    texto: string
): string {

    const match = texto.match(
        /(bronze|gold|silver|platinum|titanium)/i
    )

    return match?.[0]?.toUpperCase() ?? ""
}

export function extrairModularidadeFonte(
    texto: string
): string {

    const normalizado =
        normalizarTexto(texto)

    if (normalizado.includes("full")) {
        return "Full Modular"
    }

    if (normalizado.includes("semi")) {
        return "Semi Modular"
    }

    return "Não Modular"
}

export function extrairFormatoGabinete(
    texto: string
): string {

    if (texto.includes("Mini")) {
        return "Mini Tower"
    }

    if (texto.includes("Mid")) {
        return "Mid Tower"
    }

    return "Full Tower"
}

export function extrairTamanhoGabinete(
    volume: number
): string {

    if (volume >= 40) {
        return "Grande"
    }

    if (volume >= 25) {
        return "Médio"
    }

    return "Compacto"
}