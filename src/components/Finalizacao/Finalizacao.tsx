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
          <input onChange={colocarNome} className={style.inputNome}/>
          <CardComponenteResumo componente={pcMontado.placaMae} />
        </div>
        <div>
            <Titulo pos='center'>Deseja Finalizar?</Titulo>
            <div className={style.opcoesFinalizacao}>
                <Link to='/criar-novo-pc/placamae' onClick={resetarPc}><Subtitulo>Voltar para o começo</Subtitulo></Link>
                <Link to='/' onClick={finalizarPC}><Subtitulo>Finalizar</Subtitulo></Link>
            </div>
        </div>
    </div>
  )
}

export default Finalizacao
