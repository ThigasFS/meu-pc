import cpusJson from "../../data/cpu.json"
import { atualizarComponente } from "./componentes"

export async function updateCpuPrices() {
    const cpusFiltradas = cpusJson.filter(cpu => {
        const nome = cpu.name.toLowerCase()

        const amd =
            nome.includes("ryzen") &&
            !nome.includes("athlon")

        const intel =
            nome.includes("intel") &&
            !nome.includes("celeron") &&
            !nome.includes("pentium") &&
            !nome.includes("xeon")

        return amd || intel
    }).slice(0, 60)

    await atualizarComponente(cpusFiltradas, {
        tipo: "cpu",
        seletorKabum: "produto",
        seletorPichau: "processador",
        seletorTerabyte: "processador"
    })
}