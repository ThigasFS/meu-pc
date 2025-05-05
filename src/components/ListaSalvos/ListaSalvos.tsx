import style from './ListaSalvos.module.css'
import PcCard from '../PcCard/PcCard'
import PC from '../../interfaces/pc'

function ListaSalvos() {
    try{
        localStorage.getItem('listaDePcs')
    }catch(erro){
        console.error(erro)
    }
    const listaStorage = localStorage.getItem('listaDePcs')
    let lista
    if(listaStorage){
        lista = JSON.parse(listaStorage)
        console.log(lista)
    }
  return (
    <div className={style.containerLista}>
        <ul className={style.divLista}>
            {!lista ? <p>Não há nenhum PC salvo</p> : lista.map((pc: PC) => <PcCard processador={pc.processador} descricao={pc.descricao} />)}
        </ul>
    </div>
  )
}

export default ListaSalvos