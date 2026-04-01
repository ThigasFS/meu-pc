import puppeteer from "puppeteer"
import { scrapeKabumCPUDetails } from "./cpuDetails"

export async function scrapeKabumCPU() {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--no-sandbox"]
    })

    const page = await browser.newPage()

    const produtosTotais: any[] = []
    const paginas = 3

    for (let p = 1; p <= paginas; p++) {

        const url = `https://www.kabum.com.br/hardware/processadores?page=${p}`

        console.log(`\n📄 Página ${p}`)

        await page.goto(url, { waitUntil: "domcontentloaded" })

        await page.waitForFunction(() => {
            return document.querySelectorAll('a[href*="/produto/"]').length > 10
        }, { timeout: 20000 })

        const produtos = await page.evaluate(() => {

            const lista: any[] = []

            const links = document.querySelectorAll('a[href*="/produto/"]')

            links.forEach(link => {

                const href = link.getAttribute("href")
                const nome = link.textContent?.trim() || ""

                if (!href || !href.includes("/produto/")) return
                if (nome.length < 10) return

                const imagem =
                    link.querySelector("img")?.getAttribute("src") || ""

                lista.push({
                    nome,
                    preco: null,
                    imagem,
                    url: "https://www.kabum.com.br" + href
                })

            })

            const unique = Array.from(
                new Map(lista.map(item => [item.url, item])).values()
            )

            return unique
        })

        console.log(`🔎 ${produtos.length} produtos encontrados`)

    }

    await browser.close()

    return produtosTotais
}