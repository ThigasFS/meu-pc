import React, { useEffect, useState } from 'react'
import PC from '../../interfaces/pc'
import { Armazenamento } from '../../interfaces/componente'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import CardEscolha from '../CardEscolha/CardEscolha'
import axios from 'axios'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'
import LayoutEscolhas from './LayoutEscolhas/Layout'
import { Grid } from '@mui/material'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherArmazenamento() {
    const [listaArmazenamento, setListaArmazenamento] = useState<Armazenamento[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    const navigate = useNavigate()

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

    function cancelarPc() {
        setPcMontado({})
        navigate('/')
    }

    function voltarAnterior() {
        cancelarEscolha()
        navigate(-1)
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/storage')
            .then(res => {
                const storageApi = res.data as Armazenamento[]
                setListaArmazenamento(storageApi)
            })
            .catch(erro => console.error(erro))
    }, [])

    return (
        <LayoutEscolhas
            titulo="Escolha seu Armazenamento"
            valorTotal={pcMontado.valorTotal}
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/fonte">
                    <BotaoEscolhas />
                </Link>
            }
        >
            {listaArmazenamento.map(armazenamento =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={armazenamento.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        key={armazenamento.id}
                        componente='armazenamento'
                        imagem={armazenamento.imagem}
                        marca={armazenamento.marca}
                        modelo={armazenamento.nome}
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
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherArmazenamento
