import { useEffect, useState } from "react"
import { MemoriaRAM } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"
import LayoutEscolhas from "./LayoutEscolhas/Layout"
import { Grid } from "@mui/material"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherMemoriaRAM() {
    const [listaMemorias, setListaMemorias] = useState<MemoriaRAM[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    const navigate = useNavigate()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const memoriaRamSelecionada = listaMemorias.find(memoria => memoria.id === modeloSelecionado)
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
        axios.get('http://localhost:3000/api/ram')
            .then(res => {
                const ramsApi = res.data as MemoriaRAM[]
                const ramsCompleta = ramsApi.filter((ram) =>
                    ram.marca &&
                    ram.capacidade &&
                    ram.cl &&
                    ram.ddr &&
                    ram.id &&
                    ram.imagem &&
                    ram.modulos?.length &&
                    ram.preco &&
                    ram.valores?.length &&
                    ram.velocidade
                )
                    .map((mb, index) => ({
                        ...mb,
                        id: index + 1
                    }))

                const ramDdrAtual = ramsCompleta.filter((ram) => ram.ddr === pcMontado?.placaMae?.ddr)
                setListaMemorias(ramDdrAtual)
                console.log(ramsCompleta)
            })
            .catch(erro => console.error(erro))
    }, [pcMontado.placaMae?.ddr])

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.memoriaRam?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, memoriaRam: undefined, valorTotal: valorTotalAtualizado }
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
            titulo="Escolha sua Memória RAM"
            valorTotal={pcMontado.valorTotal}
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/armazenamento">
                    <BotaoEscolhas />
                </Link>
            }
            infosExtras={[
                {
                    label: "Sua memória",
                    valor: listaMemorias.length === 0 ? 'Não há nenhuma memória compatível com este DDR' : `Apenas mostrando as memórias com o DDR${pcMontado.placaMae?.ddr}`
                }
            ]}
        >
            {listaMemorias.map(memoria =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={memoria.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        componente="memoriaram"
                        key={memoria.id}
                        imagem={memoria.imagem}
                        marca={memoria.marca}
                        modelo={memoria.nome}
                        preco={memoria.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === memoria.id}
                        ddr={memoria.ddr}
                        velocidade={memoria.velocidade}
                        modulos={memoria.modulos}
                        capacidadeRam={memoria.capacidade}
                        id={memoria.id}
                    />
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherMemoriaRAM
