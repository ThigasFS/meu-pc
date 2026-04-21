export interface Product {
    nome: string
    preco: number | null
    imagem: string
    url: string
    loja: string
}

export interface Scraper {
    scrape(): Promise<Product[]>
}