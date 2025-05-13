import { Link, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import Titulo from '../Titulo/Titulo'
import { useEffect, useState } from 'react'
import { Gabinete } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import PC from '../../interfaces/pc'
import Subtitulo from '../Subtitulo/Subtitulo'
import axios from 'axios'

type ContextType = {
    pcMontado: PC
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherGabinete() {
    const [listaGabinetes, setListaGabinetes] = useState<Gabinete[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    useEffect(() => {
        axios.get('http://localhost:3000/api/gabinetes')
        .then(res => setListaGabinetes(res.data))
        .catch(erro => console.error(erro))
    }, [])

    function selecionarModelo(modeloSelecionado: number){
        setModeloSelecionado(modeloSelecionado)
        const gabineteSelecionado = listaGabinetes.find(gabinete => gabinete.id === modeloSelecionado)
        if (gabineteSelecionado) {
            setPcMontado(prev => {
                const valorAnterior = prev.gabinete?.preco ?? 0
                const valorNovo = gabineteSelecionado.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    gabinete: gabineteSelecionado,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.gabinete?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior 
            return { ...prev, gabinete: undefined, valorTotal: valorTotalAtualizado }
        })
    }

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/fonte' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha seu Gabinete</Titulo>
                <Link to='/criar-novo-pc/finalizacao'><h3>Finalizar</h3></Link>
            </div>
            <Subtitulo pos='center'>A escolha do gabinete não é obrigatória, é possível finalizar sem ele</Subtitulo>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaGabinetes.map((gabinete) =>
                    <CardEscolha
                        componente='gabinete'
                        key={gabinete.id}
                        marca={gabinete.marca}
                        modelo={gabinete.modelo}
                        imagem={gabinete.imagem}
                        preco={gabinete.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === gabinete.id}
                        fans={gabinete.qtdFans}
                        cor={gabinete.cor}
                        id={gabinete.id}
                    />
                )}
            </div>
        </div>
    )
}

export default EscolherGabinete
