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

    return "Genérico"
}

export function menorPreco(valores: PrecoLoja[]): number {
    if (!valores?.length) return 0
    return Math.min(...valores.map(v => v.preco))
}

export function extrairGddr(nome: string): number {
    const match = nome.toUpperCase().match(/GDDR(\d)/)
    return match ? Number(match[1]) : 0
}

export function extrairTdp(texto: string): number | undefined {
    const match = texto.match(/(\d{2,4})\s?W/i)
    return match ? Number(match[1]) : undefined
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