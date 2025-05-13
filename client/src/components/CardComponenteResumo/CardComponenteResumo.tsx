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
        margin-top: 0px;
        margin-bottom: 15px;
    `

    function renderizarSpecsEspeciais(componente: Componente) {
        if (componente.tipo === 'placamae') {
            return (
                <>
                    <Paragrafo>Socket: {componente.socket}</Paragrafo>
                    <Paragrafo>DDR: DDR{componente.ddr}</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'processador') {
            return (
                <>
                    <Paragrafo>Socket: {componente.socket}</Paragrafo>
                    <Paragrafo>Velocidade Clock: {componente.velocidade}MHz</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'placavideo') {
            return (
                <>
                    <Paragrafo>VRAM: {componente.vram}GB</Paragrafo>
                    <Paragrafo>GDDR: {componente.gddr}MHz</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'memoriaram') {
            return (
                <>
                    <Paragrafo>Tamanho: {componente.memoria}GB {componente.quantidade}</Paragrafo>
                    <Paragrafo>DDR: DDR{componente.ddr}</Paragrafo>
                    <Paragrafo>Velocidade: {componente.velocidade}MHZ</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'armazenamento') {
            return (
                <>
                    <Paragrafo>Tipo: {componente.tipoArmazenamento} {componente.tipoConexao}</Paragrafo>
                    <Paragrafo>Tamanho: {componente.capacidade}{componente.unidade}</Paragrafo>
                    <Paragrafo>Leitura: {componente.velocidadeLeitura}MB/s</Paragrafo>
                    <Paragrafo>Gravação: {componente.velocidadeGravacao}MB/s</Paragrafo>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'fonte') {
            return (
                <>
                    <Paragrafo>Potência: {componente.potencia}W</Paragrafo>
                    <Paragrafo>Cabos: {componente.cabos.map((cabo) => <>{cabo.tipo} x{cabo.quantidade} <br /></>)}</Paragrafo>
                </>
            )
        }

        if (componente.tipo === 'gabinete') {
            return (
                <>
                    <Paragrafo>Cor: {componente.cor}</Paragrafo>
                    <Paragrafo>Suporte para {componente.qtdFans} fans</Paragrafo>
                </>
            )
        }
    }

    return (
        <div className={style.containerCardResumo}>
            <Subtitulo tamanho={2}>{componente.nome}</Subtitulo>
            <div className={style.containerDetalhes}>
                <img src={componente.imagem} className={style.imagem} />
                <div className={style.containerSpecs}>
                    <Paragrafo>Marca: {componente.marca}</Paragrafo>
                    <Paragrafo>Modelo: {componente.modelo}</Paragrafo>
                    <Paragrafo>Fabricante: {componente.fabricante}</Paragrafo>
                    {renderizarSpecsEspeciais(componente)}
                    <Paragrafo>{componente.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Paragrafo>
                </div>
            </div>
        </div>
    )
}

export default CardComponenteResumo
