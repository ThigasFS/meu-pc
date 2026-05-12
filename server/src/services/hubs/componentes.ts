import puppeteer from "puppeteer-extra"
import { Browser } from "puppeteer"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import { salvarPrecoProduto } from "../../database/salvarProduto"
import { scrapeKabum } from "../../scrapers/kabum"
import { scrapePichau } from "../../scrapers/pichau"
import { scrapeTerabyte } from "../../scrapers/terabyte"
import { ConfigComponente } from "../../interfaces/scraper"
import { definirMarca } from "../../utils/componenteUtils"
import { validarMatching } from "../../matching"

puppeteer.use(StealthPlugin())

type ScraperFunction = (
    browser: Browser,
    nome: string,
    config: ConfigComponente
) => Promise<{
    imagem: string
    nomeEncontrado: string

    tdp?: number
    gddr?: number

    velocidadeLeitura?: number
    velocidadeGravacao?: number

    qtdFans?: number

    pcieConectores?: number
    sataConectores?: number
    epsConectores?: number

    valor: {
        loja: string
        preco: number
        url: string
    } | null
}>

export async function atualizarComponente(
    lista: any[],
    config: ConfigComponente
) {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-blink-features=AutomationControlled",
            "--start-maximized"
        ]
    })

    try {
        const batchSize = 1
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
                                validarMatching(
                                    config.tipo,
                                    item.name,
                                    dados.nomeEncontrado
                                )

                            console.log({
                                buscado: item.name,
                                encontrado: dados.nomeEncontrado,
                                valido: nomeValido
                            })

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
                                preco: dados.valor.preco,
                                imagem: dados.imagem,
                                url: dados.valor.url,

                                tdp: dados.tdp ?? null,
                                gddr: dados.gddr ?? null,

                                velocidadeLeitura:
                                    dados.velocidadeLeitura ?? null,

                                velocidadeGravacao:
                                    dados.velocidadeGravacao ?? null,

                                qtdFans:
                                    dados.qtdFans ?? null,

                                pcieConectores:
                                    dados.pcieConectores ?? null,

                                sataConectores:
                                    dados.sataConectores ?? null,

                                epsConectores:
                                    dados.epsConectores ?? null
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