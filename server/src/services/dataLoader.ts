import fs from "fs"
import path from "path"

const cache: Record<string, any[]> = {}

export function loadAllData() {
    const pasta = path.join(__dirname, "..", "data")

    const arquivos = fs.readdirSync(pasta)

    arquivos.forEach((arquivo) => {
        if (!arquivo.endsWith(".json")) return

        const nome = arquivo.replace(".json", "")
        const conteudo = fs.readFileSync(
            path.join(pasta, arquivo),
            "utf-8"
        )

        cache[nome] = JSON.parse(conteudo)
    })

    console.log("✔ JSONs carregados")
}

export function getData(nome: string) {
    return cache[nome] || []
}