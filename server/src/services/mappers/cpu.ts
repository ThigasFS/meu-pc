import { Processador } from "../../interfaces/componente"

function definirSocket(micro: string): string {
    const arch = micro.toLowerCase()

    if (arch.includes("zen 5")) return "AM5"
    if (arch.includes("zen 4")) return "AM5"
    if (arch.includes("zen 3")) return "AM4"

    return "Desconhecido"
}

function definirMarca(nome: string): string {
    return nome.includes("AMD") ? "AMD" : "Intel"
}

export function mapCpu(cpu: any, index: number): Processador {
    return {
        id: index + 1,
        nome: cpu.name,
        marca: definirMarca(cpu.name),
        socket: definirSocket(cpu.microarchitecture),
        velocidade: cpu.core_clock,
        tdp: cpu.tdp,
        videoIntegrado: !!cpu.graphics,
        imagem: "",
        preco: 0,
        valores: []
    }
}