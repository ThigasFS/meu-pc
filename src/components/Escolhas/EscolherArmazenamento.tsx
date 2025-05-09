import React, { useEffect, useState } from 'react'
import PC from '../../interfaces/pc'
import { Armazenamento } from '../../interfaces/componente'
import { Link, useOutletContext } from 'react-router-dom'
import Titulo from '../Titulo/Titulo'
import style from './Escolhas.module.css'
import CardEscolha from '../CardEscolha/CardEscolha'
import Subtitulo from '../Subtitulo/Subtitulo'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherArmazenamento() {
    const [listaArmazenamento, setListaArmazenamento] = useState<Armazenamento[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const armazenamentoSelecionada = listaArmazenamento.find(armazenamento => armazenamento.modelo === modeloSelecionado)
        if (armazenamentoSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.armazenamento?.preco ?? 0
                const valorNovo = armazenamentoSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    armazenamento: armazenamentoSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.armazenamento?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior 
            return { ...prev, armazenamento: undefined, valorTotal: valorTotalAtualizado }
        })
    }

    useEffect(() => {
        const listaReserva: Armazenamento[] = [
            {
                tipo: 'armazenamento',
                nome: 'Armazenamento',
                marca: 'Kingston',
                modelo: 'A400',
                fabricante: 'Kingston',
                potencia: 10,
                capacidade: 960,
                tipoArmazenamento: 'SSD',
                tipoConexao: 'SATA III',
                unidade: 'GB',
                velocidadeLeitura: 500,
                velocidadeGravacao: 450,
                imagem: 'https://images7.kabum.com.br/produtos/fotos/95217/95217_1520016025_g.jpg',
                preco: 396.99
            },
            {
                tipo: 'armazenamento',
                nome: 'Armazenamento',
                marca: 'Kingston',
                modelo: 'NV3',
                fabricante: 'Kingston',
                potencia: 10,
                capacidade: 1,
                tipoArmazenamento: 'SSD',
                tipoConexao: 'M2',
                unidade: 'TB',
                velocidadeLeitura: 6000,
                velocidadeGravacao: 4000,
                imagem: 'https://images2.kabum.com.br/produtos/fotos/621162/ssd-pcie-kingston-nv3-1-tb-m-2-2280-nvme-leitura-6000-mb-s-e-gravacao-4000-mb-s-snv3s-1000g_1726082185_g.jpg',
                preco: 414.99
            },
            {
                tipo: 'armazenamento',
                nome: 'Armazenamento',
                marca: 'Seagate',
                modelo: 'Barracuda',
                fabricante: 'Seagate',
                potencia: 10,
                capacidade: 4,
                tipoArmazenamento: 'HD',
                tipoConexao: 'SATA 3.5',
                unidade: 'TB',
                velocidadeLeitura: 190,
                velocidadeGravacao: 190,
                imagem: 'https://images3.kabum.com.br/produtos/fotos/95803/95803_1522867513_index_g.jpg',
                preco: 749.99
            },
        ]

        setListaArmazenamento(listaReserva)
    }, [])

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/memoriaram' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha seu Armazenamento</Titulo>
                <Link to='/criar-novo-pc/fonte'><h3>Próximo</h3></Link>
            </div>
            <div className={style.containerEscolhas}>
                {listaArmazenamento.map(armazenamento => 
                    (
                        <CardEscolha 
                            key={armazenamento.modelo}
                            componente='armazenamento'
                            imagem={armazenamento.imagem}
                            marca={armazenamento.marca}
                            modelo={armazenamento.modelo}
                            preco={armazenamento.preco}
                            aoSelecionar={selecionarModelo}
                            selecionado={modeloSelecionado === armazenamento.modelo} 
                            tipoArmazenamento={armazenamento.tipoArmazenamento}
                            capacidade={armazenamento.capacidade}
                            tipoConexao={armazenamento.tipoConexao}
                            unidade={armazenamento.unidade}
                            velocidadeLeitura={armazenamento.velocidadeLeitura}
                            velocidadeGravacao={armazenamento.velocidadeGravacao}
                        />
                    )
                )}
            </div>
            <Subtitulo pos='center' cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
        </div>
    )
}

export default EscolherArmazenamento
