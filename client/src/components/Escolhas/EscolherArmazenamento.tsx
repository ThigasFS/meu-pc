import React, { useEffect, useState } from 'react'
import PC from '../../interfaces/pc'
import { Armazenamento } from '../../interfaces/componente'
import { Link, useOutletContext } from 'react-router-dom'
import Titulo from '../Titulo/Titulo'
import style from './Escolhas.module.css'
import CardEscolha from '../CardEscolha/CardEscolha'
import Subtitulo from '../Subtitulo/Subtitulo'
import axios from 'axios'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherArmazenamento() {
    const [listaArmazenamento, setListaArmazenamento] = useState<Armazenamento[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const armazenamentoSelecionada = listaArmazenamento.find(armazenamento => armazenamento.id === modeloSelecionado)
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
        axios.get('http://localhost:3000/api/armazenamento')
        .then(res => setListaArmazenamento(res.data))
        .catch(erro => console.error(erro))
    }, [])

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/memoriaram' onClick={cancelarEscolha}><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha seu Armazenamento</Titulo>
                <Link to='/criar-novo-pc/fonte'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos='right' tamanho={1.5} weight={600} cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaArmazenamento.map(armazenamento => 
                    (
                        <CardEscolha 
                            key={armazenamento.id}
                            componente='armazenamento'
                            imagem={armazenamento.imagem}
                            marca={armazenamento.marca}
                            modelo={armazenamento.modelo}
                            preco={armazenamento.preco}
                            aoSelecionar={selecionarModelo}
                            selecionado={modeloSelecionado === armazenamento.id} 
                            tipoArmazenamento={armazenamento.tipoArmazenamento}
                            capacidade={armazenamento.capacidade}
                            tipoConexao={armazenamento.tipoConexao}
                            unidade={armazenamento.unidade}
                            velocidadeLeitura={armazenamento.velocidadeLeitura}
                            velocidadeGravacao={armazenamento.velocidadeGravacao}
                            id={armazenamento.id}
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default EscolherArmazenamento
