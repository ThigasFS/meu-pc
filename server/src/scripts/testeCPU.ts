import { runScrapers } from "../scrapers/runScrapers"

async function testeCPU() {
    try {
        console.log("Iniciando scrapers...\n")

        const produtos = await runScrapers()

        const porLoja = produtos.reduce((acc, produto) => {
            acc[produto.loja] = (acc[produto.loja] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        console.log("Resumo por loja:")
        console.table(porLoja)

        console.log(`Total: ${produtos.length}\n`)

        console.table(
            produtos.map(produto => ({
                loja: produto.loja,
                nome: produto.nome,
                url: produto.url
            }))
        )
    } catch (error) {
        console.error("Erro ao executar scrapers:", error)
    }
}

testeCPU()