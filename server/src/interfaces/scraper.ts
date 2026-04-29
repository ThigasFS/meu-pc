export interface ConfigComponente {
    tipo: string
    seletorKabum: string
    seletorPichau: string
    seletorTerabyte: string
}

export interface ResultadoScraper {
    imagem: string
    nomeEncontrado: string
    valor: {
        loja: string
        preco: number
        url: string
    } | null
}