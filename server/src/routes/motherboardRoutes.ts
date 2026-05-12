import { Router } from "express"
import { getMotherboards } from "../services/motherboardService"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const mbs = await getMotherboards()

        res.json(mbs)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Placas Mãe"
        })
    }
})

export default router