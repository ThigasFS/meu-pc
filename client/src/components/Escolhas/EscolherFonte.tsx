import { Link, useOutletContext } from 'react-router-dom'
import Titulo from '../Titulo/Titulo'
import style from './Escolhas.module.css'
import PC from '../../interfaces/pc'
import { useEffect, useState } from 'react'
import { Fonte } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import Subtitulo from '../Subtitulo/Subtitulo'
import axios from 'axios'

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
        const potencias: (number | undefined)[] = [
          pc.armazenamento?.potencia,
          pc.memoriaRam?.potencia,
          pc.placaMae?.potencia,
          pc.placaVideo?.potencia,
          pc.processador?.potencia,
        ];
      
        return potencias.reduce((total: number, potencia) => total + (potencia ?? 0), 0);
      }

    const potenciaNecessaria = calcularPotenciaTotal(pcMontado)
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
                <Link to='/criar-novo-pc/armazenamento' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha sua Fonte</Titulo>
                <Link to='/criar-novo-pc/gabinete'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos='center'>Filtrando pela potencia mínima necessaria: {potenciaNecessaria}W</Subtitulo>
            <Subtitulo pos='center'>Potência recomendada: {potenciaNecessaria+200}W</Subtitulo>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaFontes.map((fonte) =>
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
                        cabos={fonte.cabos}
                    />
                )}
            </div>
        </div>
    )
}

export default EscolherFonte
