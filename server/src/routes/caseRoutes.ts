import { Router } from "express"
import { getCases } from "../services/case"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const gab = await getCases()

        res.json(gab)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Gabinete"
        })

        throw error
    }
})

export default router