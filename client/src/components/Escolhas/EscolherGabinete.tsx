import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import { useEffect, useState } from 'react'
import { Gabinete } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import PC from '../../interfaces/pc'
import axios from 'axios'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'
import HeaderEscolhas from './HeaderEscolhas'

type ContextType = {
    pcMontado: PC
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherGabinete() {
    const [listaGabinetes, setListaGabinetes] = useState<Gabinete[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const {pcMontado, setPcMontado} = useOutletContext<ContextType>()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/api/case')
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

    function cancelarPc(){
        setPcMontado({})
        navigate('/')
    }

    function voltarAnterior(){
        cancelarEscolha()
        navigate(-1)
    }

    return (
        <div>
            <HeaderEscolhas
                titulo="Escolha seu Gabinete"
                valorTotal={pcMontado.valorTotal}
                onAnterior={voltarAnterior}
                onCancelar={cancelarPc}
                acaoDireita={
                    <Link to="/criar-novo-pc/finalizacao">
                        <BotaoEscolhas last/>
                    </Link>
                }
                infosExtras={[
                    {
                        label: 'Para o gabinete',
                        valor: 'Não é necessário a escolha para finalizar'
                    }
                ]}
            />
            <div className={style.containerEscolhas}>
                {listaGabinetes.map((gabinete) =>
                    <CardEscolha
                        componente='gabinete'
                        key={gabinete.id}
                        marca={gabinete.marca}
                        modelo={gabinete.nome}
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
