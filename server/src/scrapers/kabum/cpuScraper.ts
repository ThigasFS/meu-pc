import puppeteer from "puppeteer"
import { scrapeKabumCPUDetails } from "./cpuDetails"

export async function scrapeKabumCPU() {

    const browser = await puppeteer.launch({
        headless: true, // Interface: OFF
        defaultViewport: null
    })

    const page = await browser.newPage()

    const produtosTotais: any[] = []

    const paginas = 1

    for (let p = 1; p <= paginas; p++) {

        const url = `https://www.kabum.com.br/hardware/processadores?page=${p}`

        console.log(`\n📄 Página ${p}`)

        await page.goto(url, { waitUntil: "domcontentloaded" })

        await page.waitForSelector('[class*="productCard"]', { timeout: 15000 })

        const produtos = await page.evaluate(() => {

        const lista: any[] = []

        const cards = document.querySelectorAll('[class*="productCard"]')

        cards.forEach(card => {

            const nome =
                card.querySelector('[class*="nameCard"]')?.textContent?.trim() || ""

            const precoTexto =
                card.querySelector('[class*="priceCard"]')?.textContent || ""

            const preco = Number(
                precoTexto
                    .replace("R$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
            )

            const imagem =
                card.querySelector("img")?.getAttribute("src") || ""

            const link =
                card.querySelector("a")?.getAttribute("href") || ""

            if (link) {

                lista.push({
                    nome,
                    preco,
                    imagem,
                    url: "https://www.kabum.com.br" + link
                })

            }

        })

        return lista

    })

        console.log(`🔎 ${produtos.length} produtos encontrados`)

        for (const produto of produtos.slice(0,1)) {

            console.log("\n➡ Abrindo produto:", produto.nome)

            const productPage = await browser.newPage()

            const specs = await scrapeKabumCPUDetails(productPage, produto.url)

            await productPage.close()

            produtosTotais.push({
                ...produto,
                specs
            })

            console.log("✔ Specs coletadas")

        }

    }

    await browser.close()

    return produtosTotais
}