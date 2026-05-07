import style from './CardEscolha.module.css'

interface Props {
  id: number,
  imagem: string,
  marca: string,
  modelo: string,
  preco: number,
  socket?: string,
  videoIntegrado?: boolean
  aoSelecionar: (id: number) => void,
  selecionado: boolean,
  componente: string,
  vram?: number,
  gddr?: number,
  ddr?: number,
  modulos?: number[],
  velocidade?: number,
  capacidadeRam?: number,
  tipoArmazenamento?: string,
  tipoConexao?: string,
  velocidadeLeitura?: number,
  velocidadeGravacao?: number,
  capacidade?: number,
  unidade?: string,
  potencia?: number,
  certificacao?: string,
  fans?: number,
  cor?: string,
}

function CardEscolha({ id,imagem, marca, modelo, preco, socket, selecionado, aoSelecionar, videoIntegrado, componente, gddr, vram, ddr, capacidade, velocidade, modulos, capacidadeRam, tipoArmazenamento, tipoConexao, unidade, velocidadeGravacao, velocidadeLeitura, certificacao, potencia, fans, cor }: Props) {
  function selecionar(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    aoSelecionar(id);
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
          <p>{modelo}, {velocidade}GHz</p>
          <p>{videoIntegrado ? 'Tem vídeo integrado' : 'Não tem vídeo integrado'}</p>
        </>
      )
    }

    if (componente === 'placavideo') {
      return (
        <>
          <p>{modelo}, {vram}GB, GDDR{gddr}</p>
        </>
      )
    }

    if (componente === 'memoriaram') {
      const qto = modulos?.slice(0,1)
      const cap = modulos?.slice(1,2)
      return (
        <>
          <p>{marca} {modelo} {capacidadeRam}GB {qto}x{cap}, {velocidade}MHz, DDR{ddr} </p>
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
      <p>{preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
    </div>
  )
}

export default CardEscolha
