export interface ProdutoLoja {
    nome: string
    tipo: string
    marca: string
    imagem: string
    url: string
    loja: string
    preco: number
    specs: Record<string, any>
}