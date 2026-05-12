import { Router } from "express"
import { getStorages } from "../services/storageService"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const storage = await getStorages()

        res.json(storage)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Armazenamento"
        })
    }
})

export default router