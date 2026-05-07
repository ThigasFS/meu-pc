import { Router } from "express"
import { getSupply } from "../services/supply"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const supply = await getSupply()

        res.json(supply)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Fonte"
        })
    }
})

export default router