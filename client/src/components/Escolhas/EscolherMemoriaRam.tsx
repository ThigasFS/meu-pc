import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { MemoriaRAM } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherMemoriaRAM() {
    const [listaMemorias, setListaMemorias] = useState<MemoriaRAM[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const memoriaRamSelecionada = listaMemorias.find(memoria => memoria.modelo === modeloSelecionado)
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
        const listaReserva: MemoriaRAM[] = [
            {
                tipo: 'memoriaram',
                nome: 'Memória RAM',
                marca: 'T-Force',
                modelo: 'Vulcan Z',
                fabricante: 'Team Group',
                potencia: 10,
                memoria: 16,
                quantidade: '(2x8)',
                velocidade: 3200,
                ddr: 4,
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/t/l/tlzgd416g3200hc16cdc012.jpg',
                preco: 269.99,
                cl: 16
            },
            {
                tipo: 'memoriaram',
                nome: 'Memória RAM',
                marca: 'Mancer',
                modelo: 'Astrion',
                fabricante: 'Mancer',
                potencia: 10,
                memoria: 16,
                quantidade: '(1x16)',
                velocidade: 3200,
                ddr: 4,
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/c/mcr-astn-16gb2.jpg',
                preco: 245.99,
                cl: 19
            },
            {
                tipo: 'memoriaram',
                nome: 'Memória RAM',
                marca: 'Mancer',
                modelo: 'Dantalion L',
                fabricante: 'Mancer',
                potencia: 20,
                memoria: 8,
                quantidade: '(1x8)',
                velocidade: 2666,
                ddr: 4,
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/c/mcr-dtll-2666124154110_1.jpg',
                preco: 109.99,
                cl: 16
            },
            {
                tipo: 'memoriaram',
                nome: 'Memória RAM',
                marca: 'Kingston',
                modelo: 'Fury Beast',
                fabricante: 'Kingston',
                potencia: 50,
                memoria: 16,
                quantidade: '(1x16)',
                velocidade: 5600,
                ddr: 5,
                imagem: 'https://images7.kabum.com.br/produtos/fotos/285967/memoria-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-preto-kf556c40bb-16_1639574788_g.jpg',
                preco: 394.99,
                cl: 40
            }
        ]
        function filtrarDDR(listaMemorias: MemoriaRAM[]) {
                    const listaFiltrada = listaMemorias.filter(memoria => memoria.ddr === pcMontado.placaMae?.ddr)
                    setListaMemorias(listaFiltrada)
                }
        filtrarDDR(listaReserva)
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
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaMemorias.map((memoria) => (
                    <CardEscolha
                        componente="memoriaram"
                        key={memoria.modelo}
                        imagem={memoria.imagem}
                        marca={memoria.marca}
                        modelo={memoria.modelo}
                        preco={memoria.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === memoria.modelo}
                        ddr={memoria.ddr}
                        velocidade={memoria.velocidade}
                        quantidade={memoria.quantidade}
                        memoria={memoria.memoria}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherMemoriaRAM
