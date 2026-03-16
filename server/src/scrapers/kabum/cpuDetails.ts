export async function scrapeKabumCPUDetails(page, url: string) {

    try {

        await page.goto(url, { waitUntil: "domcontentloaded" })

        await page.waitForSelector("body", { timeout: 5000 })

        const specs = await page.evaluate(() => {

            const dados: any = {}

            const elementos = document.querySelectorAll("li, tr, p")

            elementos.forEach(el => {

                const texto = el.textContent?.trim()

                if (!texto) return

                if (texto.toLowerCase().includes("socket"))
                    dados.socket = texto

                if (texto.toLowerCase().includes("tdp"))
                    dados.tdp = texto

                if (texto.toLowerCase().includes("ghz"))
                    dados.clock = texto

                if (texto.toLowerCase().includes("núcleo") || texto.toLowerCase().includes("core"))
                    dados.cores = texto

            })

            return dados

        })

        return specs

    } catch (erro) {

        console.log("⚠ Erro ao coletar specs:", erro)

        return {}

    }

}