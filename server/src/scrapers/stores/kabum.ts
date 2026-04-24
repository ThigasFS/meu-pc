import puppeteer from "puppeteer"
import { Scraper, Product } from "../interfaces/Scraper"
import { waitProducts } from "../utils/waitProducts"
import { STORE_URLS } from "../constants/urls"
import { cleanProductName } from "../utils/cleanProductsName"

export class KabumScraper implements Scraper {
    async scrape(): Promise<Product[]> {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                "--no-sandbox",
                "--disable-blink-features=AutomationControlled"
            ]
        })

        const page = await browser.newPage()

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )

        await page.goto(STORE_URLS.kabum, {
            waitUntil: "networkidle2"
        })

        await waitProducts(page)

        const produtos = await page.$$eval(
            'a[href*="/produto/"]',
            els => {
                const lista = els
                    .map(el => {
                        const href = el.getAttribute("href") || ""

                        const nomeEl = el.querySelector('span.sc-cdc9b13f-3, [class*="ProductName"], h2, span')
                        const nome = nomeEl?.textContent?.replace(/\s+/g, " ").trim()
                            || el.getAttribute("title")
                            || ""

                        const textoPreco = el.textContent?.match(/R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}/g)

                        const preco = textoPreco?.length
                            ? Number(
                                textoPreco[textoPreco.length - 1]
                                    .replace("R$", "")
                                    .replace(/\s/g, "")
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                            )
                            : null

                        return {
                            nome,
                            preco,
                            imagem: "",
                            url: href,
                            loja: "Kabum"
                        }
                    })
                    .filter(item =>
                        item.url.includes("/produto/") &&
                        item.nome &&
                        /(Ryzen|Core i\d|Core Ultra|Athlon)/i.test(item.nome)
                    )

                return Array.from(
                    new Map(lista.map(item => [item.url, item])).values()
                )
            }
        )

        const produtosLimpos = produtos.map(produto => ({
            ...produto,
            nome: cleanProductName(produto.nome)
        }))

        await browser.close()

        return produtosLimpos
    }
}