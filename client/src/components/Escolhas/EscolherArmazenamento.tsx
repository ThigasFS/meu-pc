import React, { useEffect, useState } from 'react'
import PC from '../../interfaces/pc'
import { Armazenamento } from '../../interfaces/componente'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import CardEscolha from '../CardEscolha/CardEscolha'
import axios from 'axios'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'
import HeaderEscolhas from './HeaderEscolhas'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherArmazenamento() {
    const [listaArmazenamento, setListaArmazenamento] = useState<Armazenamento[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

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

    function cancelarPc(){
        setPcMontado({})
        navigate('/')
    }

    function voltarAnterior(){
        cancelarEscolha()
        navigate(-1)
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/storage')
        .then(res => {
            const storageApi = res.data as Armazenamento[]
            const storageCompletas = storageApi.filter((storage) => 
                storage.id &&
                storage.marca &&
                storage.nome &&
                storage.capacidade &&
                storage.formato &&
                storage.interface &&
                storage.tipoArmazenamento &&
                storage.unidade &&
                storage.preco &&
                storage.valores.length
            )

            setListaArmazenamento(storageCompletas)
        })
        .catch(erro => console.error(erro))
    }, [])

    return (
        <div>
            <HeaderEscolhas
                titulo="Escolha seu Armazenamento"
                valorTotal={pcMontado.valorTotal}
                onAnterior={voltarAnterior}
                onCancelar={cancelarPc}
                acaoDireita={
                    <Link to="/criar-novo-pc/fonte">
                        <BotaoEscolhas />
                    </Link>
                }
            />
            <div className={style.containerEscolhas}>
                {listaArmazenamento.map(armazenamento => 
                    (
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
                    )
                )}
            </div>
        </div>
    )
}

export default EscolherArmazenamento
