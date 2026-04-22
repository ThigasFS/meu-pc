import { useEffect, useState } from "react"
import style from './Escolhas.module.css'
import { PlacaMae } from "../../interfaces/componente"
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

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.id === modeloSelecionado)
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
                <Link to='/criar-novo-pc/processador'><BotaoEscolhas prev/></Link>
                <Typography>Escolha sua Placa Mãe</Typography>
                <Link to='/criar-novo-pc/placavideo'><BotaoEscolhas /></Link>
            </div>
            <Typography>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Typography>
            <div className={style.containerEscolhas}>
                {listaPlacasMaes.map((placa) => (
                    <CardEscolha
                        componente="placamae"
                        key={placa.id}
                        imagem={placa.imagem}
                        marca={placa.marca}
                        modelo={placa.modelo}
                        preco={placa.preco}
                        socket={placa.socket}
                        ddr={placa.ddr}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placa.id}
                        id={placa.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherPlacaMae
