export interface ResultadoScraper {

    nomeEncontrado: string

    imagem: string

    specs: Record<string, any>

    valor: {
        loja: string
        preco: number
        url: string
    } | null
}

export interface ConfigComponente {

    tipo: string

    urls: {
        Kabum: string
        Pichau: string
        Terabyte: string
    }
}