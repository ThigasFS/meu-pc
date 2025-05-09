import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { Processador } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"
import axios from "axios"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherProcessador() {
    const [listaProcessadores, setListaProcessador] = useState<Processador[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    useEffect(() => {
        axios.get('http://localhost:3000/api/processadores')
            .then(res => {
                const todos = res.data as Processador[]
                const socketAtual = pcMontado.placaMae?.socket
                const filtrados = socketAtual
                    ? todos.filter(proc => proc.socket === socketAtual)
                    : todos
                console.log(socketAtual);
                console.log(filtrados);
                console.log(todos);
                
                setListaProcessador(filtrados)
            })
            .catch(erro => console.error(erro));
    }, [pcMontado.placaMae?.socket])

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const processadorSelecionado = listaProcessadores.find(processador => processador.modelo === modeloSelecionado)
        if (processadorSelecionado) {
            setPcMontado(prev => {
                const valorAnterior = prev.processador?.preco ?? 0
                const valorNovo = processadorSelecionado.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    processador: processadorSelecionado,
                    valorTotal: valorTotalAtualizado,
                    videoIntegrado: processadorSelecionado.videoIntegrado
                }
            })
        }
    }

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.processador?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, processador: undefined, valorTotal: valorTotalAtualizado, videoIntegrado: false}
        })
    }


    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/placamae' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo>Escolha seu Processador</Titulo>
                <Link to='/criar-novo-pc/placavideo'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos="center">{listaProcessadores.length === 0 ? 'Não há nenhum processador compatível com este socket' : `Apenas mostrando os processadores com o socket: ${pcMontado.placaMae?.socket}`}</Subtitulo>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaProcessadores.map((processador) => (
                    <CardEscolha
                        componente="processador"
                        key={processador.modelo}
                        imagem={processador.imagem}
                        marca={processador.marca}
                        modelo={processador.modelo}
                        preco={processador.preco}
                        socket={processador.socket}
                        videoIntegrado={processador.videoIntegrado}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === processador.modelo}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherProcessador