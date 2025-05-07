import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { PlacaMae } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link } from "react-router-dom"

function EscolherPlacaMae() {
    const [listaPlacasMaes, setListaPlacasMaes] = useState<PlacaMae[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const placaMaeSelecionada = listaPlacasMaes.find(placa => placa.modelo === modeloSelecionado)
        console.log(placaMaeSelecionada);
    }

    useEffect(() => {
        const listaReserva: PlacaMae[] = [
            {
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
                marca: 'Asus',
                modelo: 'B650-A',
                fabricante: 'Asus',
                potencia: 10,
                socket: 'AM5',
                ddr: 5,
                imagem: 'https://m.media-amazon.com/images/I/81MH+nx+shL._AC_SX569_.jpg',
                preco: '2460,00'
            },
        ]
        setListaPlacasMaes(listaReserva)
    }, [])
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Titulo>Escolha sua Placa Mãe</Titulo>
                <Link to='/criar-novo-pc/processador'><p>Próximo</p></Link>
            </div>
            <div className={style.containerEscolhas}>
                {listaPlacasMaes.map((placa) => (
                    <CardEscolha
                        key={placa.modelo}
                        imagem={placa.imagem}
                        marca={placa.marca}
                        modelo={placa.modelo}
                        preco={placa.preco}
                        socket={placa.socket}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === placa.modelo}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherPlacaMae
