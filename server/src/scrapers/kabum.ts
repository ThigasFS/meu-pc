import { Browser } from "puppeteer"
import { ResultadoScraper } from "../interfaces/scraper"
import { extrairSpecs } from "../utils/extrairSpecs"

export async function scrapeKabum(
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

        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })

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
                                el.querySelector(
                                    ".line-clamp-2"
                                )
                                    ?.textContent
                                    ?.trim() ?? ""

                            const imagem =
                                el.querySelector("img")
                                    ?.getAttribute("src") ?? ""

                            const href =
                                el.getAttribute("href") ?? ""

                            const spansPreco =
                                Array.from(
                                    el.querySelectorAll(
                                        ".text-base.font-semibold.text-gray-800"
                                    )
                                )

                            const precoTexto =
                                spansPreco[1]
                                    ?.textContent
                                    ?.trim() ?? ""

                            const preco =
                                Number(
                                    precoTexto
                                        .replace(/\./g, "")
                                        .replace(",", ".")
                                )

                            return {
                                nomeEncontrado,
                                imagem,

                                specs: {},

                                valor: {
                                    loja: "Kabum",
                                    preco,
                                    url:
                                        `https://www.kabum.com.br${href}`
                                }
                            }
                        })
                        .filter(p =>
                            p.nomeEncontrado &&
                            p.valor.preco > 0
                        )
                }
            )

        return produtos

    } finally {

        await page.close()
    }
}