import { useEffect, useState } from 'react'
import ID from '../../id.tsx'
import PC from '../../interfaces/pcsalvo.tsx'
import ListaSalvos from '../ListaSalvos/ListaSalvos.tsx'
import Titulo from '../Titulo/Titulo.tsx'
import style from './Salvos.module.css'
import { Link } from 'react-router-dom'

function Salvos() {

    function criarPCs(){
        const pc: PC = {
            id: ID(),
            descricao: "Pitucho",
            placaMae: 'H550M',
            processador: 'intel'
        }
        const novaLista = [...listaSalvos, pc]
        setListaSalvos(novaLista)
        localStorage.setItem('listaDePcs', JSON.stringify(novaLista))
    }

    const [listaSalvos, setListaSalvos] = useState<PC[]>([])

    useEffect(() => {
      const listaStorage = localStorage.getItem('listaDePcs')
        if (listaStorage) {
            setListaSalvos(JSON.parse(listaStorage))
        }
    }, [])

    function removerPc(id: number) {
      const novaLista = listaSalvos.filter(pc => pc.id !== id)
      setListaSalvos(novaLista)
      localStorage.setItem('listaDePcs', JSON.stringify(novaLista))
    }

  return (
    <div className={style.container}>
        <Titulo pos='center'>Seus PCs salvos</Titulo>
        <ListaSalvos pcs={listaSalvos} onRemove={removerPc}/>
        <Link to='/criar-novo-pc/placamae' className={style.containerBotao}>
          <button onClick={() => criarPCs()} className={style.botaoCriar}>Criar novo PC</button>
        </Link>
    </div>
  )
}

export default Salvos
