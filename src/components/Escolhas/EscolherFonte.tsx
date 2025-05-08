import { Link, useOutletContext } from 'react-router-dom'
import Titulo from '../Titulo/Titulo'
import style from './Escolhas.module.css'
import PC from '../../interfaces/pc'
import { useEffect, useState } from 'react'
import { Fonte } from '../../interfaces/componente'
import CardEscolha from '../CardEscolha/CardEscolha'
import Subtitulo from '../Subtitulo/Subtitulo'

type ContextType = {
    pcMontado: Partial<PC>
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function EscolherFonte() {
    const [listaFontes, setListaFontes] = useState<Fonte[]>([])
    const [modeloSelecionado, setModeloSelecionado] = useState<string | null>(null)
    const { pcMontado, setPcMontado } = useOutletContext<ContextType>()

    function selecionarModelo(modeloSelecionado: string) {
        setModeloSelecionado(modeloSelecionado)
        const fonteSelecionada = listaFontes.find(fonte => fonte.modelo === modeloSelecionado)
        setPcMontado(prev => ({ ...prev, fonte: fonteSelecionada }))
    }

    useEffect(() => {
        const listaReserva: Fonte[] = [
            {
                tipo: 'fonte',
                marca: 'MSI',
                modelo: 'MAG A650BN',
                fabricante: 'MSI',
                potencia: 650,
                certificacao: '80 Plus Bronze',
                cabos: [
                    { tipo: 'ATX (24 pinos)', quantidade: 1 },
                    { tipo: 'EPS (8 pinos)', quantidade: 1 },
                    { tipo: 'PCI-E (6+2 pinos)', quantidade: 2 },
                    { tipo: 'SATA (15 pinos)', quantidade: 5 },
                    { tipo: 'Molex (4 pinos)', quantidade: 2 },
                    { tipo: 'FDD  (4 pinos)', quantidade: 1 },
                ],
                imagem: 'https://images8.kabum.com.br/produtos/fotos/369658/fonte-msi-mag-a650bn-atx-650w-80-plus-bronze-pfc-ativo-entrada-bivolt-preto-306-7zp2b22-ce0_1665770996_g.jpg',
                preco: '319,99'
            },
            {
                tipo: 'fonte',
                marca: 'Corsair',
                modelo: 'CX Series CX750',
                fabricante: 'Corsair',
                potencia: 750,
                certificacao: '80 Plus Bronze',
                cabos: [
                    { tipo: 'ATX (24 pinos)', quantidade: 1 },
                    { tipo: 'EPS (8 pinos)', quantidade: 1 },
                    { tipo: 'PCI-E (6+2 pinos)', quantidade: 1 },
                    { tipo: 'SATA (15 pinos)', quantidade: 1 },
                    { tipo: 'Molex (4 pinos)', quantidade: 1 },
                    { tipo: 'FDD  (4 pinos)', quantidade: 1 },
                ],
                imagem: 'https://images7.kabum.com.br/produtos/fotos/516057/fonte-corsair-cx-series-cx750-750w-80-plus-bronze-sem-cabo-preto-cp-9020279-br_1714484853_g.jpg',
                preco: '509,99'
            },
            {
                tipo: 'fonte',
                marca: 'Gamemax',
                modelo: 'GS600',
                fabricante: 'Gamemax',
                potencia: 600,
                certificacao: '80 Plus white',
                cabos: [
                    { tipo: 'ATX (24 pinos)', quantidade: 1 },
                    { tipo: 'EPS (4 pinos)', quantidade: 2 },
                    { tipo: 'PCI-E (6+2 pinos)', quantidade: 2 },
                    { tipo: 'SATA (15 pinos)', quantidade: 4 },
                    { tipo: 'Molex (4 pinos)', quantidade: 2 },
                ],
                imagem: 'https://m.media-amazon.com/images/I/71BVs22e9TL._AC_SX679_.jpg',
                preco: '239,90'
            },
        ]

        setListaFontes(listaReserva)
    }, [])

    function calcularPotenciaTotal(pc: Partial<PC>): number {
        const potencias: (number | undefined)[] = [
          pc.armazenamento?.potencia,
          pc.memoriaRam?.potencia,
          pc.placaMae?.potencia,
          pc.placaVideo?.potencia,
          pc.processador?.potencia,
        ];
      
        return potencias.reduce((total: number, potencia) => total + (potencia ?? 0), 0);
      }

    const potenciaNecessaria = calcularPotenciaTotal(pcMontado)
    console.log(potenciaNecessaria);

    return (
        <div>
            <div className={style.cabecalhoEscolha}>
                <Link to='/criar-novo-pc/armazenamento'><h3>Anterior</h3></Link>
                <Titulo pos='center'>Escolha sua Fonte</Titulo>
                <Link to='/criar-novo-pc/gabinete'><h3>Próximo</h3></Link>
            </div>
            <Subtitulo pos='center'>Filtrando pela potencia mínima necessaria: {potenciaNecessaria}W</Subtitulo>
            <Subtitulo pos='center'>Potência recomendada: {potenciaNecessaria+50}W</Subtitulo>
            <div className={style.containerEscolhas}>
                {listaFontes.map((fonte) =>
                    <CardEscolha
                        componente='fonte'
                        key={fonte.modelo}
                        marca={fonte.marca}
                        modelo={fonte.modelo}
                        imagem={fonte.imagem}
                        preco={fonte.preco}
                        aoSelecionar={selecionarModelo}
                        selecionado={modeloSelecionado === fonte.modelo}
                        potencia={fonte.potencia}
                        certificacao={fonte.certificacao}
                    />
                )}
            </div>
        </div>
    )
}

export default EscolherFonte
