import style from './CardEscolha.module.css'

interface Props {
  imagem: string,
  marca: string,
  modelo: string,
  preco: string,
  socket?: string,
  videoIntegrado?: boolean
  aoSelecionar: (modelo: string) => void,
  selecionado: boolean,
  componente: string,
  vram?: number,
  gddr?: number,
  ddr?: number,
  quantidade?: string,
  velocidade?: number,
  memoria?: number,
  tipoArmazenamento?: string,
  tipoConexao?: string,
  velocidadeLeitura?: number,
  velocidadeGravacao?: number,
  capacidade?: number,
  unidade?: string,
  potencia?: number,
  certificacao?: string,
  fans?: number,
  cor?: string
}

function CardEscolha({ imagem, marca, modelo, preco, socket, selecionado, aoSelecionar, videoIntegrado, componente, gddr, vram, ddr, quantidade, velocidade, memoria, capacidade, tipoArmazenamento, tipoConexao, unidade, velocidadeGravacao, velocidadeLeitura, certificacao, potencia, fans, cor }: Props) {
  function selecionar(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    aoSelecionar(modelo)
  }

  function renderizarDetalhesPorComponente() {

    if (componente === 'placamae') {
      return (
        <>
          <p>{marca} {modelo}</p>
          <p>Socket: {socket}</p>
          <p>DDR{ddr}</p>
        </>
      )
    }

    if (componente === 'processador') {
      return (
        <>
          <p>{marca} {modelo}, {velocidade}</p>
          <p>{videoIntegrado ? 'Tem vídeo integrado' : 'Não tem vídeo integrado'}</p>
        </>
      )
    }

    if (componente === 'placavideo') {
      return (
        <>
          <p>{marca} {modelo}, {vram}GB, GDDR{gddr}</p>
        </>
      )
    }

    if (componente === 'memoriaram') {
      return (
        <>
          <p>{marca} {modelo}, {memoria}GB {quantidade}, {velocidade}MHz, DDR{ddr} </p>
        </>
      )
    }

    if(componente === 'armazenamento'){
      return(
        <>
          <p>{marca} {modelo},{tipoArmazenamento} {tipoConexao}, {capacidade}{unidade}, Leitura: {velocidadeLeitura}MB/s Gravação: {velocidadeGravacao}MB/s</p>
        </>
      )
    }

    if(componente === 'fonte') {
      return (
        <>
          <p>{marca} {modelo}, {potencia}W, {certificacao}</p>
        </>
      )
    }

    if(componente === 'gabinete') {
      return (
        <>
          <p>{marca} {modelo}, {cor}, Suporte para {fans} fans</p>
        </>
      )
    }
  }

  return (
    <div className={`${style.containerPlaca} ${selecionado ? style.selecionado : ''}`} onClick={selecionar}>
      <img src={imagem} alt='Imagem da Placa' className={style.imagemComponente} />
      {renderizarDetalhesPorComponente()}
      <p>R$ {preco}</p>
    </div>
  )
}

export default CardEscolha
