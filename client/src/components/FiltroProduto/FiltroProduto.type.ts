export interface OpcaoFiltro {
    label: string,
    value: string
}

export interface OrdenacaoOption {
    id: string,
    label: string
}

export interface ConfigFiltro {
    id: string,
    titulo: string,
    opcoes: OpcaoFiltro[]
}

export interface FiltroProdutosProps {
    pesquisa: string,
    onPesquisaChange: (value: string) => void,
    filtros: ConfigFiltro[],
    valores: Record<string, string>,
    onFiltroChange: (filtroId: string, value: string) => void,
    ordenacao: string,
    onOrdenacaoChange: (value: string) => void,
    ordenacoes: OrdenacaoOption[],
    preco: number[],
    onPrecoChange: (valueMin: number, valueMax: number) => void
    menorPreco: number,
    maiorPreco: number
}