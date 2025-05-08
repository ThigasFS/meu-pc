import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { PlacaVideo} from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaVideo() {
    const [listaPlacaVideo, setListaPlacaVideo] = useState<PlacaVideo[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    useEffect(() => {
        const listaReserva: PlacaVideo[] = [
            {
                tipo: 'placavideo',
                marca: 'AMD',
                modelo: 'RX 7600',
                fabricante: 'AMD',
                potencia: 165,
                imagem: 'https://images7.kabum.com.br/produtos/fotos/475647/placa-de-video-rx-7600-gaming-oc-8g-radeon-gigabyte-8gb-gddr6-128bits-rgb-gv-r76gaming-oc-8gd_1698435450_g.jpg',
                preco: '1.849,99',
                vram: 8,
                gddr: 6,
            },
            {
                tipo: 'placavideo',
                marca: 'Nvidia',
                modelo: 'RTX 4060',
                fabricante: 'Nvidia',
                potencia: 115,
                imagem: 'https://images5.kabum.com.br/produtos/fotos/581685/placa-de-video-rtx-4060-infinity-2-palit-nvidia-geforce-8gb-gddr6-dlss-ray-tracing-g-sync-ne64060019p1-1070l_1715956390_g.jpg',
                preco: '2.299,90',
                vram: 8,
                gddr: 6
            },
        ]
        setListaPlacaVideo(listaReserva)
    }, [])

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const placaVideoSelecionada = listaPlacaVideo.find(placa => placa.modelo === modeloSelecionado)
        setPcMontado(prev => ({...prev, placaVideo: placaVideoSelecionada}))
    }
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/processador'><h3>Anterior</h3></Link>
                <Titulo>Escolha sua Placa de Video</Titulo>
                <Link to='/criar-novo-pc/memoriaram'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos="center">{pcMontado.videoIntegrado ? 'Seu processador já contém vídeo integrado, a Placa de Vídeo é opcional': ''}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaPlacaVideo.map((placaVideo) => (
                    <CardEscolha
                        componente="placavideo"
                        key={placaVideo.modelo}
                        imagem={placaVideo.imagem}
                        marca={placaVideo.marca}
                        modelo={placaVideo.modelo}
                        preco={placaVideo.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placaVideo.modelo}
                        gddr={placaVideo.gddr}
                        vram={placaVideo.vram}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherPlacaVideo
