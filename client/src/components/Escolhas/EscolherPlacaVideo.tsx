import { useEffect, useState } from "react"
import style from './Escolhas.module.css'
import { PlacaVideo} from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import { Typography } from "@mui/material"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaVideo() {
    const [listaPlacaVideo, setListaPlacaVideo] = useState<PlacaVideo[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    useEffect(() => {
        axios.get('http://localhost:3000/api/placasvideo')
        .then(res => setListaPlacaVideo(res.data))
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

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/placamae' onClick={cancelarEscolha}><BotaoEscolhas prev/></Link>
                <Typography>Escolha sua Placa de Video</Typography>
                <Link to='/criar-novo-pc/memoriaram'><BotaoEscolhas /></Link>
            </div>
            <Typography>{pcMontado.processador?.videoIntegrado ? 'Seu processador já contém vídeo integrado, a Placa de Vídeo é opcional': ''}</Typography>
            <Typography>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Typography>
            <div className={style.containerEscolhas}>
                {listaPlacaVideo.map((placaVideo) => (
                    <CardEscolha
                        componente="placavideo"
                        key={placaVideo.id}
                        imagem={placaVideo.imagem}
                        marca={placaVideo.marca}
                        modelo={placaVideo.modelo}
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
