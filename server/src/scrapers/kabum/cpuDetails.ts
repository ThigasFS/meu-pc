export async function scrapeKabumCPUDetails(page: any, url: string) {

    await page.goto(url, { waitUntil: "domcontentloaded" })

    await page.waitForFunction(() => {
        return document.body.innerText.length > 1000
    }, { timeout: 20000 })

    const dados = await page.evaluate(() => {

        const texto = document.body.innerText

        // 🧠 regex inteligente
        const clockMatch = texto.match(/(\d+[\.,]?\d*)\s*GHz/i)
        const tdpMatch = texto.match(/(\d+)\s*W/i)

        const socketMatch = texto.match(/AM\d|LGA\s?\d+/i)

        const videoIntegrado =
            /vídeo integrado|integrated graphics/i.test(texto)

        return {
            clock: clockMatch ? parseFloat(clockMatch[1].replace(",", ".")) : null,
            tdp: tdpMatch ? parseInt(tdpMatch[1]) : null,
            socket: socketMatch ? socketMatch[0] : null,
            video_integrado: videoIntegrado
        }
    })

    return dados
}