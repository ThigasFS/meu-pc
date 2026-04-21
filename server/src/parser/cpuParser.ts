import { RawCpuProduct, ParsedCpu } from "../interfaces/cpu"

function extractTdp(text?: string): number | null {
  if (!text) return null

  const match = text.match(/(\d+)\s*W/i)
  return match ? Number(match[1]) : null
}

function hasIntegratedVideo(nome: string): boolean {
  const n = nome.toLowerCase()

  return (
    /video integrado|gráficos integrados|with graphics/i.test(n) ||
    /ryzen\s+\d+\s+\d{4}g/i.test(n) ||
    /intel.*graphics/i.test(n)
  )
}

export function parseCpu(produto: RawCpuProduct): ParsedCpu | null {
  if (!produto?.nome) return null

  const nome = produto.nome

  const marca =
    nome.includes("AMD") ? "AMD" :
      nome.includes("Intel") ? "Intel" :
        null

  if (!marca) return null

  const socket = nome.match(/AM[0-9]+|LGA ?[0-9]+/i)?.[0] ?? null

  const clockMatch = nome.match(/(\d+[\.,]?\d*)\s*GHz/i)

  const clock = clockMatch
    ? Number(clockMatch[1].replace(",", "."))
    : null

  const cores = Number(nome.match(/(\d+)\s*N[úu]cleos/i)?.[1]) || null

  const threads = Number(nome.match(/(\d+)\s*Threads/i)?.[1]) || null

  const modelo = nome
    .replace(/Processador/i, "")
    .replace(/AMD|Intel/i, "")
    .replace(/Avalia[cç][aã]o.*?(?=Ryzen|Core)/i, "")
    .replace(/R\$\s?[\d\.,]+.*$/i, "")
    .replace(/No PIX.*$/i, "")
    .replace('', "")
    .trim()

  return {
    marca,
    modelo,
    socket,
    clock,
    cores,
    threads,
    tdp: extractTdp(produto.specs?.tdp),
    video_integrado: hasIntegratedVideo(nome),
    preco: produto.preco,
    imagem: produto.imagem,
    url: produto.url,
    loja_id: getLojaId(produto.loja)
  }
}

function getLojaId(loja: string): number {
  const lojas: Record<string, number> = {
    kabum: 1,
    pichau: 2,
    terabyte: 3
  }

  if (!lojas[loja]) {
    throw new Error(`Loja inválida: ${loja}`)
  }

  return lojas[loja]
}