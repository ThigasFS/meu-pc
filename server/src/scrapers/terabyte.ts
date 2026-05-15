import { Browser } from "puppeteer"
import { ResultadoScraper } from "../interfaces/scraper"

export async function scrapeTerabyte(
    browser: Browser,
    url: string,
    seletorProduto: string
): Promise<ResultadoScraper[]> {

    const page = await browser.newPage()

    try {

        await page.setViewport({
            width: 1920,
            height: 1080
        })

        await page.goto(url, {
            waitUntil: "networkidle2"
        })

        await new Promise(resolve =>
            setTimeout(resolve, 3000)
        )

        await page.waitForSelector(seletorProduto)

        const produtos = await page.$$eval(
            seletorProduto,
            (elementos) => {

                return elementos.map((el) => {

                    const nomeEncontrado =
                        el.getAttribute("title")
                            ?.trim() ?? ""

                    const imagem =
                        el.querySelector("img")
                            ?.getAttribute("src") ?? ""

                    const href =
                        el.getAttribute("href") ?? ""

                    const container =
                        el.closest(".pbox")

                    const precoTexto =
                        container
                            ?.querySelector(
                                ".prod-new-price span"
                            )
                            ?.textContent
                            ?.trim() ?? ""

                    const preco = Number(
                        precoTexto
                            .replace(/[^\d,]/g, "")
                            .replace(/\./g, "")
                            .replace(",", ".")
                    )

                    return {

                        nomeEncontrado,
                        imagem,

                        specs: {},

                        valor: {
                            loja: "Terabyte",
                            preco,
                            url: href
                        }
                    }
                })
            }
        )

        return produtos.filter(
            p =>
                p.nomeEncontrado &&
                p.valor.preco > 0
        )

    } finally {

        await page.close()
    }
}