import { useEffect, useState } from "react"
import { Processador } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"
import { Grid } from "@mui/material"
import LayoutEscolhas from "./LayoutEscolhas/Layout"
import ProductFilters from "../FiltroProduto/FiltroProduto"
import { cpuFilters } from "../../config/cpuFilters"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherProcessador() {
    const [listaProcessadores, setListaProcessadores] = useState<Processador[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()
    
    const [pesquisa, setPesquisa] = useState("")
    const [ordenacao, setOrdenacao] = useState("preco")
    const [filtros, setFiltros] = useState<Record<string, string>>({})

    const navigate = useNavigate()

    function alterarFiltro(
        filtroId: string,
        valor: string
    ) {
        setFiltros(prev => ({
            ...prev,
            [filtroId]: valor
        }))
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/cpu')
            .then(res => {
                const cpusApi = res.data as Processador[]

                const cpusCompletas = cpusApi
                    .filter((proc) =>
                        proc.nome &&
                        proc.socket &&
                        proc.marca &&
                        proc.imagem &&
                        proc.velocidade > 0 &&
                        proc.tdp > 0 &&
                        proc.preco > 0 &&
                        proc.valores &&
                        proc.valores.length > 0
                    )
                    .map((proc, index) => ({
                        ...proc,
                        id: index + 1
                    }))

                setListaProcessadores(cpusCompletas)
            })
            .catch(erro => console.error(erro))
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

    function cancelarPc() {
        setPcMontado({})
        navigate('/')
    }

    function voltarAnterior() {
        navigate(-1)
    }

    const processadoresFiltrados =
    [...listaProcessadores]
        .filter(cpu => {

            if (
                pesquisa &&
                !cpu.nome
                    .toLowerCase()
                    .includes(
                        pesquisa.toLowerCase()
                    )
            ) {
                return false
            }

            if (
                filtros.marca &&
                cpu.marca !== filtros.marca
            ) {
                return false
            }

            if (
                filtros.socket &&
                cpu.socket !== filtros.socket
            ) {
                return false
            }

            return true
        })
        .sort((a, b) => {

            switch (ordenacao) {

                case "nome":
                    return a.nome.localeCompare(
                        b.nome
                    )

                case "clock":
                    return b.velocidade - a.velocidade

                case "preco":
                default:
                    return a.preco - b.preco
            }
        })

        console.log(filtros)
console.log(processadoresFiltrados.length)

    return (
        <LayoutEscolhas
            titulo="Escolha seu Processador"
            valorTotal={pcMontado.valorTotal}
            primeiraEtapa
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/placamae">
                    <BotaoEscolhas />
                </Link>
            }
            infosExtras={[
                {
                    label: "Socket atual",
                    valor: pcMontado.processador?.socket ?? "N/A"
                }
            ]}
        >
            <ProductFilters
                pesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                filtros={cpuFilters}
                valores={filtros}
                onFiltroChange={alterarFiltro}
                ordenacao={ordenacao}
                onOrdenacaoChange={setOrdenacao}
            />

            <Grid size={12}>
                <p
                    style={{
                        color: "#AAA",
                        marginBottom: 20
                    }}
                >
                    {processadoresFiltrados.length} processadores encontrados
                </p>
            </Grid>

            {processadoresFiltrados.map(cpu =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={cpu.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        componente="processador"
                        key={cpu.id}
                        imagem={cpu.imagem}
                        marca={cpu.marca}
                        modelo={cpu.nome}
                        preco={cpu.preco}
                        socket={cpu.socket}
                        velocidade={cpu.velocidade}
                        videoIntegrado={cpu.videoIntegrado}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === cpu.id}
                        id={cpu.id}
                    />
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherProcessador