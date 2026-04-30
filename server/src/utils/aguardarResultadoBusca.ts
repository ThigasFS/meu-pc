import { Page } from "puppeteer";

export async function aguardarResultadoBusca(
    page: Page,
    seletorProduto: string,
    mensagensSemResultado: string[],
    timeout = 8000
): Promise<"produto" | "vazio"> {
    await page.waitForSelector("body");

    const inicio = Date.now();

    while (Date.now() - inicio < timeout) {
        const encontrouProduto = await page.$(seletorProduto);

        if (encontrouProduto) {
            return "produto";
        }

        const textoPagina = await page.evaluate(() =>
            document.body.innerText
        );

        const semResultado = mensagensSemResultado.some(msg =>
            textoPagina.toLowerCase().includes(msg.toLowerCase())
        );

        if (semResultado) {
            return "vazio";
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return "vazio";
}