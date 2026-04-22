import { Link, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import PC from '../../interfaces/pc'
import { useEffect, useState } from 'react'
import { Fonte } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import axios from 'axios'
import { Typography } from '@mui/material'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherFonte() {
    const [listaFontes, setListaFontes] = useState<Fonte[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const fonteSelecionada = listaFontes.find(fonte => fonte.id === modeloSelecionado)
        if (fonteSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.fonte?.preco ?? 0
                const valorNovo = fonteSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    fonte: fonteSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }   
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/fontes')
        .then(res => {
            setListaFontes(res.data)
        })
        .catch(erro => console.error(erro))        
    }, [])

    function calcularPotenciaTotal(pc: Partial<PC>): number {
        const tdpCPU = pc.processador?.tdp ?? 0
        const tdpGPU = pc.placaVideo?.tdp ?? 0
        const ram = (pc.memoriaRam?.modulos ?? 1) * 5
        const placamae = 50
        const armazenamento = 5

        const consumoTotal = tdpCPU + tdpGPU + placamae + ram + armazenamento

        return consumoTotal
    }

    function calcularUsoFonte(potenciaFonte: number) {
        return Math.round((potenciaNecessaria / potenciaFonte) * 100)
    }

    const potenciaNecessaria = calcularPotenciaTotal(pcMontado)
    const potenciaRecomendada = potenciaNecessaria + 200
    const fontesFiltradas = listaFontes.filter(
        fonte => fonte.potencia >= potenciaRecomendada
    )
    const usoFonte = calcularUsoFonte(potenciaNecessaria)

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.fonte?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior 
            return { ...prev, fonte: undefined, valorTotal: valorTotalAtualizado }
        })
    }

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/armazenamento' onClick={cancelarEscolha}><BotaoEscolhas prev/></Link>
                <Typography>Escolha sua Fonte</Typography>
                <Link to='/criar-novo-pc/gabinete'><BotaoEscolhas /></Link>
            </div>
            <Typography>Filtrando pela potencia mínima necessaria: {potenciaNecessaria}W</Typography>
            <Typography>Potência recomendada: {potenciaNecessaria+200}W</Typography>
            <Typography>Uso estimado da fonte: {usoFonte}%</Typography>
            <Typography>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Typography>
            <div className={style.containerEscolhas}>
                {fontesFiltradas.map((fonte) =>
                    <CardEscolha
                        componente='fonte'
                        key={fonte.id}
                        marca={fonte.marca}
                        modelo={fonte.modelo}
                        imagem={fonte.imagem}
                        preco={fonte.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === fonte.id}
                        potencia={fonte.potencia}
                        certificacao={fonte.certificacao}
                        id={fonte.id}
                    />
                )}
            </div>
        </div>
    )
}

export default EscolherFonte
