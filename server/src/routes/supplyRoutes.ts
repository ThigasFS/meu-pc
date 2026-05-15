import { Router } from "express"
import { getPsus } from "../services/supplyService"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const supply = await getPsus()

        res.json(supply)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Fonte"
        })
    }
})

export default router