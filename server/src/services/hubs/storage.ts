import storageJson from "../../data/internal-hard-drive.json"
import { atualizarComponente } from "./componentes"

const ssds = storageJson.filter(item =>
    typeof item.type === "string" &&
    item.type.toUpperCase().includes("SSD")
)

const hds = storageJson.filter(item =>
    typeof item.type === "number"
)

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