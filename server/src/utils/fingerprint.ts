import crypto from "crypto"

function limparTexto(nome: string) {
    return nome
        .toLowerCase()

        // remove acentos
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        // remove separadores
        .replace(/[(),]/g, " ")

        // remove múltiplos espaços
        .replace(/\s+/g, " ")

        .trim()
}

function removerRuidoUniversal(nome: string) {
    return nome

        // textos genéricos
        .replace(/processador/gi, "")
        .replace(/placa de video/gi, "")
        .replace(/placa mae/gi, "")
        .replace(/memoria/gi, "")
        .replace(/ssd/gi, "")
        .replace(/fonte/gi, "")
        .replace(/gabinete/gi, "")
        .replace(/water cooler/gi, "")
        .replace(/cooler/gi, "")

        // marketing
        .replace(/rgb/gi, "")
        .replace(/led/gi, "")
        .replace(/gaming/gi, "")
        .replace(/gamer/gi, "")

        // frequências
        .replace(/\d+(\.\d+)?\s*ghz/gi, "")
        .replace(/\d+(\.\d+)?\s*mhz/gi, "")

        // cache
        .replace(/cache\s*\d+\s*mb/gi, "")

        // socket/platform
        .replace(/am4/gi, "")
        .replace(/am5/gi, "")
        .replace(/lga\s?1700/gi, "")
        .replace(/ddr4/gi, "")
        .replace(/ddr5/gi, "")

        // termos irrelevantes
        .replace(/box/gi, "")
        .replace(/oem/gi, "")
        .replace(/tray/gi, "")
        .replace(/wof/gi, "")
        .replace(/sem video/gi, "")
        .replace(/video integrado/gi, "")
}

function normalizarModelo(
    tipo: string,
    nome: string
) {
    let texto =
        limparTexto(nome)

    texto =
        removerRuidoUniversal(texto)

    switch (tipo) {
        case "cpu":
            return texto
                .match(
                    /(ryzen\s?[3579]\s?\d{4,5}[a-z0-9\-]*|i[3579][\-\s]?\d{4,5}[a-z0-9\-]*|ultra\s?[3579]\s?\d{3}[a-z0-9\-]*)/i
                )?.[0]
                ?.replace(/\s+/g, " ")
                ?.trim() ?? texto

        case "gpu":
            return texto
                .match(
                    /(rtx\s?\d{4}\s?(ti|super)?|rx\s?\d{4}\s?(xt|gre)?)/i
                )?.[0]
                ?.replace(/\s+/g, " ")
                ?.trim() ?? texto

        case "ram":
            return texto
                .match(
                    /(\d+\s?gb.*?\d{4,5})/i
                )?.[0]
                ?.replace(/\s+/g, " ")
                ?.trim() ?? texto

        case "ssd":
            return texto
                .match(
                    /(\d+\s?(tb|gb))/i
                )?.[0]
                ?.replace(/\s+/g, " ")
                ?.trim() ?? texto

        case "psu":
            return texto
                .match(
                    /(\d{3,4}w)/i
                )?.[0]
                ?.replace(/\s+/g, " ")
                ?.trim() ?? texto

        default:
            return texto
                .replace(/\s+/g, " ")
                .trim()
    }
}

export function gerarFingerprintProduto(
    tipo: string,
    nome: string
) {
    const modelo =
        normalizarModelo(tipo, nome)

    return crypto
        .createHash("sha256")
        .update(`${tipo}-${modelo}`)
        .digest("hex")
}