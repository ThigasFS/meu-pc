import style from './PcCard.module.css'
import logoAMD from '../../assets/amd.png'
import logoIntel from '../../assets/intel.png'

interface Props{
    processador: 'intel' | 'amd'
    descricao: string
}

function PcCard({processador, descricao}: Props) {
    const verificaProcessador = (processador: string) => {
        if(processador === 'intel'){
            return <img src={logoIntel} alt='Logo da Intel'/>
        }else if(processador === 'amd'){
            return <img src={logoAMD} alt='Logo da AMD'/>
        }
    }

  return (
    <div className={style.containerPC}>
            <div className={style.divImagem}>
                {verificaProcessador(processador)}
            </div>
            <p>{descricao}</p>
        </div>
  )
}

export default PcCard