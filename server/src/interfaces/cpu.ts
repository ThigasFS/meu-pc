export interface RawCpuProduct {
  nome: string
  preco: number | null
  imagem: string
  url: string
  loja: string
  specs?: any
}

export interface ParsedCpu {
  marca: string
  modelo: string
  socket: string | null
  clock: number | null
  cores: number | null
  threads: number | null
  tdp: number | null
  video_integrado: boolean
  preco: number | null
  imagem: string
  url: string
  loja_id: number
}