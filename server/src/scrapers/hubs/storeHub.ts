import { scrapeKabum } from "../stores/kabum"

export async function scrapeAllStores(nome: string) {
    const kabum = await scrapeKabum(nome)

    return {
        imagem: kabum.imagem,
        valores: kabum.valor ? [kabum.valor] : []
    }
}