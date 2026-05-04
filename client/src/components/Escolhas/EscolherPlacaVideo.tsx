import { useEffect, useState } from "react"
import style from './Escolhas.module.css'
import { PlacaVideo } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"
import HeaderEscolhas from "./HeaderEscolhas"

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

    return (
        <div>
            <HeaderEscolhas
                titulo="Escolha sua Placa de Vídeo"
                infosExtras={[
                    {
                        label: "Seu processador",
                        valor: pcMontado.processador?.videoIntegrado ? 'tem vídeo integrado, a GPU é opcional' : 'não tem vídeo integrado, por favor selecionar GPU'
                    }
                ]}
                valorTotal={pcMontado.valorTotal}
                onAnterior={voltarAnterior}
                onCancelar={cancelarPc}
                acaoDireita={
                    <Link to="/criar-novo-pc/memoriaram">
                        <BotaoEscolhas />
                    </Link>
                }
            />
            <div className={style.containerEscolhas}>
                {listaPlacaVideo.map((placaVideo) => (
                    <CardEscolha
                        componente="placavideo"
                        key={placaVideo.id}
                        imagem={placaVideo.imagem}
                        marca={placaVideo.marca}
                        modelo={placaVideo.nome}
                        preco={placaVideo.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placaVideo.id}
                        gddr={placaVideo.gddr}
                        vram={placaVideo.vram}
                        id={placaVideo.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherPlacaVideo
