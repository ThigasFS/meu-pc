import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { PlacaMae } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"
import Subtitulo from "../Subtitulo/Subtitulo"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.modelo === modeloSelecionado)
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
        const listaReserva: PlacaMae[] = [
            {
                tipo: 'placamae',
                nome: 'Placa Mãe',
                marca: 'Gigabyte',
                modelo: 'B550M',
                fabricante: 'Gigabyte',
                potencia: 10,
                socket: 'AM4',
                ddr: 4,
                imagem: 'https://m.media-amazon.com/images/I/81QyMksmunL._AC_SX679_.jpg',
                preco: 839.00
            },
            {
                tipo: 'placamae',
                nome: 'Placa Mãe',
                marca: 'Asus',
                modelo: 'B650-A',
                fabricante: 'Asus',
                potencia: 10,
                socket: 'AM5',
                ddr: 5,
                imagem: 'https://m.media-amazon.com/images/I/81MH+nx+shL._AC_SX569_.jpg',
                preco: 2460.00
            },
            {
                tipo: 'placamae',
                nome: 'Placa Mãe',
                marca: 'Asus',
                modelo: 'H610M-CS',
                fabricante: 'Asus',
                potencia: 20,
                socket: 'LGA1700',
                ddr: 4,
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/r/prime-h610m-cs-d44.jpg',
                preco: 599.99
            }
        ]
        setListaPlacasMaes(listaReserva)
    }, [pcMontado])
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Titulo>Escolha sua Placa Mãe</Titulo>
                <Link to='/criar-novo-pc/processador'><h3>Próximo</h3></Link>
            </div>
            <div className={style.containerEscolhas}>
                {listaPlacasMaes.map((placa) => (
                    <CardEscolha
                        componente="placamae"
                        key={placa.modelo}
                        imagem={placa.imagem}
                        marca={placa.marca}
                        modelo={placa.modelo}
                        preco={placa.preco}
                        socket={placa.socket}
                        ddr={placa.ddr}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placa.modelo}
                    />
                ))}
            </div>
            <Subtitulo pos='center' cor='#fff'>Preço do Computador: {pcMontado.valorTotal?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Subtitulo>
        </div>
    )
}

export default EscolherPlacaMae
