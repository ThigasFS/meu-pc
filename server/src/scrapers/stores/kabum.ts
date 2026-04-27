import puppeteer from "puppeteer"
import { PrecoLoja } from "../../interfaces/componente"

export async function scrapeKabum(nome: string): Promise<{
    imagem: string
    valor: PrecoLoja | null
    nomeEncontrado: string
}> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    })

    const page = await browser.newPage()

    try {
        const busca = `https://www.kabum.com.br/busca/${encodeURIComponent(nome)}`

        await page.goto(busca, {
            waitUntil: "networkidle2"
        })

        await page.waitForSelector('a[href*="/produto/"]')

        const resultado = await page.$eval(
            'a[href*="/produto/"]',
            el => {
                const precoTexto =
                    el.textContent?.match(/\d{1,3}(?:\.\d{3})*,\d{2}/)?.[0]

                const preco = precoTexto
                    ? Number(precoTexto.replace(/\./g, "").replace(",", "."))
                    : 0

                const imagem =
                    el.querySelector("img")?.getAttribute("src") ?? ""

                const href = el.getAttribute("href") ?? ""

                const nomeEncontrado =
                    Array.from(el.querySelectorAll("span"))
                        .map(span => span.textContent?.trim() ?? "")
                        .find(texto => texto.toLowerCase().includes("processador"))
                    ?? ""

                return {
                    nomeEncontrado,
                    preco,
                    imagem,
                    url: `https://www.kabum.com.br${href}`
                }
            }
        )

        return {
            imagem: resultado.imagem,
            nomeEncontrado: resultado.nomeEncontrado,
            valor: {
                loja: "Kabum",
                preco: resultado.preco,
                url: resultado.url
            }
        }
    } finally {
        await browser.close()
    }
}