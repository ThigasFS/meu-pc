import { useEffect, useState } from "react"
import { PlacaVideo } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"
import { Grid } from "@mui/material"
import LayoutEscolhas from "./LayoutEscolhas/Layout"
import { FilterDefinition, useProductFilters } from "../../hooks/useProdutoFiltros"
import ProductFilters from "../FiltroProduto/FiltroProduto"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaVideo() {
    const [listaPlacaVideo, setListaPlacaVideo] = useState<PlacaVideo[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/api/gpu')
            .then(res => {
                const gpusApi = res.data as PlacaVideo[]

                const gpusCompletas = gpusApi
                    .filter((gpu) =>
                        gpu.nome &&
                        gpu.marca &&
                        gpu.imagem &&
                        gpu.gddr &&
                        gpu.tdp > 0 &&
                        gpu.preco > 0 &&
                        gpu.valores &&
                        gpu.valores.length > 0
                    )
                    .map((gpu, index) => ({
                        ...gpu,
                        id: index + 1
                    }))

                setListaPlacaVideo(gpusCompletas)
            })
            .catch(erro => console.error(erro));
    }, [])

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const placaVideoSelecionada = listaPlacaVideo.find(placa => placa.id === modeloSelecionado)
        if (placaVideoSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.placaVideo?.preco ?? 0
                const valorNovo = placaVideoSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    placaVideo: placaVideoSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.placaVideo?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, placaVideo: undefined, valorTotal: valorTotalAtualizado }
        })
    }

    function cancelarPc() {
        setPcMontado({})
        navigate('/')
    }

    function voltarAnterior() {
        cancelarEscolha()
        navigate(-1)
    }

    const gpuFilterDefinitions: FilterDefinition<PlacaVideo>[] = [
            {
                id: "marca",
                titulo: "Marca",
                getValue: gpu => gpu.marca
            },
            
            {
                id: 'chipset',
                titulo: 'Chipset',
                getValue: gpu => gpu.chipset
            }
        ]
    
        const sortOptions = [
            {
                id: "menor_preco",
                label: "Menor Preço",
                compare: (a: PlacaVideo, b: PlacaVideo) =>
                    a.preco -
                    b.preco
            },
    
            {
                id: "maior_preco",
                label: "Maior Preço",
                compare: (a: PlacaVideo, b: PlacaVideo) =>
                    b.preco -
                    a.preco
            },
    
            {
                id: "nome",
                label: "Nome",
                compare: (a: PlacaVideo, b: PlacaVideo) =>
                    a.nome.localeCompare(
                        b.nome
                    )
            },
        ]
    
        const {
            pesquisa,
            setPesquisa,
            filtros,
            alterarFiltro,
            ordenacao,
            setOrdenacao,
            itensFiltrados,
            filtrosConfig,
            preco,
            alterarPreco,
            maiorPreco,
            menorPreco
        } = useProductFilters({
            items: listaPlacaVideo,
    
            searchFn: gpu =>
                gpu.nome,
    
            filterDefinitions:
                gpuFilterDefinitions,
    
            sortOptions
        })

    return (
        <LayoutEscolhas
            titulo="Escolha sua Placa de Vídeo"
            valorTotal={pcMontado.valorTotal}
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/memoriaram">
                    <BotaoEscolhas />
                </Link>
            }
            infosExtras={[
                {
                    label: "Seu processador",
                    valor: pcMontado.processador?.videoIntegrado ? 'tem vídeo integrado, a GPU é opcional' : 'não tem vídeo integrado, por favor selecionar GPU'
                }
            ]}
            filtros={
                <ProductFilters
                    pesquisa={pesquisa}
                    onPesquisaChange={setPesquisa}
                    filtros={filtrosConfig}
                    valores={filtros}
                    onFiltroChange={alterarFiltro}
                    ordenacao={ordenacao}
                    onOrdenacaoChange={setOrdenacao}
                    ordenacoes={sortOptions}
                    preco={preco}
                    onPrecoChange={alterarPreco}
                    menorPreco={menorPreco}
                    maiorPreco={maiorPreco}
                />
            }
        >
            {itensFiltrados.map(gpu =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={gpu.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        componente="placavideo"
                        key={gpu.id}
                        imagem={gpu.imagem}
                        marca={gpu.marca}
                        modelo={gpu.nome}
                        preco={gpu.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === gpu.id}
                        gddr={gpu.gddr}
                        vram={gpu.vram}
                        id={gpu.id}
                    />
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherPlacaVideo
