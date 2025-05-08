import styled from 'styled-components'
import { Componente } from '../../interfaces/componente'
import Subtitulo from '../Subtitulo/Subtitulo'
import style from './CardComponenteResumo.module.css'

interface Props {
    componente: Componente
}

function CardComponenteResumo({ componente }: Props) {

    const Paragrafo = styled.p`
        font-size: 1.15em;
    `

    function renderizarSpecsEspeciais(componente: Componente) {
        console.log(componente)
        if (componente.tipo === 'placamae') {
            return (
                <>
                    <Paragrafo>Socket: {componente.socket}</Paragrafo>
                    <Paragrafo>DDR: DDR{componente.ddr}</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }
    }
    
    return (
        <div className={style.containerCardResumo}>
            <Subtitulo tamanho={2}>Placa Mãe</Subtitulo>
            <div className={style.containerDetalhes}>
                <img src={componente.imagem} className={style.imagem} />
                <div className={style.containerSpecs}>
                    <Paragrafo>Marca: {componente.marca}</Paragrafo>
                    <Paragrafo>Modelo: {componente.modelo}</Paragrafo>
                    <Paragrafo>Fabricante: {componente.fabricante}</Paragrafo>
                    {renderizarSpecsEspeciais(componente)}
                    <Paragrafo>R$ {componente.preco}</Paragrafo>
                </div>
            </div>
        </div>
    )
}

export default CardComponenteResumo
