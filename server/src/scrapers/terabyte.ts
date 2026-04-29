import puppeteer, { Browser } from "puppeteer"
import {
    ConfigComponente,
    ResultadoScraper
} from "../interfaces/scraper"

export async function scrapeTerabyte(
    browser: Browser,
    nome: string,
    config: ConfigComponente
): Promise<ResultadoScraper> {

    const page = await browser.newPage()

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )

    try {
        const busca = `https://www.terabyteshop.com.br/busca?str=${encodeURIComponent(nome)}`

        await page.goto(busca, {
            waitUntil: "networkidle2"
        })

        const seletor = `a[href*="${config.seletorTerabyte}"]`

        await page.waitForSelector(seletor)

        const resultado = await page.$eval(
            seletor,
            el => {
                const nomeEncontrado =
                    el.textContent?.trim() ?? ""

                const href =
                    el.getAttribute("href") ?? ""

                const imagem =
                    el.querySelector("img")?.getAttribute("src") ?? ""

                const precoTexto =
                    el.textContent?.match(/\d{1,3}(?:\.\d{3})*,\d{2}/)?.[0]

                const preco = precoTexto
                    ? Number(
                          precoTexto
                              .replace(/\./g, "")
                              .replace(",", ".")
                      )
                    : 0

                return {
                    nomeEncontrado,
                    preco,
                    imagem,
                    url: href.startsWith("http")
                        ? href
                        : `https://www.terabyteshop.com.br${href}`
                }
            }
        )

        return {
            imagem: resultado.imagem,
            nomeEncontrado: resultado.nomeEncontrado,
            valor: {
                loja: "Terabyte",
                preco: resultado.preco,
                url: resultado.url
            }
        }
    } finally {
        await page.close()
    }
}