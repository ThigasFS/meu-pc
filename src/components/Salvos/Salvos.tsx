import ID from '../../id.tsx'
import PC from '../../interfaces/pc.tsx'
import ListaSalvos from '../ListaSalvos/ListaSalvos.tsx'
import Titulo from '../Titulo/Titulo.tsx'
import style from './Salvos.module.css'

function Salvos() {
    function criarPCs(){
        const listaStorage = localStorage.getItem('listaDePcs')
        const pc: PC = {
            id: ID(),
            descricao: "Pitucho",
            placaMae: 'H550M',
            processador: 'intel'
        }
        if(listaStorage){
          const listaAntiga = JSON.parse(listaStorage)
          const listaNova = [...listaAntiga, pc]
          localStorage.setItem('listaDePcs', JSON.stringify(listaNova))
        }else {
          localStorage.setItem('listaDePcs', JSON.stringify([pc]));
        }
    }
  return (
    <div className={style.container}>
        <Titulo pos='center'>Seus PCs salvos</Titulo>
        <ListaSalvos />
        <button onClick={() => criarPCs()}>Criar</button>
    </div>
  )
}

export default Salvos
