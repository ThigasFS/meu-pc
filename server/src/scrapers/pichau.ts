import { Browser } from "puppeteer"
import { ResultadoScraper } from "../interfaces/scraper"

export async function scrapePichau(
    browser: Browser,
    url: string,
    seletorProduto: string
): Promise<ResultadoScraper[]> {

    const page =
        await browser.newPage()

    try {

        await page.setViewport({
            width: 1920,
            height: 1080
        })

        await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 60000
        })

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )

        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        )

        await autoScroll(page)

        const seletores = [
            seletorProduto,
            'a[data-cy="list-product"]',
            'a[href*="/produto/"]'
        ]

        let seletorFinal = ""

        for (const seletor of seletores) {

            try {

                await page.waitForSelector(
                    seletor,
                    {
                        timeout: 10000
                    }
                )

                seletorFinal = seletor
                break

            } catch { }
        }

        if (!seletorFinal) {

            console.log(
                "Nenhum seletor encontrado na Pichau"
            )

            return []
        }

        const produtos =
            await page.$$eval(
                seletorFinal,
                elementos => {

                    return elementos.map(el => {

                        const nome =
                            el.querySelector(
                                "h2, .MuiTypography-root, [class*=name]"
                            )
                                ?.textContent
                                ?.trim() ?? ""

                        const imagem =
                            el.querySelector("img")
                                ?.getAttribute("src") ?? ""

                        const href =
                            el.getAttribute("href") ?? ""

                        const textoPreco =
                            el.textContent
                                ?.match(
                                    /R\$\s?[\d\.]+,\d{2}/
                                )?.[0] ?? ""

                        const preco =
                            Number(
                                textoPreco
                                    .replace("R$", "")
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                                    .trim()
                            )

                        return {
                            nomeEncontrado: nome,
                            imagem,

                            specs: {},

                            valor: {
                                loja: "Pichau",
                                preco,

                                url:
                                    href.startsWith("http")
                                        ? href
                                        : `https://www.pichau.com.br${href}`
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

async function autoScroll(page: any) {

    await page.evaluate(async () => {

        await new Promise<void>((resolve) => {

            let totalHeight = 0
            const distance = 500

            const timer =
                setInterval(() => {

                    window.scrollBy(0, distance)

                    totalHeight += distance

                    if (
                        totalHeight >=
                        document.body.scrollHeight
                    ) {

                        clearInterval(timer)
                        resolve()
                    }

                }, 200)
        })
    })
}