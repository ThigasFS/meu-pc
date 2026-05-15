import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import PC from '../../interfaces/pc'
import { useEffect, useState } from 'react'
import { Fonte } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import axios from 'axios'
import BotaoEscolhas from '../BotaoEscolhas/BotaoEscolhas'
import { Grid } from '@mui/material'
import LayoutEscolhas from './LayoutEscolhas/Layout'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherFonte() {
    const [listaFontes, setListaFontes] = useState<Fonte[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    const navigate = useNavigate()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const fonteSelecionada = listaFontes.find(fonte => fonte.id === modeloSelecionado)
        if (fonteSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.fonte?.preco ?? 0
                const valorNovo = fonteSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    fonte: fonteSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    console.log(pcMontado)

    useEffect(() => {
        axios.get('http://localhost:3000/api/supply')
            .then(res => {
                setListaFontes(res.data)
            })
            .catch(erro => console.error(erro))
    }, [])

    function calcularPotenciaTotal(pc: Partial<PC>): number {
        const tdpCPU = pc.processador?.tdp ?? 0
        const tdpGPU = pc.placaVideo?.tdp ?? 0
        const ram = (pc.memoriaRam?.modulos[1] ?? 1) * 5
        const placamae = 50
        const armazenamento = 5

        const consumoTotal = tdpCPU + tdpGPU + placamae + ram + armazenamento

        return consumoTotal
    }

    function calcularUsoFonte(potenciaFonte: number) {
        return Math.round((potenciaNecessaria / potenciaFonte) * 100)
    }

    const potenciaNecessaria = calcularPotenciaTotal(pcMontado)
    const potenciaRecomendada = potenciaNecessaria + 200
    const fontesFiltradas = listaFontes.filter(
        fonte => fonte.potencia >= potenciaRecomendada
    )
    const usoFonte = calcularUsoFonte(potenciaNecessaria)

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.fonte?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, fonte: undefined, valorTotal: valorTotalAtualizado }
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

    return (
        <LayoutEscolhas
            titulo="Escolha sua Fonte"
            valorTotal={pcMontado.valorTotal}
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/gabinete">
                    <BotaoEscolhas />
                </Link>
            }
            infosExtras={[
                {
                    label: 'Potência mínima necessaria',
                    valor: `${potenciaNecessaria}W`
                },
                {
                    label: 'Potência recomendada',
                    valor: `${potenciaNecessaria + 200}W`
                },
                {
                    label: 'Uso estimado',
                    valor: `${usoFonte}%`
                }
            ]}
        >
            {fontesFiltradas.map(fonte =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={fonte.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        componente='fonte'
                        key={fonte.id}
                        marca={fonte.marca}
                        modelo={fonte.nome}
                        imagem={fonte.imagem}
                        preco={fonte.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === fonte.id}
                        potencia={fonte.potencia}
                        certificacao={fonte.certificacao}
                        id={fonte.id}
                    />
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherFonte
