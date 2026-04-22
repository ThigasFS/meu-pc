import React, { useEffect, useState } from 'react'
import PC from '../../interfaces/pc'
import { Armazenamento } from '../../interfaces/componente'
import { Link, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import CardEscolha from '../CardEscolha/CardEscolha'
import axios from 'axios'
import { Typography } from '@mui/material'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'

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
                <Link to='/criar-novo-pc/memoriaram' onClick={cancelarEscolha}><BotaoEscolhas prev/></Link>
                <Typography>Escolha seu Armazenamento</Typography>
                <Link to='/criar-novo-pc/fonte'><BotaoEscolhas /></Link>
            </div>
            <Typography>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Typography>
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
