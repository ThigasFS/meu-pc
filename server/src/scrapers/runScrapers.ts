import { filterCPUProducts } from "./filters/cpu"
import { KabumScraper } from "./stores/kabum"
import { PichauScraper } from "./stores/pichau"
import { TerabyteScraper } from "./stores/terabyte"

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

    return filterCPUProducts(produtos)
}