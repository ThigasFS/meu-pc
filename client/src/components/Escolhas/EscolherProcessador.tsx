import { useEffect, useState } from "react"
import style from './Escolhas.module.css'
import { PrecoLoja, Processador, ProcessadorAPI } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import { Box, Typography } from "@mui/material"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherProcessador() {
    const [listaProcessadores, setListaProcessadores] = useState<Processador[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function definirSocket(microarquitetura: string): string {
        const arch = microarquitetura.toLowerCase();

        //AMD
        if (arch.includes("zen 5")) return "AM5"
        if (arch.includes("zen 4")) return "AM5"
        if (arch.includes("zen 3")) return "AM4"
        if (arch.includes("zen 2")) return "AM4"

        return "Desconhecido"
    }

    function definirMarca(nome: string): string {
        const n = nome.toLowerCase()

        if (n.includes('amd')) return 'AMD'
        if (n.includes('intel')) return 'Intel'

        return 'Desconhecida'
    }

    function menorPreco(valores: PrecoLoja[]): number {
        if (!valores.length) return 0

        return Math.min(...valores.map(v => v.preco))
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/cpu')
            .then(res => {
                const cpusApi = res.data as ProcessadorAPI[]
                const cpus = cpusApi.map((proc, index) => {
                    const cpu: Processador = {
                        id: index + 1,
                        nome: proc.name,
                        socket: definirSocket(proc.microarchitecture),
                        tdp: proc.tdp,
                        velocidade: proc.core_clock,
                        videoIntegrado: !!proc.graphics,
                        marca: definirMarca(proc.name),
                        imagem: '',
                        valores: [],
                        preco: menorPreco([]),
                    }

                    return cpu
                })

                setListaProcessadores(cpus)
            })
            .catch(erro => console.error(erro));
    }, [])

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const processadorSelecionado = listaProcessadores.find(processador => processador.id === modeloSelecionado)
        if (processadorSelecionado) {
            setPcMontado(prev => {
                const valorAnterior = prev.processador?.preco ?? 0
                const valorNovo = processadorSelecionado.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    processador: processadorSelecionado,
                    valorTotal: valorTotalAtualizado,
                    videoIntegrado: processadorSelecionado.videoIntegrado
                }
            })
        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 32, color: 'white' }}>Escolha seu Processador</Typography>
                <Link to='/criar-novo-pc/placamae'><BotaoEscolhas /></Link>
            </Box>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>Socket atual: {pcMontado.processador?.socket ?? 'N/A'}</Typography>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
            <div className={style.containerEscolhas}>
                {listaProcessadores.map((processador) => (
                    <CardEscolha
                        componente="processador"
                        key={processador.id}
                        imagem={processador.imagem}
                        marca={processador.marca}
                        modelo={processador.nome}
                        preco={processador.preco}
                        socket={processador.socket}
                        videoIntegrado={processador.videoIntegrado}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === processador.id}
                        id={processador.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherProcessador