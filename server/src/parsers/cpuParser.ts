import { RawCpuProduct, ParsedCpu } from "../interfaces/cpu"

const CPU_SPECS: Record<string, { cores: number; threads: number; socket: string }> = {
  "5600":  { cores: 6,  threads: 12, socket: "AM4" },
  "5600X": { cores: 6,  threads: 12, socket: "AM4" },
  "5600G": { cores: 6,  threads: 12, socket: "AM4" },
  "5700X": { cores: 8,  threads: 16, socket: "AM4" },
  "5700G": { cores: 8,  threads: 16, socket: "AM4" },
  "5800X": { cores: 8,  threads: 16, socket: "AM4" },
  "5900X": { cores: 12, threads: 24, socket: "AM4" },
  "5950X": { cores: 16, threads: 32, socket: "AM4" },
  // AMD Ryzen 7000
  "7600":  { cores: 6,  threads: 12, socket: "AM5" },
  "7600X": { cores: 6,  threads: 12, socket: "AM5" },
  "7700":  { cores: 8,  threads: 16, socket: "AM5" },
  "7700X": { cores: 8,  threads: 16, socket: "AM5" },
  "7800X3D": { cores: 8, threads: 16, socket: "AM5" },
  "7900X": { cores: 12, threads: 24, socket: "AM5" },
  "7950X": { cores: 16, threads: 32, socket: "AM5" },
  // Intel 12ª/13ª/14ª geração
  "i3-12100":  { cores: 4,  threads: 8,  socket: "LGA1700" },
  "i5-12400":  { cores: 6,  threads: 12, socket: "LGA1700" },
  "i5-12600K": { cores: 10, threads: 16, socket: "LGA1700" },
  "i5-13400":  { cores: 10, threads: 16, socket: "LGA1700" },
  "i5-13600K": { cores: 14, threads: 20, socket: "LGA1700" },
  "i7-13700K": { cores: 16, threads: 24, socket: "LGA1700" },
  "i9-13900K": { cores: 24, threads: 32, socket: "LGA1700" },
  "i5-14400":  { cores: 10, threads: 16, socket: "LGA1700" },
  "i5-14600K": { cores: 14, threads: 20, socket: "LGA1700" },
  "i7-14700K": { cores: 20, threads: 28, socket: "LGA1700" },
  "i9-14900K": { cores: 24, threads: 32, socket: "LGA1700" },
}

function extractModelKey(nome: string): string | null {
  const patterns = [
    /\b(i\d-\d{4,5}[A-Z]{0,3})\b/i,   // i5-13600K
    /\b(\d{4}X3D|\d{4}X|\d{4}G|\d{4})\b/, // 5600X, 7800X3D, 5600G, 5600
  ]

  for (const pattern of patterns) {
    const match = nome.match(pattern)
    if (match) return match[1]
  }

  return null
}

function cleanModelName(nome: string): string {
  return nome
    .replace(/Processador\s*/i, "")
    .replace(/\bAMD\b|\bIntel\b/gi, "")
    .replace(/R\$[\s\S]*/i, "")
    .replace(/No PIX[\s\S]*/i, "")
    .replace(/Avalia[çc][aã]o[\s\S]*/i, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+|\s+$/g, "")
}

function extractTdp(text?: string): number | null {
  if (!text) return null
  const match = text.match(/(\d+)\s*W/i)
  return match ? Number(match[1]) : null
}

function hasIntegratedVideo(nome: string): boolean {
  return (
    /video integrado|gráficos integrados|with graphics/i.test(nome) ||
    /ryzen\s+\d+\s+\d{4}g/i.test(nome) ||
    /intel.*graphics/i.test(nome) ||
    /\b\d{4}G\b/.test(nome)
  )
}

function getLojaId(loja: string): number {
  const lojas: Record<string, number> = {
    kabum: 1,
    pichau: 2,
    terabyte: 3,
  }
  const normalizada = loja.toLowerCase().trim()
  if (!(normalizada in lojas)) throw new Error(`Loja inválida: ${loja}`)
  return lojas[normalizada]
}

export function parseCpu(produto: RawCpuProduct): ParsedCpu | null {
  if (!produto?.nome) return null

  const nome = produto.nome

  const marca =
    /AMD|Ryzen|Athlon/i.test(nome) ? "AMD" :
    /Intel|Core\s*i\d|Core\s*Ultra|Xeon|Pentium|Celeron/i.test(nome) ? "Intel" :
    null

  if (!marca) return null

  const socketNoNome = nome.match(/\bAM[0-9]+\b|\bLGA\s*[0-9]+\b/i)?.[0]?.replace(/\s/, "") ?? null

  const clockMatch = nome.match(/(\d+[\.,]\d+)\s*GHz/i)
  const clock = clockMatch ? Number(clockMatch[1].replace(",", ".")) : null

  const coresNoNome   = Number(nome.match(/(\d+)\s*N[úu]cleos/i)?.[1]) || null
  const threadsNoNome = Number(nome.match(/(\d+)\s*Threads/i)?.[1]) || null

  const modelKey = extractModelKey(nome)
  const specsMapeados = modelKey ? CPU_SPECS[modelKey] ?? CPU_SPECS[modelKey.toUpperCase()] : null

  const socket  = socketNoNome  ?? specsMapeados?.socket  ?? null
  const cores   = coresNoNome   ?? specsMapeados?.cores   ?? null
  const threads = threadsNoNome ?? specsMapeados?.threads ?? null

  const modelo = cleanModelName(nome)

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
    loja_id: getLojaId(produto.loja),
  }
}