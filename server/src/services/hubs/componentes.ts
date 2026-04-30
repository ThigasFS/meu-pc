import puppeteer from "puppeteer-extra"
import { Browser } from "puppeteer"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import { salvarPrecoProduto } from "../../database/salvarProduto"
import { scrapeKabum } from "../../scrapers/kabum"
import { scrapePichau } from "../../scrapers/pichau"
import { scrapeTerabyte } from "../../scrapers/terabyte"
import { ConfigComponente } from "../../interfaces/scraper"

puppeteer.use(StealthPlugin())

type ScraperFunction = (
    browser: Browser,
    nome: string,
    config: ConfigComponente
) => Promise<{
    imagem: string
    nomeEncontrado: string
    valor: {
        loja: string
        preco: number
        url: string
    } | null
}>

function nomesSaoCompativeis(
    nomeBuscado: string,
    nomeEncontrado: string,
    tipo: string
): boolean {
    const buscado = nomeBuscado.toLowerCase()
    const encontrado = nomeEncontrado.toLowerCase()

    let regexImportante: RegExp

    switch (tipo) {
        case "cpu":
            regexImportante =
                /ryzen|intel|core|x3d|athlon|\d{4,5}/i
            break

        case "gpu":
            regexImportante =
                /rtx|gtx|rx|\d{3,4}/i
            break

        case "placamae":
            regexImportante =
                /b\d{3}|x\d{3}|z\d{3}|h\d{3}|am4|am5|lga\d+/i
            break

        default:
            regexImportante = /\d|[a-z]{3,}/i
    }

    const partesImportantes = buscado
        .split(" ")
        .filter((p) => regexImportante.test(p))

    const acertos = partesImportantes.filter((p) =>
        encontrado.includes(p)
    )

    return acertos.length >=
        Math.ceil(partesImportantes.length * 0.7)
}

function definirMarca(nome: string): string {
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

    if (upper.includes("ASUS"))
        return "ASUS"

    if (upper.includes("MSI"))
        return "MSI"

    if (upper.includes("GIGABYTE"))
        return "Gigabyte"

    if (upper.includes("ASROCK"))
        return "ASRock"

    return "Genérico"
}

export async function atualizarComponente(
    lista: any[],
    config: ConfigComponente
) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-blink-features=AutomationControlled",
            "--start-maximized"
        ]
    })

    try {
        const batchSize = 3
        const itensTeste = lista.slice(0, 10) // Usado para demonstração

        const scrapers: ScraperFunction[] = [
            scrapeKabum,
            scrapePichau,
            scrapeTerabyte
        ]


        for (let i = 0; i < lista.length; i += batchSize) {
            const lote = lista.slice(i, i + batchSize)
            console.log(`[${config.tipo}] iniciando lote ${i}`)

            await Promise.all(
                lote.map(async item => {
                    try {
                        const resultados =
                            await Promise.allSettled(
                                scrapers.map(scraper =>
                                    scraper(
                                        browser,
                                        item.name,
                                        config
                                    )
                                )
                            )

                        for (const resultado of resultados) {
                            if (
                                resultado.status !==
                                "fulfilled"
                            ) {
                                console.error(
                                    "Erro scraper:",
                                    resultado.reason
                                )
                                continue
                            }

                            const dados =
                                resultado.value

                            const nomeValido =
                                nomesSaoCompativeis(
                                    item.name,
                                    dados.nomeEncontrado,
                                    config.tipo
                                )

                            if (
                                !nomeValido ||
                                !dados.valor
                            ) {
                                continue
                            }

                            await salvarPrecoProduto({
                                nome: item.name,
                                tipo: config.tipo,
                                marca: definirMarca(
                                    item.name
                                ),
                                loja: dados.valor.loja,
                                preco:
                                    dados.valor.preco,
                                imagem:
                                    dados.imagem,
                                url: dados.valor.url
                            })

                            console.log(
                                `✔ ${dados.valor.loja}: ${item.name}`
                            )
                        }
                    } catch (error) {
                        console.error(
                            `Erro geral item ${item.name}:`,
                            error
                        )
                    }
                })
            )
        }

        console.log(
            `✔ Scraping ${config.tipo} finalizado`
        )
    } finally {
        await browser.close()
    }
}