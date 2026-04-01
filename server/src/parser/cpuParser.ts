function extrairTDP(texto?: string): number | null{
  if (!texto) return null

  const numeros = texto.match(/\d+/g)

  if(!numeros) return null
  
  const valores = numeros.map(Number)

  return Math.max(...valores)
}

function verificarVideoIntegrado(nome: string): boolean {
  const n = nome.toLocaleLowerCase()

  return (
    n.includes("g") ||
    n.includes("with graphics") ||
    n.includes("integrado")
  )
}

export function parseCpu(produto: any) {

  if (!produto?.nome) return null

  const nome = produto.nome

  // marca
  const marca =
    nome.includes("AMD") ? "AMD" :
    nome.includes("Intel") ? "Intel" :
    null

  if (!marca) return null


  // socket
  const socketMatch = nome.match(/AM[0-9]+|LGA ?[0-9]+/i)
  const socket = socketMatch ? socketMatch[0].replace(" ", "") : null


  // clock base
  const clockMatch = nome.match(/([0-9]\.?[0-9]?) ?GHz/i)
  const clock = clockMatch ? Number(clockMatch[1]) : null


  // núcleos
  const coreMatch = nome.match(/([0-9]+) ?N[úu]cleos/i)
  const cores = coreMatch ? Number(coreMatch[1]) : null


  // threads
  const threadMatch = nome.match(/([0-9]+) ?Threads/i)
  const threads = threadMatch ? Number(threadMatch[1]) : null


  // modelo limpo
  const modelo = nome
    .replace("Processador", "")
    .replace("AMD", "")
    .replace("Intel", "")
    .trim()

  return {
    marca,
    modelo,
    socket,
    clock,
    cores,
    threads,
    tdp: extrairTDP(produto.specs?.tdp),
    video_integrado: verificarVideoIntegrado(produto.nome),
    preco: produto.preco,
    imagem: produto.imagem,
    url: produto.url,
    loja_id: 1
  }

}