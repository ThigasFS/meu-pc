export function filterCPUProducts(produtos: any[]) {
    return produtos.filter(produto => {
        const nome = produto.nome?.toLowerCase() || ""
        const url = produto.url?.toLowerCase() || ""

        const validCpuTerms = [
            "ryzen",
            "intel",
            "core i",
            "athlon",
            "processador"
        ]

        const invalidTerms = [
            "kit",
            "placa",
            "placas-mae",
            "categoria"
        ]

        const hasValidTerm = validCpuTerms.some(term =>
            nome.includes(term) || url.includes(term)
        )

        const hasInvalidTerm = invalidTerms.some(term =>
            nome.includes(term) || url.includes(term)
        )

        return hasValidTerm && !hasInvalidTerm
    })
}