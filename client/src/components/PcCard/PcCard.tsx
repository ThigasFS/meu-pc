import style from './PcCard.module.css'
import logoAMD from '../../assets/amd.png'
import logoIntel from '../../assets/intel.png'
import logoRemove from '../../assets/remove.png'
import { Processador } from '../../interfaces/componente'

interface Props {
    id: number,
    processador: Processador,
    nome: string,
    onRemove: (id: number) => void
}

function PcCard({ id, processador, nome, onRemove }: Props) {
    const verificaProcessador = () => {
        if (processador.marca == 'Intel') {
            return <img src={logoIntel} alt='Logo da Intel' className={style.logoProcessador} />
        } else if (processador.marca == 'AMD') {
            return <img src={logoAMD} alt='Logo da AMD' className={style.logoProcessador} />
        }
        return null
    }

    function removerPc(e: React.MouseEvent<HTMLElement>){
        e.preventDefault()
        onRemove(id)
    }

    return (
        <div className={style.containerPC}>
            <div className={style.fechar} onClick={removerPc}>
                <img src={logoRemove} alt='X para fechar' width={16} height={16}/>
            </div>
            <div className={style.divImagem}>
                {verificaProcessador()}
            </div>
            <div className={style.barra} />
            <p>{nome}</p>
        </div>
    )
}

export default PcCard