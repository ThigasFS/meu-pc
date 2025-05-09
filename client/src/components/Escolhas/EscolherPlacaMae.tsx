import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { PlacaMae } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"
import axios from "axios"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.modelo === modeloSelecionado)
        if (placaMaeSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.placaMae?.preco ?? 0
                const valorNovo = placaMaeSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    placaMae: placaMaeSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/placasmae')
        .then(res => setListaPlacasMaes(res.data))
        .catch(erro => console.error(erro))
    }, [])
    
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Titulo>Escolha sua Placa Mãe</Titulo>
                <Link to='/criar-novo-pc/processador'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaPlacasMaes.map((placa) => (
                    <CardEscolha
                        componente="placamae"
                        key={placa.modelo}
                        imagem={placa.imagem}
                        marca={placa.marca}
                        modelo={placa.modelo}
                        preco={placa.preco}
                        socket={placa.socket}
                        ddr={placa.ddr}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placa.modelo}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherPlacaMae
