import { useEffect, useState } from "react"
import Titulo from "../Titulo/Titulo"
import style from './Escolhas.module.css'
import { Processador } from "../../interfaces/componente"
import CardEscolha from "../CardEscolha/CardEscolha"
import { Link } from "react-router-dom"

function EscolherProcessador() {
    const [listaProcessador, setListaProcessador] = useState<Processador[]>([])

    useEffect(() => {
        const listaReserva: Processador[] = [
            {
                marca: 'AMD',
                modelo: 'Ryzen 5 5500',
                fabricante: 'AMD',
                potencia: 65,
                socket: 'AM4',
                imagem: 'https://m.media-amazon.com/images/I/51So7GoGvxL._AC_SX679_.jpg',
                preco: '549,99',
                velocidade: 3.6,
                videoIntegrado: false
            },
            {
                marca: 'Intel',
                modelo: 'i5-12400F',
                fabricante: 'Intel',
                potencia: 10,
                socket: 'LGA 1700',
                imagem: 'https://m.media-amazon.com/images/I/51A6E9HPocL._AC_SX679_.jpg',
                preco: '979,90',
                velocidade: 2.5,
                videoIntegrado: true
            },
        ]
        setListaProcessador(listaReserva)
    }, [])

    function aoSelecionar(modelo: string){
        const novaLista = listaProcessador.filter(processador => processador.modelo === modelo)
        console.log(novaLista)
    }
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/placamae'><p>Anterior</p></Link>
                <Titulo>Escolha seu Processador</Titulo>
                <Link to='/criar-novo-pc/processador'><p>Próximo</p></Link>
            </div>
            <p>Apenas mostrando os processadores com o socket: { }</p>
            <div className={style.containerEscolhas}>
                {listaProcessador.map((processador) => (
                    <CardEscolha
                        imagem={processador.imagem}
                        marca={processador.marca}
                        modelo={processador.modelo}
                        preco={processador.preco}
                        socket={processador.socket}
                        aoSelecionar={aoSelecionar}
                        selecionado={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default EscolherProcessador