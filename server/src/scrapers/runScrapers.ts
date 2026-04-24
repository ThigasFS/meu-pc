import { saveCpu } from "../database/salvarCPU"
import { filterCPUProducts } from "./filters/cpu"
import { KabumScraper } from "./stores/kabum"
import { PichauScraper } from "./stores/pichau"
import { TerabyteScraper } from "./stores/terabyte"
import { parseCpu } from "../parsers/cpuParser"

export async function runScrapers() {
    const scrapers = [
        new KabumScraper(),
        new PichauScraper(),
        new TerabyteScraper()
    ]

    const resultados = await Promise.allSettled(
        scrapers.map(scraper => scraper.scrape())
    )

    const produtos = resultados
        .filter(
            (result): result is PromiseFulfilledResult<any[]> =>
                result.status === "fulfilled"
        )
        .flatMap(result => result.value)

    const produtosFiltrados = filterCPUProducts(produtos)

    const cpusParseadas = produtosFiltrados
        .map(parseCpu)
        .filter((cpu): cpu is NonNullable<typeof cpu> => cpu !== null)

    await Promise.all(
        cpusParseadas.map(cpu => saveCpu(cpu))
    )

    return cpusParseadas
}