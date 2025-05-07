import style from './CardEscolha.module.css'

interface Props {
    imagem: string,
    marca: string,
    modelo: string,
    preco: string,
    socket?: string,
    aoSelecionar: (modelo: string) => void,
    selecionado: boolean
}

function CardEscolha({imagem,marca,modelo,preco,socket, selecionado, aoSelecionar}: Props) {
    function selecionar(e: React.MouseEvent<HTMLDivElement>){
        e.preventDefault()
        aoSelecionar(modelo)
    }
  return (
    <div className={`${style.containerPlaca} ${selecionado ? style.selecionado : ''}`} onClick={selecionar}>
        <img src={imagem} alt='Imagem da Placa' className={style.imagemComponente}/>
        <p>{marca} {modelo}</p>
        {!socket ? '' : <p>Socket: {socket}</p>}
        <p>R$ {preco}</p>
    </div>
  )
}

export default CardEscolha
