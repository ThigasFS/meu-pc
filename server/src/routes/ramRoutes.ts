import { Router } from "express"
import { getRams } from "../services/ramService"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const rams = await getRams()

        res.json(rams)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar Memórias Ram"
        })
    }
})

export default router