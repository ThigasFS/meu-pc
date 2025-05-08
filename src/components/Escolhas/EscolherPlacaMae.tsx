import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { PlacaMae } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link, useOutletContext } from "react-router-dom"
import PC from "../../interfaces/pc"

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const {setPcMontado} = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.modelo === modeloSelecionado)
        setPcMontado(prev => ({...prev, placaMae: placaMaeSelecionada}))
    }

    useEffect(() => {
        const listaReserva: PlacaMae[] = [
            {
                tipo: 'placamae',
                marca: 'Gigabyte',
                modelo: 'B550M',
                fabricante: 'Gigabyte',
                potencia: 10,
                socket: 'AM4',
                ddr: 4,
                imagem: 'https://m.media-amazon.com/images/I/81QyMksmunL._AC_SX679_.jpg',
                preco: '839,00'
            },
            {
                tipo: 'placamae',
                marca: 'Asus',
                modelo: 'B650-A',
                fabricante: 'Asus',
                potencia: 10,
                socket: 'AM5',
                ddr: 5,
                imagem: 'https://m.media-amazon.com/images/I/81MH+nx+shL._AC_SX569_.jpg',
                preco: '2460,00'
            },
            {
                tipo: 'placamae',
                marca: 'Asus',
                modelo: 'H610M-CS',
                fabricante: 'Asus',
                potencia: 20,
                socket: 'LGA1700',
                ddr: 4,
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/r/prime-h610m-cs-d44.jpg',
                preco: '599,99'
            }
        ]
        setListaPlacasMaes(listaReserva)
    }, [])
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
        </div>
    )
}

export default EscolherPlacaMae
