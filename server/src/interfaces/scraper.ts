export interface ConfigComponente {
    tipo: string
    seletorKabum: string
    seletorPichau: string
    seletorTerabyte: string
    extrairTdp?: boolean
    extrairGddr?: boolean
}

export interface ResultadoScraper {
    imagem: string
    nomeEncontrado: string,
    tdp?: number,
    gddr? : number,
    valor: {
        loja: string
        preco: number
        url: string
    } | null
}