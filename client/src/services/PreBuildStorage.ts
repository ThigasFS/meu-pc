import PC from "../interfaces/pc"
import { preBuilds } from "../data/prebuilds"

const STORAGE_KEY = "pre-builds"

export function initializePreBuilds() {
    const existing = localStorage.getItem(STORAGE_KEY)

    if (!existing) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(preBuilds)
        )
    }
}

export function getPreBuilds(): PC[] {
    const data = localStorage.getItem(STORAGE_KEY)

    if (!data) {
        return []
    }

    return JSON.parse(data)
}

export function removePreBuild(id: number) {
    const pcs = getPreBuilds()

    const filtered = pcs.filter(
        pc => pc.id !== id
    )

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filtered)
    )
}