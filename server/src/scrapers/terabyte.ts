import puppeteer, { Browser } from "puppeteer"
import {
    ConfigComponente,
    ResultadoScraper
} from "../interfaces/scraper"
import { aguardarResultadoBusca } from "../utils/aguardarResultadoBusca"
import { extrairGddr, extrairTdp } from "../utils/componenteUtils"

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

        const status = await aguardarResultadoBusca(
            page,
            ".product-item",
            [
                "nenhum produto encontrado",
                "não encontramos",
                "sugestões encontradas"
            ]
        );

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

        let tdp: number | undefined
        let gddr: number | undefined

        if (config.extrairTdp || config.extrairGddr) {
            const paginaProduto = await browser.newPage()

            try {
                await paginaProduto.goto(resultado.url, {
                    waitUntil: "domcontentloaded"
                })

                const texto = await paginaProduto.evaluate(() => document.body.innerText)

                if (config.extrairTdp) {
                    tdp = extrairTdp(texto)
                }

                if (config.extrairGddr) {
                    gddr = extrairGddr(texto)
                }

            } catch (err) {
                console.error("Erro ao extrair specs:", err)
            } finally {
                await paginaProduto.close()
            }
        }

        return {
            imagem: resultado.imagem,
            nomeEncontrado: resultado.nomeEncontrado,
            tdp,
            gddr,
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