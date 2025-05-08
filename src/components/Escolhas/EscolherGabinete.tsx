import { Link, useOutletContext } from 'react-router-dom'
import style from './Escolhas.module.css'
import Titulo from '../Titulo/Titulo'
import { useEffect, useState } from 'react'
import { Gabinete } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import PC from '../../interfaces/pc'
import Subtitulo from '../Subtitulo/Subtitulo'

type ContextType = {
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherGabinete() {
    const [listaGabinetes, setListaGabinetes] = useState<Gabinete[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const {setPcMontado} = useOutletContext<ContextType>()

    useEffect(() => {
        const listaReserva: Gabinete[] = [
            {
                tipo: 'gabinete',
                marca: 'TGT',
                modelo: 'Legion',
                fabricante: 'TGT',
                qtdFans: 5,
                cor: 'Preto',
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/t/g/tgt-lgn-bk145455564.jpg',
                preco: '149,99'
            },
            {
                tipo: 'gabinete',
                marca: 'Pichau',
                modelo: 'Apus',
                fabricante: 'Pichau',
                qtdFans: 3,
                cor: 'Preto',
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/g/pg-aps-rgb01.jpg',
                preco: '299,99'
            },
            {
                tipo: 'gabinete',
                marca: 'Liketec',
                modelo: 'Heydar Snow',
                fabricante: 'Liketec',
                qtdFans: 4,
                cor: 'Branco',
                imagem: 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-liketec-heydar-snow-mid-tower-cube-design-atx-vidro-temperado-branco-sem-fan-lc-cb-heydar-2087_202644.jpg',
                preco: '169,90'
            },
            {
                tipo: 'gabinete',
                marca: 'Mancer',
                modelo: 'Narok V2',
                fabricante: 'Mancer',
                qtdFans: 3,
                cor: 'Branco',
                imagem: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/c/mcr-nrkwh-v2.jpg',
                preco: '219,99'
            },
        ]

        setListaGabinetes(listaReserva)
    }, [])

    function selecionarModelo(modeloSelecionado: string){
        setModeloSelecionado(modeloSelecionado)
        const gabineteSelecionado = listaGabinetes.find(gabinete => gabinete.modelo === modeloSelecionado)
        setPcMontado(prev => ({...prev, gabinete: gabineteSelecionado}))
    }
    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/fonte'><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha seu Gabinete</Titulo>
                <Link to='/criar-novo-pc/finalizacao'><h3>Finalizar</h3></Link>
            </div>
            <Subtitulo pos='center'>A escolha do gabinete não é obrigatória, é possível finalizar sem ele</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaGabinetes.map((gabinete) =>
                    <CardEscolha
                        componente='gabinete'
                        key={gabinete.modelo}
                        marca={gabinete.marca}
                        modelo={gabinete.modelo}
                        imagem={gabinete.imagem}
                        preco={gabinete.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === gabinete.modelo}
                        fans={gabinete.qtdFans}
                        cor={gabinete.cor}
                    />
                )}
            </div>
        </div>
    )
}

export default EscolherGabinete
