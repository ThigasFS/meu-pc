import { Browser } from "puppeteer"
import { ResultadoScraper } from "../interfaces/scraper"

export async function scrapeTerabyte(
    browser: Browser,
    url: string,
    seletorProduto: string
): Promise<ResultadoScraper[]> {

    const page = await browser.newPage()

    try {

        await page.goto(url, {
            waitUntil: "domcontentloaded"
        })

        await page.waitForSelector(seletorProduto)

        const produtos =
            await page.$$eval(
                seletorProduto,
                elementos => {

                    return elementos
                        .map(el => {

                            const nomeEncontrado =
                                el.textContent
                                    ?.trim() ?? ""

                            const imagem =
                                el.querySelector("img")
                                    ?.getAttribute("src") ?? ""

                            const href =
                                el.getAttribute("href") ?? ""

                            return {
                                nomeEncontrado,
                                imagem,

                                specs: {},

                                valor: {
                                    loja: "Terabyte",
                                    preco: 0,
                                    url: href
                                }
                            }
                        })
                        .filter(p =>
                            p.nomeEncontrado
                        )
                }
            )

        return produtos

    } finally {

        await page.close()
    }
}