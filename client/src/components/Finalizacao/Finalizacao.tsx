import { Link, useOutletContext } from 'react-router-dom'
import Subtitulo from '../Subtitulo/Subtitulo'
import Titulo from '../Titulo/Titulo'
import style from './Finalizacao.module.css'
import PC from '../../interfaces/pc'
import ID from '../../id'
import { useState } from 'react'
import CardComponenteResumo from '../CardComponenteResumo/CardComponenteResumo'

type ContextType = {
  pcMontado: PC,
  setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function Finalizacao() {
  const [nomePc, setNomePc] = useState('')
  const {pcMontado, setPcMontado} = useOutletContext<ContextType>()
  function finalizarPC() {
    const pcFinalizado: PC = {
      id: ID(),
      nome: nomePc,
      valorTotal: pcMontado.valorTotal,
      armazenamento: pcMontado.armazenamento,
      fonte: pcMontado.fonte,
      memoriaRam: pcMontado.memoriaRam,
      placaMae: pcMontado.placaMae,
      processador: pcMontado.processador,
      videoIntegrado: pcMontado.videoIntegrado,
      gabinete: pcMontado.gabinete,
      placaVideo: pcMontado.placaVideo,
    };
  
    const listaAntigaString = localStorage.getItem('listaDePcs');
    const listaAntiga: PC[] = listaAntigaString ? JSON.parse(listaAntigaString) : [];
  
    const listaNova: PC[] = [...listaAntiga, pcFinalizado];
    localStorage.setItem('listaDePcs', JSON.stringify(listaNova));
  }

  function colocarNome(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    const novoNome = e.target.value
    setNomePc(novoNome)
  }

  function resetarPc(){
    setPcMontado({})
  }

  return (
    <div>
        <div className={style.cabecalhoFinalizacao}>
            <Titulo pos='center'>Resumo do PC</Titulo>
        </div>
        <Subtitulo pos='center'>Verifique o resumo para poder finalizar</Subtitulo>
        <div className={style.containerResumo}>
          <label htmlFor='nome' className={style.label}>Insira um nome para seu PC</label>
          <input onChange={colocarNome} className={style.inputNome} id='nome'/>
          <CardComponenteResumo componente={pcMontado.placaMae} />
          <CardComponenteResumo componente={pcMontado.processador} />
          {pcMontado.placaVideo ? <CardComponenteResumo componente={pcMontado.placaVideo}/> : ''}
          <CardComponenteResumo componente={pcMontado.memoriaRam} />
          <CardComponenteResumo componente={pcMontado.armazenamento} />
          <CardComponenteResumo componente={pcMontado.fonte} />
          {pcMontado.gabinete ? <CardComponenteResumo componente={pcMontado.gabinete} /> : ''}
        </div>
        <Titulo pos='center' cor='#FFF'>Seu computador ficou com um total de: {pcMontado.valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Titulo>
        <div>
            <Titulo pos='center'>Deseja Finalizar?</Titulo>
            <div className={style.opcoesFinalizacao}>
                <Link to='/criar-novo-pc/placamae' onClick={resetarPc}><Subtitulo cor='#fff'>Voltar para o começo</Subtitulo></Link>
                <Link to='/' onClick={finalizarPC}><Subtitulo cor='#fff'>Finalizar</Subtitulo></Link>
            </div>
        </div>
    </div>
  )
}

export default Finalizacao
