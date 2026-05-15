import { useEffect, useState } from "react"
import { PlacaMae } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import axios from "axios"
import BotaoEscolhas from "../BotaoEscolhas/BotaoEscolhas"
import { Grid } from "@mui/material"
import LayoutEscolhas from "./LayoutEscolhas/Layout"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    const navigate = useNavigate()

    function selecionarModelo(modeloSelecionado: number) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.id === modeloSelecionado)
        if (placaMaeSelecionada) {
            setPcMontado(prev => {
                const valorAnterior = prev.placaMae?.preco ?? 0
                const valorNovo = placaMaeSelecionada.preco ?? 0
                const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior + valorNovo

                return {
                    ...prev,
                    placaMae: placaMaeSelecionada,
                    valorTotal: valorTotalAtualizado
                }
            })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/motherboard')
            .then(res => {
                const mbApi = res.data as PlacaMae[]
                const mbsCompletas = mbApi
                    .filter((mb) =>
                        mb.nome &&
                        mb.socket &&
                        mb.marca &&
                        mb.imagem &&
                        mb.chipset &&
                        mb.ddr &&
                        mb.preco > 0 &&
                        mb.valores &&
                        mb.valores.length > 0
                    )
                    .map((mb, index) => ({
                        ...mb,
                        id: index + 1
                    }))

                const mbsSocketAtual = mbsCompletas.filter((mb) => mb.socket === pcMontado.processador?.socket)

                setListaPlacasMaes(mbsSocketAtual)
            })
            .catch(erro => console.error(erro))
    }, [pcMontado?.processador?.socket])

    function cancelarEscolha() {
        setPcMontado(prev => {
            const valorAnterior = prev.placaMae?.preco ?? 0
            const valorTotalAtualizado = (prev.valorTotal ?? 0) - valorAnterior
            return { ...prev, placaMae: undefined, valorTotal: valorTotalAtualizado }
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
            titulo="Escolha sua Placa Mãe"
            valorTotal={pcMontado.valorTotal}
            onAnterior={voltarAnterior}
            onCancelar={cancelarPc}
            acaoDireita={
                <Link to="/criar-novo-pc/placavideo">
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
            {listaPlacasMaes.map(mb =>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2.4
                    }}
                    key={mb.id}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <CardEscolha
                        componente="placamae"
                        key={mb.id}
                        imagem={mb.imagem}
                        marca={mb.marca}
                        modelo={mb.nome}
                        preco={mb.preco}
                        socket={mb.socket}
                        ddr={mb.ddr}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === mb.id}
                        id={mb.id}
                    />
                </Grid>
            )}
        </LayoutEscolhas >
    )
}

export default EscolherPlacaMae
