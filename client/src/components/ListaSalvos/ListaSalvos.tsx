import style from './ListaSalvos.module.css'
import PcCard from '../PcCard/PcCard'
import PC from '../../interfaces/pc'
import { Typography } from '@mui/material'

interface Props {
    pcs: PC[],
    onRemove: (id: number) => void
}

function ListaSalvos({pcs, onRemove}: Props) {
  return (
    <div className={style.containerLista}>
        <ul className={style.divLista}>
            {pcs.length === 0 
              ? <Typography sx={{color: 'white', fontWeight: '600', fontSize: 24}}>Não há nenhum PC salvo</Typography> 
              : pcs.map((pc: PC) => 
                <PcCard key={pc.id} id={pc.id} processador={pc.processador} nome={pc.nome} onRemove={onRemove}/>
            )}
        </ul>
    </div>
  )
}

export default ListaSalvos