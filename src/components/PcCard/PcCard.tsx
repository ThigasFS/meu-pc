import style from './PcCard.module.css'
import logoAMD from '../../assets/amd.png'
import logoIntel from '../../assets/intel.png'
import logoRemove from '../../assets/remove.png'

interface Props {
    id: number,
    processador: string,
    descricao: string,
    onRemove: (id: number) => void
}

function PcCard({ id, processador, descricao, onRemove }: Props) {
    const verificaProcessador = () => {
        if (processador === 'intel') {
            return <img src={logoIntel} alt='Logo da Intel' className={style.logoProcessador} />
        } else if (processador === 'amd') {
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
            <p>{descricao}</p>
        </div>
    )
}

export default PcCard