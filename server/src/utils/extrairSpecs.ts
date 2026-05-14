import { PlacaMae, PrecoLoja } from "../interfaces/componente"

// ======================================================
// MAPS
// ======================================================

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

    // Intel
    "arrow lake": "LGA1851",
    "raptor lake": "LGA1700",
    "alder lake": "LGA1700",
    "rocket lake": "LGA1200",
    "comet lake": "LGA1200",

    "coffee lake": "LGA1151",
    "kaby lake": "LGA1151",
    "skylake": "LGA1151"
}

// ======================================================
// TEXTO
// ======================================================

export function normalizarTexto(
    texto: string
): string {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
}

export function removerCaracteresEspeciais(
    texto: string
): string {

    return texto.replace(/[^\w\s]/gi, "")
}

// ======================================================
// VALIDAÇÕES
// ======================================================

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
    ].some(p =>
        texto.includes(p)
    )
}

export function precoSuspeito(
    tipo: string,
    preco: number
): boolean {

    const limites: Record<
        string,
        { min: number, max: number }
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

// ======================================================
// DEFINIR
// ======================================================

export function definirSocket(
    microarquitetura: string
): string {

    const arch =
        microarquitetura
            .toLowerCase()
            .trim()

    for (const key in SOCKET_MAP) {

        if (arch.includes(key)) {
            return SOCKET_MAP[key]
        }
    }

    return "Desconhecido"
}

export function definirMarca(
    nome: string
): string {

    const upper =
        nome.toUpperCase()

    if (
        upper.includes("AMD") ||
        upper.includes("RYZEN")
    ) {
        return "AMD"
    }

    if (
        upper.includes("INTEL") ||
        upper.includes("CORE")
    ) {
        return "Intel"
    }

    if (
        upper.includes("RTX") ||
        upper.includes("GTX") ||
        upper.includes("NVIDIA")
    ) {
        return "NVIDIA"
    }

    if (upper.includes("RADEON")) {
        return "AMD"
    }

    if (upper.includes("ASUS")) return "ASUS"
    if (upper.includes("MSI")) return "MSI"
    if (upper.includes("GIGABYTE")) return "Gigabyte"
    if (upper.includes("ASROCK")) return "ASRock"
    if (upper.includes("CORSAIR")) return "Corsair"
    if (upper.includes("KINGSTON")) return "Kingston"
    if (upper.includes("SAMSUNG")) return "Samsung"

    return "Genérico"
}

export function definirChipset(
    nome: string
): string {

    const match =
        nome.match(
            /\b(B650|B550|X670|X570|A620|Z790|Z690|B760|B660|H610)\b/i
        )

    return match?.[0]?.toUpperCase()
        ?? "Desconhecido"
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

    if (chipset.startsWith("Z7")) {
        return 5
    }

    if (chipset.startsWith("B7")) {
        return 5
    }

    return 4
}

export function definirFormato(
    form: string
): PlacaMae["formato"] {

    const f =
        form.toLowerCase()

    if (f.includes("micro")) {
        return "MicroATX"
    }

    if (f.includes("mini")) {
        return "MiniATX"
    }

    return "ATX"
}

export function definirCor(
    color: string
): string {

    if (!color) {
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

    return color
        .split("/")
        .map(cor => {

            const formatada =
                cor.trim().toLowerCase()

            return (
                cores[formatada]
                ?? cor.trim()
            )
        })
        .join(" / ")
}

export function menorPreco(
    valores: PrecoLoja[]
): number {

    if (!valores?.length) {
        return 0
    }

    return Math.min(
        ...valores.map(v => v.preco)
    )
}

// ======================================================
// CPU
// ======================================================

export function extrairModeloCPU(
    texto: string
): string {

    const match =
        texto.match(
            /(i[3579]-\d{4,5}[A-Z]*|RYZEN\s?[3579]\s?\d{4,5}[A-Z0-9]*)/i
        )

    return match?.[0]?.toUpperCase()
        ?? ""
}

export function extrairSocketCPU(
    texto: string
): string {

    const match =
        texto.match(
            /(AM5|AM4|LGA1700|LGA1851|LGA1200|LGA1151)/i
        )

    return match?.[0]?.toUpperCase()
        ?? ""
}

export function extrairTDPCPU(
    texto: string
): number {

    const match =
        texto.match(
            /(\d{2,3})\s?W/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairGeracaoIntel(
    texto: string
): number {

    const match =
        texto.match(
            /i[3579]-(\d{4,5})/i
        )

    if (!match) {
        return 0
    }

    const numero =
        match[1]

    return numero.length === 5
        ? Number(numero.slice(0, 2))
        : Number(numero[0])
}

export function extrairSerieRyzen(
    texto: string
): number {

    const match =
        texto.match(
            /RYZEN\s?[3579]\s(\d{4})/i
        )

    return match
        ? Number(match[1][0])
        : 0
}

// ======================================================
// GPU
// ======================================================

export function extrairModeloGPU(
    texto: string
): string {

    const match =
        texto.match(
            /(RTX|GTX|RX)\s?\d{3,4}(\s?TI)?/i
        )

    return match?.[0]?.toUpperCase()
        ?? ""
}

export function extrairGddr(
    texto: string
): number {

    const match =
        texto.toUpperCase()
            .match(/GDDR(\d)/)

    return match
        ? Number(match[1])
        : 0
}

export function extrairVRAM(
    texto: string
): number {

    const match =
        texto.match(
            /(\d+)\s?GB/i
        )

    return match
        ? Number(match[1])
        : 0
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

        if (upper.includes(modelo)) {
            return modelos[modelo]
        }
    }

    return 0
}

// ======================================================
// RAM
// ======================================================

export function extrairDDRRAM(
    texto: string
): number {

    const match =
        texto.match(/DDR(\d)/i)

    return match
        ? Number(match[1])
        : 0
}

export function extrairClockRAM(
    texto: string
): number {

    const match =
        texto.match(
            /(\d{4,5})\s?(MHz|MT\/s)?/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairVelocidadeRAM(
    texto: string
): number {

    return extrairClockRAM(texto)
}

export function extrairModulosRAM(
    texto: string
): number[] {

    const match =
        texto.match(
            /(\d+)x(\d+)/i
        )

    if (!match) {
        return []
    }

    return [
        Number(match[1]),
        Number(match[2])
    ]
}

export function extrairCapacidadeRAM(
    texto: string
): number {

    const match =
        texto.match(
            /(\d+)\s?GB/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairCL(
    texto: string
): number {

    const match =
        texto.match(
            /CL(\d+)/i
        )

    return match
        ? Number(match[1])
        : 0
}

// ======================================================
// PLACA MÃE
// ======================================================

export function extrairChipset(
    texto: string
): string {

    const match =
        texto.match(
            /\b(B650|B550|X670|X570|A620|A520|Z790|Z690|B760|B660|H610|H510|X870|B850)\b/i
        )

    return match?.[0]?.toUpperCase()
        ?? ""
}

export function extrairDDRMB(
    texto: string
): number {

    const match =
        texto.match(/DDR(\d)/i)

    return match
        ? Number(match[1])
        : 0
}

// ======================================================
// STORAGE
// ======================================================

export function extrairCapacidadeStorage(
    texto: string
): number {

    const matchTB =
        texto.match(
            /(\d+)\s?TB/i
        )

    if (matchTB) {
        return Number(matchTB[1]) * 1000
    }

    const matchGB =
        texto.match(
            /(\d+)\s?GB/i
        )

    return matchGB
        ? Number(matchGB[1])
        : 0
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

export function extrairVelocidadeLeitura(
    texto: string
): number {

    const match =
        texto.match(
            /leitura[^0-9]*(\d{3,5})\s*mb\/s/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairVelocidadeGravacao(
    texto: string
): number {

    const match =
        texto.match(
            /grava[cç][aã]o[^0-9]*(\d{3,5})\s*mb\/s/i
        )

    return match
        ? Number(match[1])
        : 0
}

// ======================================================
// FONTE
// ======================================================

export function extrairPotenciaFonte(
    texto: string
): number {

    const match =
        texto.match(
            /(\d{3,4})\s?W/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairCertificacaoFonte(
    texto: string
): string {

    const match =
        texto.match(
            /(bronze|gold|silver|platinum|titanium)/i
        )

    return match?.[0]?.toUpperCase()
        ?? ""
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

export function extrairPCIeConectores(
    texto: string
): number {

    const match =
        texto.match(
            /(\d+)\s*x?\s*pcie/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairSATAConectores(
    texto: string
): number {

    const match =
        texto.match(
            /(\d+)\s*x?\s*sata/i
        )

    return match
        ? Number(match[1])
        : 0
}

export function extrairEPSConectores(
    texto: string
): number {

    const match =
        texto.match(
            /(\d+)\s*x?\s*eps/i
        )

    return match
        ? Number(match[1])
        : 0
}

// ======================================================
// GABINETE
// ======================================================

export function extrairQtdFans(
    texto: string
): number {

    const suporte =
        texto.match(
            /suporte.*?(\d+)\s*fans?/i
        )

    if (suporte) {
        return Number(suporte[1])
    }

    const frontal =
        texto.match(
            /(\d+)x120mm/i
        )

    if (frontal) {
        return Number(frontal[1])
    }

    return 0
}

export function extrairFormatoGabinete(
    texto: string
): string {

    const normalizado =
        normalizarTexto(texto)

    if (
        normalizado.includes("mini")
    ) {
        return "Mini Tower"
    }

    if (
        normalizado.includes("mid")
    ) {
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