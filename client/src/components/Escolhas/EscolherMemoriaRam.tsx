import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { MemoriaRAM } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"
import axios from "axios"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherMemoriaRAM() {
    const [listaMemorias, setListaMemorias] = useState<MemoriaRAM[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const memoriaRamSelecionada = listaMemorias.find(memoria => memoria.id === modeloSelecionado)
        if (memoriaRamSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.memoriaRam?.preco ?? 0
                const valorNovo = memoriaRamSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    memoriaRam: memoriaRamSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/memoriasram')
            .then(res => {
                const lista: MemoriaRAM[] = res.data
                const ddrAtual = pcMontado.placaMae?.ddr
                const listaFiltrada: MemoriaRAM[] = ddrAtual ? lista.filter(memoria => memoria.ddr === ddrAtual) : lista
                setListaMemorias(listaFiltrada)
            })
            .catch(erro => console.error(erro))
    }, [pcMontado.placaMae?.ddr])

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.memoriaRam?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, memoriaRam: undefined, valorTotal: valorTotalAtualizado }
        })
    }

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/placavideo' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo pos="center">Escolha sua Memória RAM</Titulo>
                <Link to='/criar-novo-pc/armazenamento'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos="center">{listaMemorias.length === 0 ? 'Não há nenhuma memória compatível com este DDR' : `Apenas mostrando as memórias com o DDR${pcMontado.placaMae?.ddr}`}</Subtitulo>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaMemorias.map((memoria) => (
                    <CardEscolha
                        componente="memoriaram"
                        key={memoria.id}
                        imagem={memoria.imagem}
                        marca={memoria.marca}
                        modelo={memoria.modelo}
                        preco={memoria.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === memoria.id}
                        ddr={memoria.ddr}
                        velocidade={memoria.velocidade}
                        quantidade={memoria.quantidade}
                        memoria={memoria.memoria}
                        id={memoria.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherMemoriaRAM
