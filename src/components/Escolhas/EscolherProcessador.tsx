import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { Processador } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherProcessador() {
    const [listaProcessador, setListaProcessador] = useState<Processador[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    useEffect(() => {
        const listaReserva: Processador[] = [
            {
                tipo: 'processador',
                nome: 'Processador',
                marca: 'AMD',
                modelo: 'Ryzen 5 5500',
                fabricante: 'AMD',
                potencia: 65,
                socket: 'AM4',
                imagem: 'https://m.media-amazon.com/images/I/51So7GoGvxL._AC_SX679_.jpg',
                preco: 549.99,
                velocidade: 3.6,
                videoIntegrado: false
            },
            {
                tipo: 'processador',
                nome: 'Processador',
                marca: 'Intel',
                modelo: 'i5-12400F',
                fabricante: 'Intel',
                potencia: 10,
                socket: 'LGA1700',
                imagem: 'https://m.media-amazon.com/images/I/51A6E9HPocL._AC_SX679_.jpg',
                preco: 979.90,
                velocidade: 2.5,
                videoIntegrado: false
            },
            {
                tipo: 'processador',
                nome: 'Processador',
                marca: 'Intel',
                modelo: 'i5-12600K',
                fabricante: 'Intel',
                potencia: 125,
                socket: 'LGA1700',
                imagem: 'https://images6.kabum.com.br/produtos/fotos/241046/processador-intel-core-i5-12600k-cache-16mb-3-7ghz-4-9ghz-max-turbo-lga-1700-bx8071512600k_1634828164_g.jpg',
                preco: 1349.99,
                velocidade: 3.7,
                videoIntegrado: true
            }
        ]
        function filtrarSocket(listaProcessador: Processador[]) {
            const listaFiltrada = listaProcessador.filter(processador => processador.socket === pcMontado.placaMae?.socket)
            setListaProcessador(listaFiltrada)
        }
        filtrarSocket(listaReserva)
    }, [pcMontado])

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const processadorSelecionado = listaProcessador.find(processador => processador.modelo === modeloSelecionado)
        if (processadorSelecionado) {
            setPcMontado(prev => {
                const valorAnterior = prev.processador?.preco ?? 0
                const valorNovo = processadorSelecionado.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    processador: processadorSelecionado,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.processador?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior 
            return { ...prev, processador: undefined, valorTotal: valorTotalAtualizado }
        })
    }


    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/placamae' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo>Escolha seu Processador</Titulo>
                <Link to='/criar-novo-pc/placavideo'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos="center">{listaProcessador.length === 0 ? 'Não há nenhum processador compatível com este socket' : `Apenas mostrando os processadores com o socket: ${pcMontado.placaMae?.socket}`}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaProcessador.map((processador) => (
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
            <Subtitulo pos='center' cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Subtitulo>
        </div>
    )
}

export default EscolherProcessador