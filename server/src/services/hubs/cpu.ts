import '../../config/env'
import cpusJson from "../../data/cpu.json"
import connection from "../../database/connection"
import { salvarPrecoProduto } from "../../database/salvarProduto"
import { scrapeKabum } from "../../scrapers/stores/kabum"

function nomesSaoCompativeis(
    nomeBuscado: string,
    nomeEncontrado: string
): boolean {
    const buscado = nomeBuscado.toLowerCase()
    const encontrado = nomeEncontrado.toLowerCase()

    const partesImportantes = buscado
        .split(" ")
        .filter(p =>
            /\d/.test(p) ||
            /ryzen|intel|core|x3d|athlon/i.test(p)
        )

    const acertos = partesImportantes.filter(p =>
        encontrado.includes(p)
    )

    return acertos.length >= Math.ceil(partesImportantes.length * 0.7)
}

export async function updateCpuPrices() {
    const batchSize = 5
    const cpusTestes = cpusJson.slice(0, 10)

    for (let i = 0; i < cpusTestes.length; i += batchSize) {
        const lote = cpusTestes.slice(i, i + batchSize)

        await Promise.all(
            lote.map(async (cpu) => {
                try {
                    const kabum = await scrapeKabum(cpu.name)

                    console.log("BUSCADO:", cpu.name)
                    console.log("ENCONTRADO:", kabum.nomeEncontrado)

                    const nomeValido = nomesSaoCompativeis(
                        cpu.name,
                        kabum.nomeEncontrado
                    )

                    if (!nomeValido || !kabum.valor) {
                        console.log(`⚠ incompatível: ${cpu.name}`)
                        return
                    }

                    await salvarPrecoProduto({
                        nome: cpu.name,
                        tipo: "cpu",
                        marca: cpu.name.includes("AMD")
                            ? "AMD"
                            : "Intel",
                        loja: kabum.valor.loja,
                        preco: kabum.valor.preco,
                        imagem: kabum.imagem,
                        url: kabum.valor.url
                    })

                    console.log(`✔ salvo: ${cpu.name}`)
                } catch (error) {
                    console.error(`Erro: ${cpu.name}`, error)
                }
            })
        )
    }

    console.log("✔ preços atualizados")
}

function definirSocket(microarquitetura: string): string {
    const arch = microarquitetura.toLowerCase()

    if (arch.includes("zen 5")) return "AM5"
    if (arch.includes("zen 4")) return "AM5"
    if (arch.includes("zen 3")) return "AM4"
    if (arch.includes("zen 2")) return "AM4"

    return "Desconhecido"
}

function menorPreco(valores: any[]): number {
    if (!valores.length) return 0

    return Math.min(...valores.map((v) => v.preco))
}

export async function getCpus() {
    const [rows] = await connection.execute(`
        SELECT * FROM precos_produto
    `)

    const precos = rows as any[]

    return cpusJson.map((cpu, index) => {
        const valores = precos.filter(
            p => p.nome_produto === cpu.name
        )

        return {
            id: index + 1,
            nome: cpu.name,
            marca: cpu.name.includes("AMD") ? "AMD" : "Intel",
            socket: definirSocket(cpu.microarchitecture),
            velocidade: cpu.core_clock,
            tdp: cpu.tdp,
            videoIntegrado: !!cpu.graphics,
            imagem: valores[0]?.imagem || "",
            valores,
            preco: menorPreco(valores)
        }
    })
}