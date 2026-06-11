export interface OpcaoFiltro {
    label: string,
    value: string
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
    onFiltroChange: (filtroId: string, value: string) => void
    ordenacao: string,
    onOrdenacaoChange: (value: string) => void
}