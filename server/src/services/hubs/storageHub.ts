import storageJson from "../../data/internal-hard-drive.json"
import { atualizarComponente } from "./componentes"

const ssds = storageJson.filter(item => {
    const isSSD =
        typeof item.type === "string" &&
        item.type.toUpperCase().includes("SSD")

    if (!isSSD) return false

    const capacidade = item.capacity ?? 0

    return (
        capacidade >= 480 &&
        capacidade <= 4000
    )
}).splice(0, 80)

const hds = storageJson.filter(item => {
    const isHD =
        typeof item.type === "number"

    if (!isHD) return false

    const rpm = item.type
    const capacidade = item.capacity ?? 0

    return (
        rpm >= 7200 &&
        capacidade >= 1000 &&
        capacidade <= 12000
    )
}).splice(0, 60)

export async function updateStoragePrices() {
    await atualizarComponente(ssds, {
        tipo: "armazenamento",
        seletorKabum: "ssd",
        seletorPichau: "ssd",
        seletorTerabyte: "ssd"
    })

    await atualizarComponente(hds, {
        tipo: "armazenamento",
        seletorKabum: "hd",
        seletorPichau: "hd",
        seletorTerabyte: "hd"
    })
}